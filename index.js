// Node.jsの標準ライブラリである'node:http'モジュールをインポートします。
// これを使ってHTTPサーバーを作成します。
import { createServer } from "node:http";
// URLを解析するために'node:url'モジュールをインポートします。
// URLオブジェクトはグローバルで使えるので、importは必須ではないが、明示的に記述するのもよいじゃろう。
// import { URL } from 'node:url'; // 今回はグローバルなURLオブジェクトを使うので、ここはコメントアウトしておくぞ

// 環境変数からポート番号を取得します。
// もし環境変数が設定されていなければ、デフォルトで8888番ポートを使用します。
const PORT = process.env.PORT || 8888;

// HTTPサーバーを作成します。
// リクエスト（ブラウザからの要求）とレスポンス（サーバーからの応答）を処理する関数を渡すのじゃ。
const server = createServer((req, res) => {
  // リクエストURLを解析するためにURLオブジェクトを作成します。
  // req.urlはリクエストのパスとクエリ文字列を含むのじゃ。
  const requestUrl = new URL(req.url, `http://localhost:${PORT}`);

  // レスポンスヘッダーを設定します。
  // Content-Typeを'text/plain'に、文字コードをUTF-8に指定することで、
  // 日本語が正しく表示されるようにするのじゃ。
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // リクエストのパス（URLのホスト名の後ろの部分じゃな）によって処理を分岐させるぞい。
  if (requestUrl.pathname === "/") {
    // パスが '/' の場合（例: http://localhost:8888/）

    // サーバーがこの分岐に入ったことをコンソールに表示して確認するのじゃ。
    console.log("ルートパスがリクエストされました。");

    // HTTPステータスコード200（成功）を設定し、レスポンスを終了します。
    res.writeHead(200);
    // "こんにちは！" という文字列をクライアントに送るのじゃ。
    res.end("こんにちは！");
  } else if (requestUrl.pathname === "/ask") {
    // パスが '/ask' の場合（例: http://localhost:8888/ask?q=my+question）

    // サーバーがこの分岐に入ったことをコンソールに表示して確認するのじゃ。
    console.log("askパスがリクエストされました。");

    // URLのクエリパラメータから 'q' の値を取得します。
    // requestUrl.searchParamsはURLのクエリ文字列を操作するためのオブジェクトじゃ。
    const question = requestUrl.searchParams.get("q");

    // HTTPステータスコード200（成功）を設定し、レスポンスを終了します。
    res.writeHead(200);
    // 取得した質問内容を含む文字列をクライアントに送るのじゃ。
    res.end(`Your question is '${question}'`);
  } else {
    // 上記以外のパスの場合

    // サーバーがこの分岐に入ったことをコンソールに表示して確認するのじゃ。
    console.log("未知のパスがリクエストされました。");

    // HTTPステータスコード404（見つからない）を設定し、レスポンスを終了します。
    res.writeHead(404);
    // "Not Found" という文字列をクライアントに送るのじゃ。
    res.end("Not Found");
  }
});

// サーバーを指定されたポートでリッスン（待ち受け）を開始します。
// サーバーが起動したら、コンソールにメッセージを表示するのじゃ。
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
