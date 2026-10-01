# Atlas

A small catalogue of hand-built landing page templates. Browse the grid, open a template, and preview the full page.

## Structure

```
index.html            the catalogue grid
template.html         detail page (?id=<template>)
assets/
  data/templates.json the list of templates (edit this to add one)
  img/                preview + full-page screenshots
  css/                gallery styles
  js/                 gallery + detail scripts
templates/            the templates themselves
```

## Adding a template

1. Drop the template into `templates/`.
2. Add a preview screenshot to `assets/img/`.
3. Add an entry to `assets/data/templates.json`:

```json
{
  "id": "my-template",
  "name": "My Template",
  "category": "SaaS Landing",
  "accent": "#2563eb",
  "preview": "assets/img/my-template-1.png",
  "full": "assets/img/my-template-full.png",
  "url": "templates/my-template.html"
}
```

## Running locally

Because the catalogue loads `templates.json` with `fetch`, it needs a server:

```
python -m http.server 8899
```

Then open http://127.0.0.1:8899

## Included templates

Rubic, Lumen, Hush, Nova, Relay, Bravo.
