const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Test Dokploy app running",
    time: new Date().toISOString(),
  });
});

app.get("/db-test", async (req, res) => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    const result = await client.query("SELECT NOW() as now, 1 as test");
    await client.end();
    res.json({
      status: "DB connected",
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      status: "DB failed",
      error: err.message,
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on port ${PORT}`);
});
