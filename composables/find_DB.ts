import { Message } from "./class/chat.class";
import { Option } from "./class/db.class";
import { getCollection, getCollectionSystem } from "./connect_DB";

/** 從資料庫取得上一次的參數 */
export const getLastOption = async (): Promise<Option> => {
  console.log("getLastOption Start");
  // await connectToDatabase();
  const collection = getCollection();

  console.log("get Last Start");
  const last = await collection.find().sort({ _id: -1 }).limit(1).toArray();
  console.log("last: ", last);

  if (!last.length) {
    console.log("getLastOption Error");
    return new Option({});
  } else {
    return new Option(last[0].option);
  }
};

/** 從資料庫取得上一次的對話紀錄 */
export const getLastMessage = async (): Promise<Message[]> => {
  console.log("getLastMessage Start");
  const collection = getCollection();

  const last = await collection.find().sort({ _id: -1 }).limit(1).toArray();
  console.log("last: ", last);

  if (!last.length || !last[0].continuation) {
    console.log("getLastMessage Error");
    return [];
  } else {
    return last[0].messages;
  }
};

/** 從資料庫取得上一次的結果 */
export const getLastResult = async (): Promise<string> => {
  console.log("getLastResult Start");
  const collection = getCollection();

  const last = await collection.find().sort({ _id: -1 }).limit(1).toArray();
  console.log("last: ", last);

  if (!last.length || !last[0].continuation) {
    console.log("getLastResult Error");
    return "";
  } else {
    return last[0].result;
  }
};

/** 從資料庫取得上一次是否是連續對話 */
export const getLastContinuation = async (): Promise<boolean> => {
  console.log("getLastContinuation Start");
  const collection = getCollection();

  const last = await collection.find().sort({ _id: -1 }).limit(1).toArray();
  console.log("last: ", last);

  if (!last.length) {
    console.log("getLastContinuation Error");
    return false;
  } else {
    return last[0].continuation;
  }
};

/** 從資料庫取得全部對話設定類型 */
export const getAllType = async (): Promise<string[]> => {
  console.log("getAllType Start");
  const collection = getCollectionSystem();

  const all = await collection.find().toArray();
  console.log("all: ", all);

  if (!all.length) {
    console.log("getAllType Error");
    return [];
  } else {
    const type_list: string[] = all.map((item) => item.type);
    return type_list;
  }
};

/** 從資料庫取得指定對話設定類型的預設初始訊息 */
export const getInitMessage = async (type: string): Promise<Message[]> => {
  console.log("getInitMessage Start");
  const collection = getCollectionSystem();

  const data = await collection.findOne({ type: type });
  console.log("data: ", data);

  if (!data) {
    console.log("getInitMessage Error");
    return [];
  } else {
    const init_message = data.message;
    return init_message ?? [];
  }
};
