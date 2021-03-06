import path from "path";
import { jsPDF } from "jspdf";
import open from "open";
import "../fonts/typewriter";
import knex from "knex";
import {
  CheckDate,
  DateRange,
  Message,
  Pagination,
  PaginationInput,
  TotalInput,
  TransactionInput,
} from "types";
import fs from "fs";

const headerHeight = 16;
const wrapWidth = 58;
const wrapCenter = wrapWidth / 2;
const heightStep = 4;
const footerHeight = 32;
const isTest = process.env.NODE_ENV === "test";
const checksFolder = "../checks";
const reportsFolder = "../reports";

const getName = (date: Array<string>): CheckDate => {
  return {
    fileDate: path.resolve(
      `${checksFolder}/check-${date[0]}-${date[1]}-${date[2]}-${date[3]}-${date[4]}-${date[5]}.pdf`
    ),
    checkDate: `${date[0]}.${date[1]}.${date[2]} ${date[3]}:${date[4]}:${date[5]}`,
  };
};
const getTotalName = (dateStr: string): CheckDate => {
  const date = dateStr.split("-");
  return {
    fileDate: path.resolve(`${reportsFolder}/report-${dateStr}.pdf`),
    checkDate: `${date[0]}.${date[1]}.${date[2]} ${date[3]}:${date[4]}:${date[5]}`,
  };
};

const strToNum = (str: string): number => {
  return Math.round(Number(str)) / 100;
};

const OpenConnection = () => {
  const dbPath = isTest
    ? path.resolve("db/mdbt.db")
    : path.resolve("db/mdb.db");
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });
  return db;
};

const CalculateCheckHeight = (check: any) => {
  let checkHeight = headerHeight;
  const doc = new jsPDF();
  check.itemsFromTrans.map((item: string, index: number) => {
    checkHeight += heightStep * doc.splitTextToSize(item, wrapWidth).length;
    checkHeight +=
      heightStep *
      doc.splitTextToSize(
        `${check.costsFromTrans[index]}x${check.sizesFromTrans[index]}=${(
          strToNum(check.costsFromTrans[index]) *
          Number(check.sizesFromTrans[index])
        ).toFixed(2)}`,
        wrapWidth
      ).length;
  });
  return (checkHeight += footerHeight);
};

const getTotal = (check: any) => {
  let total = 0;
  check.itemsFromTrans.map((item: string, index: number) => {
    total +=
      strToNum(check.costsFromTrans[index]) *
      strToNum(check.sizesFromTrans[index]);
  });
  total *= 100;
  return total.toFixed(2);
};

const addHeader = (doc: jsPDF, id: string | null) => {
  doc.text("???????????? ??????????????", wrapCenter, 8, {
    align: "center",
  });
  doc.text("##################", wrapCenter, 12, { align: "center" });
  if (id) doc.text(`?????? N ${id}`, wrapCenter, 16, { align: "center" });
  return doc;
};

export const GetAllTransactions = async ({
  page,
  pageSize,
}: PaginationInput): Promise<Pagination> => {
  const db = OpenConnection();
  page = page ?? "0";
  pageSize = pageSize ?? "10";

  const result: TransactionInput[] | Message = await db
    .select("*")
    .offset(Number(page) * Number(pageSize))
    .limit(Number(pageSize))
    .from("Transactions")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  const count = await GetTransactionCount();
  return { result, nbHits: count[0].nbHits };
};

export const GetDateRangeTransactions = async (
  { page, pageSize }: PaginationInput,
  { fromDate, toDate }: DateRange
): Promise<Pagination> => {
  const db = OpenConnection();
  page = page ?? "0";
  pageSize = pageSize ?? "10";
  const result: TransactionInput[] | Message = await db
    .select("*")
    .whereBetween("transactionDate", [fromDate ?? "", toDate ?? ""])
    .offset(Number(page) * Number(pageSize))
    .limit(Number(pageSize))
    .from("Transactions")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  const count = await GetTransactionRangeCount({ fromDate, toDate });
  return { result, nbHits: count[0].nbHits };
};

