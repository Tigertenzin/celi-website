---
layout: layouts/base.liquid
title: "Privacy Policy — KaoBloom"
description: "What KaoBloom collects, what it never collects, and how to turn it off."
date: 2026-09-15
eleventyExcludeFromCollections: true
---

# Privacy Policy

**KaoBloom**
_Last updated: 15 September 2026_

## The short version

**The keyboard never sends anything, anywhere.** It contains no networking code
at all. It only inserts kaomoji — it never reads what you type.

The keyboard asks for iOS's "Allow Full Access" permission so it can save your
recents and usage counts on your device. It is **optional**, it sends us nothing,
and the keyboard works normally if you decline — see **About "Allow Full Access"**
below.

The app collects anonymous, aggregate statistics about which features get used —
never what you type, never your custom kaomoji, never your searches. You can turn
it off in Settings.

## The keyboard extension collects nothing

The KaoBloom keyboard extension makes **no network requests of any kind**. There is
no analytics code and no networking code in the extension.

It only ever *inserts* text. It does not read the field you are typing in, does
not read the surrounding document, and does not record your keystrokes.

Your favorites, hidden kaomoji, and usage counts live only on your device, in a
storage container shared between the app and its keyboard. They are never
uploaded.

## About "Allow Full Access"

The keyboard asks for iOS's **Allow Full Access** permission. It is optional. The
keyboard works completely normally without it, and you can turn it off at any time
in Settings → General → Keyboard → Keyboards.

**Why it is needed.** The keyboard runs in its own sandbox, separate from the app.
Without Full Access, iOS mounts the app's shared storage **read-only** for the
keyboard: it can read your kaomoji and favorites, but cannot save anything back.
That is what blocks Recent, Frequent, and the Stats screen — the keyboard has no
way to record that you used a kaomoji.

**What we use it for.** Writing to that shared storage on your device, and nothing
else: your usage counts, your recents, and favorites you star from the keyboard.

**What it does not change.** The keyboard still makes no network requests. Nothing
it saves is uploaded. Granting this permission does not cause anything to be sent
to us or to anyone else.

**An honest note on what this permission means.** Earlier versions of this app did
not request Full Access, which meant iOS itself made transmission impossible. That
is no longer the case. With Full Access granted, iOS *would permit* a keyboard to
use the network and to read what you type. We do not do either — there is no
networking code in the extension, and it only ever inserts text — but you are now
trusting our design rather than an operating-system restriction. If you would
rather not extend that trust, decline the permission. The keyboard stays fully
functional; you simply won't get Recent, Frequent, or Stats.

**If you decline.** Every kaomoji, every category, and search all work exactly the
same. Only the features that require saving are unavailable.

## What the app collects

If **Share Anonymous Usage Data** is enabled (on by default; you can turn it off
at any time in Settings → Privacy), the app sends anonymous product analytics
through [TelemetryDeck](https://telemetrydeck.com), a privacy-focused analytics
provider based in Germany.

We collect **counts and fixed categories only**. The complete list of what the
app reports:

**Setup**
- That the app launched for the first time
- Whether the keyboard-setup prompt was shown, dismissed, or acted on
- That the keyboard was enabled, and roughly how long after install (bucketed as
  "under an hour", "1–24 hours", "1–7 days", or "over a week" — never an exact time)

**Feature use**
- That a custom kaomoji was created or deleted, how many you have, how many
  categories you assigned, and whether you favorited it on creation
- That a kaomoji was favorited or unfavorited, how many favorites you have, and
  whether it was custom or built-in
- For built-in kaomoji only: which categories were favorited (e.g. "love", "animals")
- A periodic summary of your favorites — a size range, the proportion that are
  custom, and up to three top built-in categories
- That a kaomoji was hidden or unhidden, and roughly how many are hidden
- Which sort mode and how many category filters were applied, and **whether**
  search was used — never what was searched for
- Which tab was opened
- Settings changes: accent color, default tab, that categories were reordered,
  and whether the Custom tab is shown

**Purchases**
- That the upgrade screen was viewed, and which part of the app opened it
- That a purchase was started, completed, cancelled, or failed, and which
  product it was (premium, or which tip amount)
- For failures, a general category only: "network", "verification", "pending",
  or "unknown"
- That purchases were restored, and whether premium was found

**Technical**
- How long the one-time kaomoji database setup took, and how many entries were added
- App version, iOS version, device model, platform, and language/region — attached
  automatically by TelemetryDeck to every event

## What we never collect

- **The kaomoji you type.** Not in the keyboard, not in the app. The keyboard
  makes no network requests.
- **Your custom kaomoji.** We count how many you have. We never see what they are.
- **Your search queries.** We record only whether search was used, never the text.
- **Anything you type in other apps.** The keyboard only inserts text. It never
  reads the field you are typing in, and it has no way to send anything anywhere.
- **Advertising identifiers (IDFA), or any cross-app or cross-website tracking.**
  We do not track you. We do not share data with advertisers or data brokers.
- **Your name, email address, phone number, location, contacts, or photos.**
- **Detailed purchase error messages**, which can contain account details. Only a
  general category is recorded.
- **Precise timestamps.** Durations are reported as ranges.

## Identifiers

TelemetryDeck derives an anonymous installation identifier by hashing and salting
Apple's vendor identifier (IDFV) on your device. It cannot be reversed to identify
you, is not linked to your identity, and is not used for tracking. It exists only
so that repeat visits from one installation aren't counted as many different
people.

Under Apple's privacy definitions, the data we collect is **not linked to your
identity** and is **not used for tracking**.

## Purchases

Premium and tips are processed entirely by Apple. We never see or receive your
payment details. Apple's own privacy policy governs that transaction.

## Turning it off

**Settings → Privacy → Share Anonymous Usage Data.**

Turning it off stops all analytics immediately. The app remains fully functional.

## Data retention and location

Analytics data is processed by TelemetryDeck. Because the data is anonymous and
aggregated, we cannot identify or retrieve an individual person's records — which
also means we cannot delete data for a specific individual, since there is no way
to determine which records came from you. Turning off the setting prevents any
further data from being sent.

## Children

We do not knowingly collect data from children. The app collects no personal
information from anyone, regardless of age.

## Changes to this policy

Material changes will be noted in the app's release notes and reflected in the
"last updated" date above.

## Contact

Questions about privacy: **oaksParceliOS@gmail.com**
