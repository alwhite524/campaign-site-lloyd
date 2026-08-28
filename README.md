# Lloyd White for Beaumont City Council — campaign site

Static HTML/CSS site. No build step — plain files served by GitHub Pages.

- `index.html` — landing page. Leads with the serialized letter, then the campaign (bio, priorities, endorsements, CTA).
- `story.html` — "The Letter" hub: series intro + the full chapter list.
- `chapter-01.html`, `chapter-02.html`, … — one file per chapter (the reading view).
- `volunteer.html`, `donate.html` — volunteer sign-up / yard-sign forms and the donation page.
- `style.css` — shared stylesheet (UCLA-blue palette; the letter/chapter styles are in the block near the bottom).
- `apps-script/` — Google Apps Script backend for the volunteer/yard-sign forms; see `apps-script/SETUP.md`.

## Publishing a new chapter (weekly)

1. **Copy the last chapter file:** duplicate `chapter-01.html` → `chapter-02.html`.
2. In the new file, update: the `<title>`, the `<meta>` description + `og:` tags, the
   `.chapter-head` kicker (`Chapter Two`), the `<h1>` (the chapter's title), the
   `.chapter-dateline` date, and the `.chapter-body` prose.
3. Update the `.chapter-continue` box and `.chapter-nav` at the bottom to point at the
   *next* chapter, and change the left link if you want a "← Previous chapter" too.
4. **`story.html`:** move that chapter's `<li>` in `.chapter-list` from `class="upcoming"`
   to published (add the real date + a "Read now" link), and add a new `upcoming` `<li>`
   for the chapter after it.
5. **`index.html`:** update the `.chapter-feature` card in the hero — new eyebrow date,
   new `<h2>` title, new one-line teaser, and point "Read" at the new file.
6. Commit and push. GitHub Pages redeploys automatically.

Chapter dates in the current copy assume a **Friday** cadence starting **Aug 28, 2026**.
Adjust the placeholder dates in `story.html` / `index.html` / the chapter footer to match
your real schedule.

## Local preview

Any static file server works. If you have Python:

```bash
python -m http.server 8934
```

Then open `http://localhost:8934`.
