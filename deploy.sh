#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
yarn run build

# 进入待发布的目录
cd dist

git add .
git commit -m 'Q音'

git push -f git@github.com:SnowCyans/QQShortVideo.git master:gh-pages

# 执行命令 yarn run deploy
