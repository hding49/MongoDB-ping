// keepAlive.js
const { MongoClient } = require("mongodb");
const cron = require("node-cron");

const uri = process.env.MONGODB_URI; // 在 Heroku 上通过 config 设置

async function pingDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log(`[${new Date().toISOString()}] Pinged MongoDB successfully`);
  } catch (err) {
    console.error("MongoDB ping failed:", err.message);
  } finally {
    await client.close();
  }
}

// 每 30 分钟 ping 一次
cron.schedule("*/30 * * * *", pingDB);

// 启动时立即 ping 一次
pingDB();
