---
layout: layouts/base.liquid
title: "Obsidian Plugin - Static Site Publisher"
date: 2026-09-04
updated: 2026-10-19
status: release
icon: 
subtitle: "An obsidian plugin for publishing my blog posts straight to GitHub. It rewrites the properties, trims off everything below the break, and uploads the post and its images together in a single commit, all in just a few steps."
tags:
  - obsidian
---

**Status: Release (0.4.0) — not submitted to Community Plugins. Requires Obsidian 1.11.4 or later.**

*Formerly called Publish to GitHub.*

## Motivation

I developed this when I started writing this blog, and wanted a way to publish from where I wrote (Obsidian) to GitHub (where my website files live). The beauty of Obsidian is that there's a huge array of community run and developed plugins to make it do exactly what anyone could want. Except, I couldn't find a plugin that worked for my exact publishing workflow (some publishing to GitHub ones existed, but didn't do quite what I wanted). So I created it myself, with the help of Claude Code since I'm still relatively new to coding for Obsidian.

What I wanted was pretty simple, since both Obsidian and my blog, which is built using Eleventy, are based on markdown files. So all I really needed was a plugin that could upload my markdown files, while altering the properties at the top of each post and handling any attachments. And that's what I tried to create here!

It's very tailored towards my exact needs, so if you use it, I can't guarantee it'll do what you need it to. But who knows, maybe it will!

{% raw %}
## Features

- **Publish with one command.** The active note goes straight to your repo, branch and folder, and the note in your vault is never touched.
  - The post and its images go up together in a single commit, so nothing is ever left half-published.
  - Republishing over a live post shows you a diff first, and asks before overwriting it.
- **Review everything before it goes out.** A review window shows every property the published copy will carry, and lets you change, add or drop any of them for that one publish.
  - Settings decide which properties are added or removed by default, with placeholders like `{{date}}` and `{{slug}}` for values.
  - Property names, values and repo folders are suggested from what you already use.
- **Cleaned up for the web.**
  - Anything below a break marker stays private in your vault.
  - Obsidian-only syntax like comments, highlights and links to other notes is converted into something a website understands.
- **Images taken care of.**
  - Embedded images, videos, audio and PDFs are uploaded alongside the post, in a folder of their own, and rewritten into embeds the site can display.
  - Photos and screenshots are converted to JPEG or WebP and shrunk before they go up, so a 5 MB iPhone photo lands at around 150 KB. GIFs are left alone so they keep moving, and the original in your vault is never changed.
  - Every image gets its own format and quality controls in the review window, with a preview of the result and its size before and after.
- **Your GitHub token stays safe.** It's kept in Obsidian's secret storage on your device, never in your vault.

For the full breakdown of how every feature works, see the [plugin's README on GitHub](https://github.com/Tigertenzin/obsidian-static-site-publisher#readme).

## What's new in 0.4.0

Image compression! Photos from my iPhone are several megabytes each, which is way too heavy for a web page, and GitHub kept warning me about them. So now the plugin converts images to JPEG (or WebP) and scales them down before uploading. Each image in the review window gets a **Convert** button and its own format and quality settings, and there's a **Convert all images** button with a progress bar for doing them all at once.

It converts one image at a time on purpose, since processing a whole post's worth of full-size photos at once could use enough memory to crash Obsidian on a phone. It's also a little smart about it: images with transparency switch to WebP so they don't get a white background, and anything that would come out bigger just gets uploaded as it was. This release also fixes date fields in the review window shrinking to a thin line on iPhone and iPad. Full notes are on the [0.4.0 release](https://github.com/Tigertenzin/obsidian-static-site-publisher/releases/tag/0.4.0).
{% endraw %}
