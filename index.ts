// 生成した Prisma Client を './generated/prisma/client' からインポート
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // 実行されたクエリをログに表示する設定
  log: ["query"],
});

async function main() {
  // Prisma Client の初期化を知らせる
  console.log("Prisma Client を初期化しました。");

  // 最初にユーザーの一覧を取得して表示
  let users_before = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", users_before);

  // 新しいユーザーを一人追加する
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // もう一度ユーザーの一覧を取得して表示
  const users_after = await prisma.user.findMany();
  console.log("After ユーザー一覧:", users_after);
}

// main 関数を実行し、終わったら後片付けをする
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 最後にデータベースとの接続を切る
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });
