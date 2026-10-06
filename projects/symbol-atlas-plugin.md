---
layout: layouts/base.liquid
title: "Obsidian Plugin - Symbol Atlas"
date: 2026-08-19
updated: 2026-10-06
status: release
icon: 
subtitle: "An obsidian plugin that presents a custom emoji-style picker with stored intention for each emoji. Can be used in a daily journal, note, or any other emoji-related purpose."
tags:
  - obsidian
---

**Status: Release (1.3.1) — not submitted to Community Plugins. Requires Obsidian 1.6.6 or later.**

## Motivation

I created this plugin as a way to make adding emoji into my daily journal more convenient. Why? 

I try and journal every day, it’s very helpful for me to reflect and remember my days, how i’m feeling, what i do, etc. I took from [this obsidian set-up on discord] the idea of using emoji to represent certain types of things happening during the day. examples include: 
- 🧭:: how i’m feeling, generally 
- ⭐:: something i accomplished and am proud of 
- 🛍️:: extraneously spending money 
- 🎮:: playing a video game 

i found the process of doing this, at base, kinda annoying on multiple fronts. for one, having to search amongst the entire set of emoji can be difficult, especially if it’s a symbol you don’t often use, so you forget the exact name or string to search for it. and it can be easy to forget certain symbols even exist without reference a note used to record all the symbols you use (in my case, a “Symbol Atlas”). 

that’s why i had the idea for this plugin. it essentially just presents a list of all the symbols on your Symbol Atlas, along with a description of what each symbol means to you. you can search based on either the emoji name *or* the meaning of that symbol, and quickly insert it. 

There’s also the option to append a predefined string after the symbol, in my case: `::`. this is useful for later querying these symbols using things like dataviewjs, to make tables or charts that include such emoji information. totally optional and user configurable. 

## Features

- **A picker for your own symbols.** Open it from the command palette or with a hotkey (Cmd/Ctrl+Shift+E by default), search, and the symbol goes in at your cursor.
  - Search by what a symbol means to you, its subtitle, or the emoji's own name: "brain" finds 🧠, even in combos like 🧠📺.
  - Sort by recently used or alphabetically.
  - Optionally add text after each symbol, like `::`, so entries are easy to query later.
- **Keep your Symbol Atlas wherever suits you.**
  - Manage symbols in the plugin's settings, each with an optional subtitle for extra context.
  - Or keep them in a note: list items like `- 🧭:: how i'm feeling` under a heading of your choice become symbols.
    - Sub-bullets under a symbol become its subtitle.
    - The list re-syncs whenever you save the note.
  - Import and export the list as JSON.
- **A sidebar for quick inserting.**
  - A few totals at a glance, plus the symbols you've logged in today's note.
  - Your symbols as a list or a grid of emoji buttons: tap one to insert it into the note you were writing.
- **A stats page for your journal.**
  - An activity heatmap, for all your symbols or just one.
  - How the last 30 days compare to the 30 before, how many of your daily notes have symbols, and which symbols tend to show up together.
  - A card for each symbol: how often and how recently you've logged it, streaks, the weekday it leans towards, and its latest entries.
  - Dates come from your daily notes' filenames, in whatever format you use (mine look like `Journal 2026-10-05 Mon`).
  - Every stat can be switched on or off.
- **Upkeep for your atlas.** Spot symbols you've been using that aren't in your atlas yet (one tap to add them), and ones you haven't logged in a while.
- **Works on desktop, iPhone and iPad.**

For the full breakdown of how every feature works, see the [plugin's README on GitHub](https://github.com/Tigertenzin/obsidian-symbol-atlas#readme).

## Versions

- [1.3.1](https://github.com/Tigertenzin/obsidian-symbol-atlas/releases/tag/1.3.1): a new stats page with an activity heatmap, trends, streaks and upkeep, using dates from your daily notes, and a simpler sidebar for quick inserting.
- [1.3.0](https://github.com/Tigertenzin/obsidian-symbol-atlas/releases/tag/1.3.0): fixed the "source note not found" message on every launch on iPhone and iPad, and added the sidebar, insert counts, and subtitles for symbols managed in settings.
- [1.2.1](https://github.com/Tigertenzin/obsidian-symbol-atlas/releases/tag/1.2.1): subtitles from the sub-bullets in your atlas note.
- [1.2.0](https://github.com/Tigertenzin/obsidian-symbol-atlas/releases/tag/1.2.0): keep your symbols in a note, add text after each symbol (like `::`), a proper toolbar icon, and confirmation before deleting or importing.
- [1.1.0](https://github.com/Tigertenzin/obsidian-symbol-atlas/releases/tag/1.1.0): the first release, with search by emoji name.

Every release, with full notes and downloads, is on the [releases page](https://github.com/Tigertenzin/obsidian-symbol-atlas/releases).
