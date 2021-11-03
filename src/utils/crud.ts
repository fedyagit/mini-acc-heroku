import path from "path";
import knex from "knex";
import { Message, RecordInput } from "types";

const isTest = process.env.NODE_ENV === 'test';

const OpenConnection = () => {
  const dbPath = isTest ? path.resolve("db/mdbt.db") : path.resolve("db/mdb.db");
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });
  return db;
};

export const Get = async (): Promise<RecordInput[] | Message> => {
  const db = OpenConnection();
  const result: RecordInput[] | Message = await db
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
}: RecordInput): Promise<RecordInput[] | Message> => {
  const db = OpenConnection();
  const result: RecordInput[] | Message = await db
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

export const GetById = async ({
  id,
}: RecordInput): Promise<RecordInput[] | Message> => {
  const db = OpenConnection();
  const result: RecordInput[] | Message = await db
    .select("*")
    .from("Items")
    .where("Id", id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { message: `There was an error in retrieving data: ${err}` };
    });
  return result;
};

export const Insert = async ({ id, name, type, cost }: RecordInput) => {
  const record = await GetItem({name, type}).then((data) => {
    return data;
  });
  if (!Array.isArray(record)) return record;
  if (!!record.length)
    return await Update({ id: record[0].id, name, type, cost });
  else return await InsertRecord({ id, name, type, cost });
};

const InsertRecord = async ({
  name,
  type,
  cost,
}: RecordInput): Promise<Message> => {
  const db = OpenConnection();
  const result: Message = await db("Items")
    .insert({
      Name: name,
      Type: type,
      Cost: cost,
    })
    .then((data) => {
      return { message: `Insert: Success, ID:${data}`, id: String(data) };
    })
    .catch((err) => {
      return { message: `There was an error in Insert operation: ${err}` };
    });
  return result;
};

export const Update = async ({
  id,
  name,
  type,
  cost,
}: RecordInput): Promise<Message> => {
  const db = OpenConnection();
  const result: Message = await db("Items")
    .where("Id", id)
    .update({
      Name: name,
      Type: type,
      Cost: cost,
    })
    .then((data) => {
      return { message: `Update: Success, ${data} items were affected` };
    })
    .catch((err) => {
      return { message: `There was an error in Update operation: ${err}` };
    });
  return result;
};

export const Delete = async ({ id }: RecordInput): Promise<Message> => {
  const db = OpenConnection();
  const result: Message = await db("Items")
    .where("Id", id)
    .delete()
    .then((data) => {
      return { message: `Delete: Success, ${data} items were affected` };
    })
    .catch((err) => {
      return { message: `There was an error in Delete operation: ${err}` };
    });
  return result;
};
