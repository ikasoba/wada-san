# 和田さん

WASMを動かすための分散型のプロトコル

## できること
- WASMをネットワーク内で分散させて動かす
- WASMアプリへのイベントの送信

# 和田データベース

WASMから利用できるデータベースです。
これはネットワーク全体で同期されます。

## できること

- テーブルの作成 (CREATE TABLE)
- テーブルへの書き込み (INSERT)
- テーブルからの読み取り (SELECT)
- テーブルへ書き込んだデータの上書き (UPDATE)
- テーブルへ書き込んだデータの削除 (DELETE)
- テーブルの削除 (DROP TABLE)

# 和田ストリーム

WASMへ接続し、データの送受信を行えるストリームです。

## できること

# デプロイされたWASMアプリケーションについて

- WASMバイナリのハッシュ値がアプリのIDとなる
- 送信者のみ停止などがコントロールできる