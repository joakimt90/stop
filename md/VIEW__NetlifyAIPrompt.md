Netlify AI Prompt — Corpus Reader Tool
Build a single-page web app using Next.js (App Router) + Tailwind CSS, deployable to Netlify.

Purpose
A browser-based reader/explorer for a structured JSON corpus. The user can manually upload one or more JSON files (drag-and-drop or file picker), and the app parses and displays all entries in a searchable, filterable, browsable interface — entirely client-side, no backend needed.

JSON Schema
Each uploaded file is an array of entry objects. Here is the full schema:

Entry-level fields
Field	Type	Notes
id	string	Unique identifier
title	string	Display title
summary	string	Long description paragraph
author	string	
seed	string	e.g. "zlata"
explicit	string or null	e.g. "erotic" or null
band	string	enum: "core", "excellent", "strong", "good"
match_band	string	same enum as band
review_state	string or null	enum: "approved", "raw", or null
zstyle_score	number	integer, range 85–100
tags	string[]	array of tag slugs
tone	string[]	array of tone descriptors
dna	string[]	array of DNA trait slugs
character_energy	string	pipe-separated energy archetypes
character_note	string	short character description
contortion_focus	string	description of the physical focus
why_it_fits	string	why this entry matches the seed
has_raw_text	boolean	
mined	boolean	
sources	string[]	array of source labels
scenes	Scene[]	array of scene objects (see below)
Scene-level fields (inside scenes array)
Field	Type	Notes
exactWording	string	raw source text
reusableWording	string	cleaned/rewritten version
poseFamily	string	e.g. "oversplit", "backbend"
tags	string[]	scene-level tags
dna	string	free-text DNA description
portability	string	e.g. "high", "medium", "low"
score	number	integer 1–10
matchBand	string	e.g. "excellent", "strong"
Features to Build
1. Upload Area
Full-width drag-and-drop zone at the top (or shown initially when no data is loaded)

Also a "Browse files" button fallback

Accept multiple .json files at once

Parse all uploaded files and merge entries into a single in-memory corpus

Show a small status bar: "303 entries loaded from 2 files"

Allow re-uploading / adding more files later without clearing existing data (merge), with a "Clear all" button

2. Filter Sidebar (left column, collapsible on mobile)
Filters should all work simultaneously (AND logic across filter types):

Search box — full-text search across title, summary, character_note, contortion_focus, why_it_fits

Band — multi-select checkboxes: core, excellent, strong, good

Review State — multi-select: approved, raw, null/unset

Explicit — toggle: show all / erotic only / non-explicit only

Score range — dual-handle range slider for zstyle_score

Tags — searchable tag list (show count per tag), multi-select

Tone — multi-select list (show all unique tones)

Pose Family — multi-select (scene-level poseFamily, show unique values)

Portability — multi-select scene-level field: high, medium, low

Has Raw Text — checkbox toggle

DNA — searchable multi-select for entry-level dna values

Show a "X results" count that updates live. Show a "Reset filters" button.

3. Main Content Area
Card Grid View (default)
Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop

Each card shows:

Title (bold)

Band badge (color-coded: core=purple, excellent=green, strong=blue, good=gray)

Review state badge (approved=green, raw=yellow, unset=gray)

zstyle_score as a prominent number

First 2–3 tags as pill badges

Summary truncated to ~3 lines with ellipsis

Number of scenes (e.g. "4 scenes")

Click to open detail panel

List View (toggle)
Compact single-row layout per entry

Shows: title, band, score, tag count, scene count

4. Entry Detail Panel (slide-in drawer or modal)
When a card is clicked, open a full detail view showing ALL fields:

Title, ID, author, seed

All badges: band, match_band, review_state, explicit

zstyle_score (large)

Full summary

character_energy, character_note

contortion_focus, why_it_fits

dna pills

tone pills

tags pills

sources list

has_raw_text, mined flags

Scenes section (inside the detail panel)
Each scene rendered as a card/accordion

Shows: poseFamily, score, matchBand, portability as badges

scene-level tags as pills

scene-level dna text

Two text blocks with labels:

"Exact Wording" (monospace/blockquote style)

"Reusable Wording" (cleaner style)

A "Copy reusable wording" button for each scene

5. Stats Bar
Sticky top bar (below the header) showing corpus-wide stats:

Total entries | Filtered entries | Total scenes | Avg score

Updates live as filters change

6. Sort Options
Sort by: zstyle_score (desc/asc), title (A-Z), scene count, review_state

Default: zstyle_score descending

Design
Dark theme by default (dark gray background, off-white text)

Color-coded band badges (consistent across cards and detail view)

Clean, dense but readable layout — this is a power-user tool, not a marketing page

Monospace font for exactWording scene text blocks

Smooth transitions on drawer open/close and filter changes

Mobile responsive

Technical Notes
All processing is 100% client-side — no API routes, no server

State managed with React useState / useReducer (or Zustand if preferred)

Filtering/search should be fast even with 500–1000 entries (use useMemo)

No database, no auth, no CMS

Single deployable Next.js app — next export compatible (or App Router with output: 'export')