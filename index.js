const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let posts = []; // 投稿を保存する配列

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // 静的ファイル用ディレクトリ

// 投稿一覧を取得する
app.get("/posts", (req, res) => {
  res.json(posts);
});

// 新しい投稿を追加する
app.post("/post", (req, res) => {
  const { content } = req.body;
  if (content) {
    const post = {
      id: posts.length + 1,
      content,
      timestamp: new Date().toISOString(),
    };
    posts.push(post);

    // 投稿が1000件を超えた場合リセット
    if (posts.length > 1000) {
      posts = [];
    }

    res.json({ success: true, message: "投稿が追加されました", post });
  } else {
    res.status(400).json({ success: false, message: "投稿内容が空です" });
  }
});

// ルートページ
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
  console.log(`サーバーがポート ${port} で起動しました: http://localhost:${port}`);
});
