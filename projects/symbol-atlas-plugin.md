---
layout: layouts/base.liquid
title: Symbol Atlas Plugin
date: 2026-08-19
status: release
icon: 
subtitle: "An obsidian plugin that presents a custom emoji-style picker with stored intention for each emoji. Can be used in a daily journal, note, or any other emoji-related purpose."
tags:
  - obsidian
---

**Status: Release — not submitted to Community Plugins.**

## methodology 

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

- Open the picker via the Command Palette or a keyboard shortcut
  (default: Cmd/Ctrl+Shift+E — change it anytime in Settings > Hotkeys).
- Fuzzy search by descriptor name.
- Sort by "Recently used" or "Alphabetical" (toggle in plugin settings).
- Add, edit, and delete symbols directly from the settings tab — no manual
  JSON editing required (though import/export JSON is also supported).
- Selecting a symbol inserts the emoji at your cursor and updates its
  "last used" timestamp.


