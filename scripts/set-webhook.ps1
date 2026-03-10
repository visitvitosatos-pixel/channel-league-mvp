param(
  [Parameter(Mandatory = $true)][string]$BotToken,
  [Parameter(Mandatory = $true)][string]$WebhookUrl,
  [Parameter(Mandatory = $true)][string]$Secret
)

$Body = @{
  url = $WebhookUrl
  secret_token = $Secret
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$BotToken/setWebhook" -ContentType "application/json" -Body $Body
