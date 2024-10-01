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

# MariaDB のインストール
RUN apt-get update && apt-get install -y mariadb-server

# MariaDB ディレクトリの初期化（必要に応じて追加）
RUN mkdir -p /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql

# MySQL（MariaDB）サービスを直接バックグラウンドで起動し、Node.js アプリを実行
CMD mysqld_safe & npm start & ["node", "app.js"]

# アプリケーションのデフォルトポートを指定
EXPOSE 8080
