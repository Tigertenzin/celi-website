---
layout: layouts/changelog.liquid
title: "Changelog — DoodleBloom"
description: "What's new in each version of DoodleBloom."
eleventyExcludeFromCollections: true
releases:
  - version: "1.0"
    status: Beta
    summary: "The first version, in testing on TestFlight."
    builds:
      - build: 2
        date: 2026-10-02
        changes:
          - type: new
            text: "A Page setting for both widgets: Automatic, Light or Dark. Automatic follows the Home Screen's light or dark mode; Light and Dark fix the page colour, which can look better with glassy icons."
          - type: new
            text: "Previous Day, \"A random day\": a shuffle button jumps to a different random drawing."
          - type: improved
            text: "Previous Day: the Day setting only appears where it does something. With \"Cycle through favourites\" it lists only favourites, and the cycle starts from the one you pick."
          - type: fixed
            text: "Drawings now show on glassy (Clear and Tinted) Home Screens. The Today widget could show a blank white card."
          - type: fixed
            text: "The Previous Day widget no longer goes blank when set to a dark page."
      - build: 1
        date: 2026-09-28
        changes:
          - type: new
            text: "First TestFlight build: daily pages with a grace period, the gallery (grid, list and sketchbook), favourites, prompts and reminders, export and sharing, Year in Bloom, widgets, alternate app icons, and iCloud sync."
          - type: new
            text: "DoodleBloom Premium (the Studio and time-lapse replays) and the tip jar."
---

[← Back to DoodleBloom](/projects/doodlebloom/)
