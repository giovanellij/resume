# Julian Giovanelli — Personal CV Website

My personal résumé/portfolio, live at **[juliangiovanelli.com](https://juliangiovanelli.com)**.

A single-page, fast, static site — no frameworks, no build step. Just semantic
HTML, one CSS file, and a tiny bit of vanilla JS (dark-mode toggle + sticky-nav
border). Hosted on GitHub Pages on an apex custom domain.

## Project structure

```
index.html     # the page (all content)
styles.css     # all styling (light/dark, print styles)
script.js      # dark-mode toggle, nav-on-scroll, footer year
CNAME          # custom domain for GitHub Pages: juliangiovanelli.com
docs/          # downloadable CV PDFs (and .docx sources)
```

The "Download CV" button links to `docs/CV_Julian_Giovanelli_SoftwareEngineer.pdf`
and saves it as `Julian_Giovanelli_CV.pdf`.

## Local preview

From the repo root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Or just open `index.html` in a browser — the server is only needed so the
`Download CV` link and relative paths behave exactly like production.)

## Updating the site

1. Edit `index.html` / `styles.css` / `script.js`.
2. Preview locally (above).
3. Commit and push to `main` — GitHub Pages redeploys automatically.

```bash
git add -A
git commit -m "Update site"
git push origin main
```

## Deployment (GitHub Pages + custom apex domain)

Deployed from this repo (`giovanellij/resume`), `main` branch, root folder.

### 1. Push the code
```bash
git add -A
git commit -m "Build CV website"
git push origin main
```

### 2. Enable GitHub Pages
- Repo → **Settings → Pages**
- **Source:** *Deploy from a branch*
- **Branch:** `main`, folder **`/ (root)`** → **Save**
  *(Do not pick the `/docs` folder — the site lives at the root; `docs/` is just
  served as `/docs/…` for the PDFs.)*
- The **Custom domain** field should auto-fill `juliangiovanelli.com` from the
  `CNAME` file (or enter it and Save).

### 3. Configure DNS at Namecheap (apex domain)
Domain List → **Manage** → **Advanced DNS**.

- Remove the default parking records (the `@` *URL Redirect* / `CNAME` row that
  Namecheap adds), or they'll conflict.
- Add **four A records**, all with Host `@`:

  | Type | Host | Value             |
  |------|------|-------------------|
  | A    | @    | 185.199.108.153   |
  | A    | @    | 185.199.109.153   |
  | A    | @    | 185.199.110.153   |
  | A    | @    | 185.199.111.153   |

- Add **one CNAME record** for `www`:

  | Type  | Host | Value                    |
  |-------|------|--------------------------|
  | CNAME | www  | giovanellij.github.io.   |

### 4. Enforce HTTPS
Once DNS propagates and GitHub validates the domain (can take a few minutes to a
few hours), go back to **Settings → Pages** and tick **Enforce HTTPS**.

## Contact

- Website: [juliangiovanelli.com](https://juliangiovanelli.com)
- LinkedIn: [julian-giovanelli](https://www.linkedin.com/in/julian-giovanelli-b42893164/)
- Email: julian_giovanelli@hotmail.com

## License

© 2026 Julian Giovanelli. All rights reserved.
