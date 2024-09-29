# Node.js のベースイメージを指定（バージョンは適宜変更）
FROM node:22

# 作業ディレクトリを設定
WORKDIR /app

# package.json および package-lock.json を作業ディレクトリにコピー
COPY package*.json ./

# npm install により依存パッケージをインストール
RUN npm install

# アプリケーションのソースコードを全て作業ディレクトリにコピー
COPY . .

# MySQL のインストール（オプション: 必要に応じて追加）
RUN apt-get update && apt-get install -y mariadb-server

# MySQL ディレクトリの初期化（オプション: 必要に応じて追加）
RUN mkdir -p /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql

# サービス起動時に MySQL をバックグラウンドで起動し、Node.js アプリを実行
CMD service mysql start && npm start

# アプリケーションのデフォルトポートを指定（例: 3000）
EXPOSE 8080
