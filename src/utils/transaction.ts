import path from "path";
import { jsPDF } from "jspdf";
import open from "open";
import "../fonts/typewriter";
import knex from "knex";
import { CheckDate, Message, TransactionInput } from "types";

const headerHeight = 16;
const wrapWidth = 58;
const heightStep = 4;

const getName = (date: Array<string>): CheckDate => {
  return {
    fileDate: path.resolve(
      `checks/check-${date[0]}-${date[1]}-${date[2]}-${date[3]}-${date[4]}-${date[5]}.pdf`
    ),
    checkDate: `${date[0]}.${date[1]}.${date[2]} ${date[3]}-${date[4]}-${date[5]}`,
  };
};

const strToNum = (str: string): number => {
  return Math.round(Number(str)) / 100
  ;
};

const isTest = process.env.NODE_ENV === "test";

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
  console.log(strToNum(check.costsFromTrans[0]).toFixed(2))
  return (checkHeight += 4);
};

const addHeader = (doc: jsPDF, id: string) => {
  doc.text("СМАЧНА ЗУСТРІЧ", 29, 8, {
    align: "center",
  });
  doc.text("################", 29, 12, { align: "center" });
  doc.text(`ЧЕК N ${id}`, 29, 16, { align: "center" });
  return doc;
};

export const PrintCheck = async ({ id }: TransactionInput) => {
  const checkObj = await GetTransactionById({ id });
  if (Array.isArray(checkObj) && !!checkObj.length) {
    console.log(checkObj[0]);
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
      var doc = new jsPDF("p", "mm", [58, checkHeight < 58 ? 58 : checkHeight]);
      doc.setFont("TypeWriter");
      doc.setFontSize(12);
      let step = headerHeight;
      addHeader(doc, id);
      formatedCheck.itemsFromTrans.map((item: string, index: number) => {
        doc.splitTextToSize(item, wrapWidth).map((str: string) => {
          doc.text(str, 2, (step += heightStep));
        });
        doc
          .splitTextToSize(
            `${strToNum(formatedCheck.costsFromTrans[index]).toFixed(2)}x${
              Number(formatedCheck.sizesFromTrans[index])
            }=${(
              strToNum(formatedCheck.costsFromTrans[index]) *
              Number(formatedCheck.sizesFromTrans[index])
            ).toFixed(2)}`,
            wrapWidth
          )
          .map((str: string) => {
            doc.text(str, 56, (step += heightStep), { align: "right" });
          });
      });
      const dates = getName(formatedCheck.dateFromTrans);
      doc.text("ДЯКУЄМО ЗА ПОКУПКУ", 29, (step += heightStep*2), {
        align: "center",
      });
      doc.text(dates.checkDate, 29, (step += heightStep), {
        align: "center",
      });
      doc.save(dates.fileDate);
      open(dates.fileDate);
    }
  }
};

// export const CreateCheck = async () => {

//   const s = "Торт. Вишн. Торт. Вишн. Торт. Вишн. Торт. Вишн. Торт. Вишн.";

//   doc.splitTextToSize(s, 58).map((str: string) => {
//     doc.text(str, 2, (step += 4));
//   });
//   doc.text("1040.00х0.1=1005.00", 56, (step += 4), { align: "right" });
//   doc.text("Кофе. Якобс.", 2, (step += 4));
//   doc.text("40.00х0.1=4.00", 56, (step += 4), { align: "right" });
//   doc.text("Торт. Вишн.", 2, (step += 4));
//   doc.text("1040.00х0.1=1005.00", 56, (step += 4), { align: "right" });
//   doc.text("Кофе. Якобс.", 2, (step += 4));
//   doc.text("40.00х0.1=4.00", 56, (step += 4), { align: "right" });
//   doc.text("Торт. Вишн.", 2, (step += 4));
//   doc.text("1040.00х0.1=1005.00", 56, (step += 4), { align: "right" });
//   doc.text("Кофе. Якобс.", 2, (step += 4));
//   doc.text("40.00х0.1=4.00", 56, (step += 4), { align: "right" });
//   doc.text("Торт. Вишн.", 2, (step += 4));
//   doc.text("1040.00х0.1=1005.00", 56, (step += 4), { align: "right" });
//   doc.text("Кофе. Якобс.", 2, (step += 4));
//   doc.text("40.00х0.1=4.00", 56, (step += 4), { align: "right" });
//   const name = getName();
//   doc.save(name);
//   open(name);
// };
