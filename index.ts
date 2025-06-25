import express from "express";
// 生成した Prisma Client をインポート
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // クエリが実行されたときに実際に実行したクエリをログに表示する設定
  log: ["query"],
});
const app = express();

// 環境変数が設定されていれば、そこからポート番号を取得する。環境変数に設定がなければ 8888 を使用する。
const PORT = process.env.PORT || 8888;

// EJS をテンプレートエンジンとして設定
app.set("view engine", "ejs");
app.set("views", "./views");

// form のデータを受け取れるように設定
app.use(express.urlencoded({ extended: true }));

// ルートURL ("/") にアクセスがあった時の処理
app.get("/", async (req, res) => {
  // データベースから全ユーザーを取得
  const users = await prisma.user.findMany();
  // 'index.ejs' というビューにユーザー一覧のデータを渡して表示
  res.render("index", { users });
});

// "/users" にフォームからデータが送信された時の処理
app.post("/users", async (req, res) => {
  const name = req.body.name; // フォームから送信された名前を取得
  if (name) {
    // 新しいユーザーをデータベースに作成
    const newUser = await prisma.user.create({
      data: { name },
    });
    console.log("新しいユーザーを追加しました:", newUser);
  }
  res.redirect("/"); // ユーザー追加後、一覧ページにリダイレクト
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
