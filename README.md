# Know Thyself · بوابة التقييم الذاتي · Self-Assessment Portal · Selvevalueringsportalen

A static website (plain HTML, CSS and JavaScript, no build step) with nine self-assessments and an interactive Islamic will, in **Arabic, English and Danish**. Live at https://knowthyself.vercel.app (Vercel). Every push to `main` deploys.

## Where things are

```
index.html, husband.html, … waseya.html, 404.html   Thin page shells (title, meta tags, scripts)
assets/css/site.css        The one shared design (dark green/gold + light theme)
assets/js/core.js          Language switcher, theme, top bar, toasts, quote rendering, analytics
assets/js/quiz.js          The quiz engine used by all nine assessments
assets/js/home.js          Homepage
assets/js/waseya.js        The interactive will
assets/img/og-image.png    Social-media preview image (1200×630)
content/ui.js              Shared interface text (buttons, results, tools) in ar / en / da
content/<quiz>/quiz.js     Structure of a quiz: areas, aspects, accent colour, YouTube id
content/<quiz>/ar.js       All Arabic text of that quiz
content/<quiz>/en.js       All English text
content/<quiz>/da.js       All Danish text
content/home/…, content/waseya/…   Homepage and will text
vercel.json                Clean URLs, redirects from old addresses, security headers
```

## Editing text

Open the language file and change the text. For example, question 3 of the husband quiz is `questions[2]` in `content/husband/ar.js`, `en.js` and `da.js`. Keep the three files in the same order.

Quran verses and hadith are written as quote objects:

```js
{ ar: 'النص العربي', meaning: 'Translated meaning', src: 'Source' }
```

In Arabic only the Arabic text is shown; in English and Danish the Arabic original is kept and the meaning is shown under it. Add `noAr: true` for quotes that should only show the translation (e.g. the sheikh's own words).

## Scoring (same for every quiz)

Answers 1–5 count as 0, 25, 50, 75, 100 %. Area, aspect and overall scores are averages. Levels: ≥ 80 excellent, ≥ 60 good (the goal), ≥ 40 needs work, below 40 needs serious attention.

## Privacy

Answers never leave the browser. "Save progress" stores them in the browser's local storage on that device only; the will draft is downloaded as a file. Google Analytics records page views only.

## Adding a language

1. Add it to `SQ.LANGS` in `assets/js/core.js`.
2. Add a block for it in `content/ui.js`.
3. Add `<lang>.js` next to each `ar.js` and include it in the page shells.
