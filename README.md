# Next 学習用

Look at the [Next documentation](https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app) to learn more.

## 動作確認環境

- Windows 11 Pro
- WSL2
- Ubuntu 22.04.5 LTS
- Docker version 28.0.1, build 068a01e
- Docker image node:22-slim


## Next の Docker 作成

格納先ディレクトリを作る。

```bash
mkdir nextjs_resume_v5
cd nextjs_resume_v5
```

`Dockerfile` を作る。

```dockerfile
FROM node:22-slim

RUN apt-get update \
    && apt-get install vim -y \
    && apt-get install git -y \
    && apt-get install bash

WORKDIR /opt/src

USER node
```

ホスト側とボリュームを共有する `src` とその中の `src/nuxt-app/node_modules` はコンテナ起動前に作っておく。

- コンテナ起動時に docker に作らせると所有者が root になってしまうため。
- ホスト側ユーザとコンテナ側ユーザ (node) が共に uid:1000, gid:1000 前提。
- uid, gid が食い違う場合は別途調整が必要。

`my-app` のところは作る予定のプロジェクト名。

```bash
mkdir -p src/my-app/node_modules
```

`docker-compose.yml` を作る。

```yaml
services:
  app:
    build: .
    volumes:
      - ./src:/opt/src:cached
      - node_modules:/opt/src/my-app/node_modules
    working_dir: "/opt/src"
    ports:
      - "3001:3001"
    tty: true
    environment:
      - HOST=0.0.0.0
      - port=3001
volumes:
  node_modules:
    driver: local
    driver_opts:
      type: none
      device: ./src/my-app/node_modules
      o: bind
```

シェルに入る。

```bash
docker compose exec app bash
```

新規プロジェクトを作る。
いくつかプロジェクト構成に対する質問をされるので適当に。

```bash
npx create-next-app@latest
```

`package.json` で next の起動ポートを変えておく(任意)。

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 3001", ←ここ
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.2.4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.2.4",
    "@eslint/eslintrc": "^3"
  }
}
```

HMR で起動する。

```bash
cd src/my-app
npm run dev
```

アプリ全体で状態管理をしたいので Redux を入れておく。
シェル内で下記を実行する。

```bash
npm install --save react-redux
```

## 公開用ビルド

シェルに入り、下記を実行。

```bash
cd src/my-app
npm run build
```

`src/my-app/output` の中身を適切な場所に置く。

## メモ

- いきなり特定のルートを表示したい場合は、`.html` を付ける必要がある？
  - 例えば、`resume` というルートを持つアプリを `dist/resume_v5` という公開場所に置いたとき、`dist/resume_v5/resume` をアドレスバーに書いて見ようとしてもアクセスできないが、`dist/resume_v5/resume.html` でアクセスできる。