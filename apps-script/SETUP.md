# Setup: volunteer + yard-sign notifications via Google Sheets

One-time setup, done in your own Google account (alwhite524@gmail.com or
whichever account you want owning the data). Takes about 5 minutes.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**.
2. Rename it something like **"Lloyd White Campaign — Signups"**.
3. Leave it empty — the script creates the "Volunteers" and "Yard Signs" tabs
   automatically on first submission.

## 2. Add the script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete whatever's in the default `Code.gs` editor.
3. Paste in the full contents of [`Code.gs`](Code.gs) from this folder.
4. If you want notification emails to go somewhere other than
   `alwhite524@gmail.com`, change the `NOTIFY_EMAIL` value at the top.
5. Click the disk icon (or Ctrl+S) to save. Name the project anything, e.g.
   "Campaign Site Intake".

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Settings:
   - **Description:** Volunteer + yard sign intake
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will prompt you to authorize the script (it needs permission to
   edit the Sheet and send email on your behalf). Click through:
   - "Authorize access" → pick your Google account
   - You'll likely see an "unverified app" warning — this is normal for a
     script only you use. Click **Advanced** → **Go to (project name)
     (unsafe)** → **Allow**.
6. After deploying, copy the **Web app URL** shown (looks like
   `https://script.google.com/macros/s/AKfycb.../exec`).

## 4. Connect the site

Open `volunteer.html` and find this line near the bottom:

```js
var SCRIPT_URL = 'PASTE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Replace the placeholder with the URL you copied, save, commit, and push.
That's it — both forms on the Volunteer page will now write to the Sheet
and email you on every submission.

## Notes

- If you ever edit `Code.gs` again, you need to **Deploy → Manage
  deployments → edit (pencil icon) → New version → Deploy** for the changes
  to take effect on the existing URL. Just saving in the editor is not
  enough.
- The stat-strip numbers on the Volunteer page ("Volunteers signed up",
  "Doors knocked", "Yard signs placed") are still static placeholders —
  they're not wired to the Sheet's row counts. Say the word if you want
  those live too (would need a small read-only endpoint and a bit more JS).
- Anedot (donations) is unrelated to this — that's a separate account with
  its own notification settings, not touched by this setup.
