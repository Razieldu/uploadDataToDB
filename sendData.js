const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = process.env.DATABASE_HOST;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const collectionName = 'Data'; // 指定 collection 名稱
    const databaseName = 'usersData'; // 指定資料庫名稱
    const database = client.db(databaseName); // 取得指定的資料庫
    const collection = database.collection(collectionName); // 取得指定的 collection

    const data = require('./data.json'); // 讀取資料檔案

    // 儲存資料
    await collection.insertMany(data);

    console.log('Data saved successfully!');
  } catch (error) {
    console.error(error);
  } finally {
    client.close(); // 關閉連線
    console.log('Connection closed');
  }
})();
