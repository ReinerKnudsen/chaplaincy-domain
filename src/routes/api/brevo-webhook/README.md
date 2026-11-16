# Brevo transactional webhook

Receives delivery events from Brevo and emails a notification, so a spam
complaint or a wave of bounces surfaces without anyone checking the Brevo
dashboard.

## Events

Notifies on `spam`, `hardBounce`, `blocked` and `invalid`. Every event Brevo
sends is written to the Netlify function log regardless, so the log stays a
complete record even when no mail goes out.

## Environment variables

| Variable                       | Purpose                                                            |
| ------------------------------ | ------------------------------------------------------------------ |
| `PRIVATE_BREVO_WEBHOOK_SECRET` | Bearer token Brevo must send. Without it the endpoint returns 503. |
| `PRIVATE_NOTIFICATION_TO`      | Where notifications go.                                            |
| `PRIVATE_NOTIFICATION_FROM`    | Sender; falls back to `news@anglicanbonncologne.de`.               |
| `PRIVATE_RESEND_API_KEY`       | Already used by the contact form.                                  |

All four must also be set in the Netlify UI, or the deployed endpoint cannot
authenticate or send.

## Registering the webhook

Brevo's UI (Transactional → Settings → Webhooks) cannot set a bearer token, so
register via the API:

```sh
curl --location 'https://api.brevo.com/v3/webhooks' \
  --header 'content-type: application/json' \
  --header 'api-key: <PRIVATE_BREVO_API_KEY>' \
  --data '{
    "description": "Delivery problem notifications",
    "url": "https://www.anglicanbonncologne.de/api/brevo-webhook",
    "events": ["spam", "hardBounce", "blocked", "invalid"],
    "type": "transactional",
    "auth": { "type": "bearer", "token": "<PRIVATE_BREVO_WEBHOOK_SECRET>" }
  }'
```

List existing webhooks with `GET https://api.brevo.com/v3/webhooks?type=transactional`,
and update one with `PUT https://api.brevo.com/v3/webhooks/{id}`.

### Batched delivery

Adding `"batched": true` makes Brevo post an array of events instead of one
object per request. The endpoint handles both, so it is safe to enable if the
volume ever justifies it.

## Testing

```sh
curl -X POST https://www.anglicanbonncologne.de/api/brevo-webhook \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <PRIVATE_BREVO_WEBHOOK_SECRET>' \
  -d '{"event":"spam","email":"test@example.com","date":"2026-11-16 10:00:00","tags":["optin"]}'
```

Expect `{"received":true,"notified":true}` and a mail at `PRIVATE_NOTIFICATION_TO`.
Without the header the same call returns 401.

## Why it always answers 200

Brevo retries on a non-2xx response. An ignored event, malformed JSON or a
failed notification therefore still return 200 — otherwise one bad event would
loop. The only rejection is a failed auth check, which Brevo should never
trigger.
