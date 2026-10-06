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
- **Your GitHub token stays safe.** It's kept in Obsidian's secret storage on your device, never in your vault.

For the full breakdown of how every feature works, see the [plugin's README on GitHub](https://github.com/Tigertenzin/obsidian-publish-to-github#readme).

## What's new in 0.2.0

The biggest update so far: posts and their images now publish in one commit, the token moved into Obsidian's secret storage, Obsidian syntax gets converted for the web, filenames and property defaults can use placeholders, and sixteen bugs got fixed — including images from different posts overwriting each other. Full notes are on the [0.2.0 release](https://github.com/Tigertenzin/obsidian-publish-to-github/releases/tag/0.2.0).
{% endraw %}
