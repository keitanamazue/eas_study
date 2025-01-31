#!/bin/bash

# Slack Webhook URL
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/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"

# 📝 Slack チャンネル名（#channel-name 形式で記述）
CHANNEL="#_n_expo_notification"

# 🛠️ メッセージのタイプ（成功・失敗・キャンセル）
STATUS=$1

# 💬 通知メッセージ
MESSAGE="*EAS Build ${STATUS}*\n📌 *Project:* $(basename $(pwd))\n⏳ *Date:* $(date)\n\`\`\`${LOG_CONTENT}\`\`\`"

# 📦 Slack 送信用 JSON データを作成
PAYLOAD="{
  \"channel\": \"$CHANNEL\",
  \"text\": \"$MESSAGE\",
  \"username\": \"EAS Build Bot\",
  \"icon_emoji\": \":rocket:\"
}"

# 🚀 Slack に通知を送信
curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" "$SLACK_WEBHOOK_URL"
