import path from "path";
import knex from "knex";
import { Message, RecordInput, RecordOutput } from "types";

const OpenConnection = () => {
  const dbPath = path.resolve("db/mdb.db");
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });
  return db;
};

export const Get = async (): Promise<RecordOutput[] | Message> => {
  const db = OpenConnection();
  const result: RecordOutput[] | Message = await db
    .select("*")
    .from("Items")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

const GetItem = async ({
  name,
  type,
}: RecordInput): Promise<RecordOutput[] | Message> => {
  const db = OpenConnection();
  const result: RecordOutput[] | Message = await db
    .select("*")
    .from("Items")
    .where(function () {
      this.where("Name", name).andWhere("Type", type);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const Insert = async ({ name, type, cost }: RecordInput) => {
  const record = await GetItem({ name, type, cost }).then((data) => {
    return data;
  });
  if (!Array.isArray(record)) return record;
  if (!!record.length) return await Update({id: record[0].id, name, type, cost});
  else return await InsertRecord({ name, type, cost });;
};

const InsertRecord = async ({ name, type, cost }: RecordInput): Promise<Message> => {
  const db = OpenConnection();
  const result: Message = await db("Items")
    .insert({
      Name: name,
      Type: type,
      Cost: cost,
    })
    .then(() => {
      return { message: "Insert: Success" };
    })
    .catch((err) => {
      return { message: `There was an error in insert operation: ${err}` };
    });
  return result;
};

export const Update = async ({
  id,
  name,
  type,
  cost,
}: RecordOutput): Promise<Message> => {
    console.log(id)
  const db = OpenConnection();
  const result: Message = await db("Items")
    .where("Id", id)
    .update({
      "Name": name,
      "Type": type,
      "Cost": cost,
    })
    .then(() => {
      return { message: "Update: Success" };
    })
    .catch((err) => {
      return { message: `There was an error in insert operation: ${err}` };
    });
  return result;
};
