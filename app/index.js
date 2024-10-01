const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
// corsを使うと、クロスオリジンのエラーが出なくなる
app.use(cors());
// express.json()を使うと、req.bodyを使えるようになる
app.use(express.json());

// MySQLの接続情報
const db = mysql.createConnection({
  user: "root",// 作成したユーザー名
  host: "localhost",// host名
  password: "hiromu166",// 作成したユーザーのパスワード
  database: "MyData",// 作成したデータベース名
  port: 3306, // MySQLのデフォルトポート
});

// データの追加
app.post("/animals", (req, res) => {
  const name = req.body.name;

  const query = "INSERT INTO animals (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error inserting data into database" });
    } else {
      res.status(200).json({ message: "Value Inserted" });
    }
  });
});


// データの取得
app.get("/animals", (req, res) => {
  const query = "SELECT * FROM animals";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// データの更新
app.put("/animals/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const query = "UPDATE animals SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating data in database");
    } else {
      res.status(200).send("Value Updated");
    }
  });
});

// データの削除
app.delete("/animals/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM animals WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting data from database");
    } else {
      res.status(200).send("Value Deleted");
    }
  });
});
// サーバーの起動
const port = 3001;
app.listen(port, () => {
  console.log(`Yey, your server is running on port ${port}`);
});