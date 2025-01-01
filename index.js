#!/usr/bin/env node

const degit = require("degit");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

async function main() {
  // 1. テンプレートリポジトリの指定
  const repo = "taniiicom/nexpress";
  const targetDir = process.argv[2] || "new-nexpress-app";

  // 2. degitでリポジトリ内容をコピー
  const emitter = degit(repo, {
    cache: false,
    force: true,
  });
  await emitter.clone(targetDir);

  // 3. コピー先ディレクトリに移動
  process.chdir(targetDir);

  // 4. Gitリポジトリを初期化
  execSync("git init");

  // 5. ファイルをすべてステージに追加
  execSync("git add -A");

  // 6. 初回コミットを作成
  execSync('git commit -m "init: create-nexpress-app"');

  console.log(`Successfully created project in ./${targetDir}`);
  console.log("You can now:");
  console.log(`  cd ${targetDir}`);
  console.log("  npm install (or yarn)");
  console.log("  npm run dev (or yarn dev)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
