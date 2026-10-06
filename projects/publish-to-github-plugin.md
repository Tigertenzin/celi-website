---
layout: layouts/base.liquid
title: Publish to GitHub Plugin
date: 2026-09-04
status: release
icon: 
subtitle: "An obsidian plugin for publishing my blog posts straight to GitHub. It rewrites the properties, trims off everything below the break, and uploads the post and its images together in a single commit, all in just a few steps."
tags:
  - obsidian
---

**Status: Release (0.2.0) — not submitted to Community Plugins. Requires Obsidian 1.11.4 or later.**

## methodology

(to be written later…)

{% raw %}
## Features

- Publishes the active note to a configured repo, branch and folder via one command — the note in your vault is never modified.
- The post and its images go up together in a single commit, so they land together or not at all. A failed publish leaves the repo exactly as it was.
- A review window listing every property the published copy will carry. Change any value, rename or retype any property, drop one, or add a new one, all for that one publish.
- Properties to add and properties to remove are set up in settings, and act as the defaults the review window starts from. Default values can use placeholders like `{{date}}`, `{{slug}}` or `{{date:MMMM D, YYYY}}`.
- Everything from the first break marker onwards (`---` by default) is left out, so working notes below the rule stay in the vault. A `---` inside a code block or under a heading doesn't count, and the review window says which line it found and how much it's about to cut.
- Obsidian-only syntax is converted for the web: comments (`%% … %%`) are removed, `==highlights==` become `<mark>`, and links to other notes become plain text, with a warning listing each one in case it was meant to link somewhere on the site.
- Embedded images are uploaded into a folder of their own for each post, and rewritten from `![[image.png|450]]` into something the site can actually render — with the size preserved and an alt text field. Videos and audio become players, and PDFs become links.
- The preview shows exactly what will change: each image is marked new, changed, or unchanged, and an unchanged post isn't committed again.
- Publishing over an existing post shows a diff against what's currently live, and takes a separate confirmation before overwriting it. If the post changed on GitHub in the meantime, nothing is committed.
- The filename is editable at publish time, since notes tend to be titled one way in the vault and another on the site. It starts from a template (`{{slug}}.md`, say), and after the first publish it's remembered, so republishing always goes back to the same file.
- The GitHub token is kept in Obsidian's secret storage on your device, not in the vault, so backups and sync never copy it.
- When a publish succeeds, the notice links straight to the commit and the post on GitHub.
- Property names, property values and repository folders are all suggested from what already exists, rather than being typed from memory.

## What's new in 0.2.0

The biggest update so far: posts and their images now publish in one commit, the token moved into Obsidian's secret storage, Obsidian syntax gets converted for the web, filenames and property defaults can use placeholders, and sixteen bugs got fixed — including images from different posts overwriting each other. Full notes are on the [0.2.0 release](https://github.com/Tigertenzin/obsidian-publish-to-github/releases/tag/0.2.0).
{% endraw %}
