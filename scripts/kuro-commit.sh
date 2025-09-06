#!/bin/bash

# Kuro の自動コミットスクリプト
# このスクリプトは作業のたびに必ず実行する

echo "🔍 変更内容を確認中..."
git status

echo ""
echo "📝 変更をステージング中..."
git add .

echo ""
echo "💾 コミット中..."
git commit -m "$1"

echo ""
echo "✅ コミット完了！"
git log --oneline -1

echo ""
echo "📊 コミット内容の要約:"
echo "- 変更されたファイル数: $(git diff --cached --name-only | wc -l)"
echo "- 追加された行数: $(git diff --cached --numstat | awk '{sum += $1} END {print sum}')"
echo "- 削除された行数: $(git diff --cached --numstat | awk '{sum += $2} END {print sum}')"

echo ""
echo "🎯 次のステップを確認してください"