export const GetTransactionCount = async (): Promise<any | number> => {
  const db = OpenConnection();
  const result = await db
    .count("id as nbHits")
    .from("Transactions")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const GetTransactionRangeCount = async ({
  fromDate,
  toDate,
}: DateRange): Promise<any | number> => {
  const db = OpenConnection();
  const result = await db
    .count("id as nbHits")
    .whereBetween("transactionDate", [fromDate ?? "", toDate ?? ""])
    .from("Transactions")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const GetLastTransaction = async (): Promise<
  TransactionInput[] | Message
> => {
  const db = OpenConnection();
  const result: TransactionInput[] | Message = await db
    .select("id")
    .from("Transactions")
    .first()
    .orderBy("id", "desc")
    .then((data) => {
      if (!data) return {};
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const GetTransactionById = async ({
  id,
}: TransactionInput): Promise<TransactionInput[] | Message> => {
  const db = OpenConnection();
  const result: TransactionInput[] | Message = await db
    .select("*")
    .from("Transactions")
    .where("id", id)

    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const GetTransactionsByToday = async ({
  transactionDate,
}: TransactionInput): Promise<TransactionInput[] | Message> => {
  const db = OpenConnection();
  const result: TransactionInput[] | Message = await db
    .select("*")
    .from("Transactions")
    .where("transactionDate", "like", `%${transactionDate}%`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const AddTransaction = async ({
  items,
  costs,
  sizes,
  transactionDate,
}: TransactionInput): Promise<Message> => {
  const db = OpenConnection();
  const result: Message = await db("Transactions")
    .insert({
      items: items,
      costs: costs,
      sizes: sizes,
      transactionDate: transactionDate,
    })
    .then((data) => {
      return { message: `Insert: Success, ID:${data}`, id: String(data) };
    })
    .catch((err) => {
      return { message: `There was an error in Insert operation: ${err}` };
    });
  return result;
};

export const PrintCheck = async ({ id }: TransactionInput) => {
  const checkObj = await GetTransactionById({ id });
  if (Array.isArray(checkObj) && !!checkObj.length) {
    if (
      checkObj[0].items &&
      checkObj[0].costs &&
      checkObj[0].sizes &&
      checkObj[0].transactionDate
    ) {
      const formatedCheck = {
        itemsFromTrans: checkObj[0].items?.split("|"),
        costsFromTrans: checkObj[0].costs?.split("|"),
        sizesFromTrans: checkObj[0].sizes?.split("|"),
        dateFromTrans: checkObj[0].transactionDate?.split("-"),
      };
      const checkHeight = CalculateCheckHeight(formatedCheck);
      var doc = new jsPDF("p", "mm", [wrapWidth, checkHeight < wrapWidth ? wrapWidth : checkHeight]);
      doc.setFont("TypeWriter");
      doc.setFontSize(12);
      let step = headerHeight;
      addHeader(doc, id ?? null);
      formatedCheck.itemsFromTrans.map((item: string, index: number) => {
        doc.splitTextToSize(item, wrapWidth).map((str: string) => {
          doc.text(str, 2, (step += heightStep));
        });
        doc
          .splitTextToSize(
            `${strToNum(formatedCheck.costsFromTrans[index]).toFixed(
              2
            )}x${Number(formatedCheck.sizesFromTrans[index])}=${(
              strToNum(formatedCheck.costsFromTrans[index]) *
              Number(formatedCheck.sizesFromTrans[index])
            ).toFixed(2)}`,
            wrapWidth
          )
          .map((str: string) => {
            doc.text(str, wrapWidth - 2, (step += heightStep), {
              align: "right",
            });
          });
      });
      const total = getTotal(formatedCheck);
      const dates = getName(formatedCheck.dateFromTrans);
      doc.text("????????:", 2, (step += heightStep));
      doc.text(total, wrapWidth - 2, step, { align: "right" });
      doc.text("##################", wrapCenter, (step += heightStep), {
        align: "center",
      });
      doc.text("?????????????? ???? ??????????????", wrapCenter, (step += heightStep * 2), {
        align: "center",
      });
      doc.text("?????????????? ??????!", wrapCenter, (step += heightStep), {
        align: "center",
      });
      doc.text(dates.checkDate, wrapCenter, (step += heightStep), {
        align: "center",
      });
      doc.text("???????????????????????? ??????", wrapCenter, (step += heightStep), {
        align: "center",
      });

      const checksDir = path.resolve(checksFolder);
      if (!fs.existsSync(checksDir)) {
        fs.mkdirSync(checksDir);
      }

      doc.save(dates.fileDate);
      open(dates.fileDate);
    }
  }
};

export const PrintTodayResult = async ({
  date,
  creationDate,
  nbChecks,
  sum,
  avg,
}: TotalInput) => {
  if (!creationDate) return;
  var doc = new jsPDF("p", "mm", [58, 58]);
  doc.setFont("TypeWriter");
  doc.setFontSize(12);
  let step = 4;
  doc.text("???????????? ??????????????", wrapCenter, (step += heightStep), {
    align: "center",
  });
  doc.text("##################", wrapCenter, (step += heightStep), {
    align: "center",
  });
  doc.text(`???????? ????: ${date}`, wrapCenter, (step += heightStep), {
    align: "center",
  });
  doc.text(`?????????????????? ??????????:`, 2, (step += heightStep + 2));
  doc.text(`${nbChecks}`, wrapWidth - 2, (step += heightStep), {
    align: "right",
  });
  doc.text(`???????????????? ???????? ???? ????????:`, 2, (step += heightStep));
  doc.text(`${sum}`, wrapWidth - 2, (step += heightStep), {
    align: "right",
  });
  doc.text(`?????????????? ???????? ????????:`, 2, (step += heightStep));
  doc.text(`${avg}`, wrapWidth - 2, (step += heightStep), {
    align: "right",
  });
  const dates = getTotalName(creationDate);
  doc.text(`${dates.checkDate}`, wrapCenter, (step += heightStep + 2), {
    align: "center",
  });
  const reportsDir = path.resolve(reportsFolder);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }
  doc.save(dates.fileDate);
  open(dates.fileDate);
};
