---
layout: layouts/base.liquid
title: Publish to GitHub Plugin
date: 2026-09-04
status: release
icon: 
subtitle: "An obsidian plugin for publishing my blog posts straight to GitHub. It rewrites the properties, trims off everything below the break, and uploads the images, all in just a few steps."
tags:
  - obsidian
---

**Status: Release — not submitted to Community Plugins.**

## methodology

(to be written later…)

## Features

- Publishes the active note to a configured repo, branch and folder via one command — the note in your vault is never modified.
- A review window listing every property the published copy will carry. Change any value, rename or retype any property, drop one, or add a new one, all for that one publish.
- Properties to add and properties to remove are set up in settings, and act as the defaults the review window starts from.
- Everything from the first break marker onwards (`---` by default) is left out, so working notes below the rule stay in the vault. The review window says which line it found and how much it's about to cut.
- Image embeds are found, uploaded to the repo's attachment folder, and rewritten from `![[image.png|450]]` into something the site can actually render — with the size preserved and an alt text field.
- Publishing over an existing post shows a diff against what's currently live, and takes a separate confirmation before overwriting it.
- The filename is editable at publish time, since notes tend to be titled one way in the vault and another on the site.
- Property names, property values and repository folders are all suggested from what already exists, rather than being typed from memory.
