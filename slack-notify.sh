#!/bin/bash

# 🚀 `.env` ファイルを読み込む（環境変数として適用）
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# 🛠️ 必要な環境変数があるかチェック
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "❌ SLACK_WEBHOOK_URL が設定されていません！ .env に追加してください。"
  exit 1
fi

# 📌 メッセージを作成
STATUS=$1
LOG_FILE=$2  # ログファイルのパス
CHANNEL="#_n_expo_notification"
LOG_CONTENT=$(tail -n 20 "$LOG_FILE" 2>/dev/null)

MESSAGE="*EAS Build ${STATUS}*\n📌 *Project:* $(basename $(pwd))\n⏳ *Date:* $(date)\n\`\`\`${LOG_CONTENT}\`\`\`"

# 🚀 Slack に通知を送信
curl -X POST -H 'Content-type: application/json' --data "{
  \"channel\": \"$CHANNEL\",
  \"text\": \"$MESSAGE\",
  \"username\": \"EAS Build Bot\",
  \"icon_emoji\": \":rocket:\"
}" "$SLACK_WEBHOOK_URL"
