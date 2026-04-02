# HTML Tool Audit — Output Schema

For each file analysed, return exactly this JSON structure. No extra commentary outside the JSON.

```json
{
  "filename": "01_StoryMinerPro_v2.3.html",
  "title": "StoryMinerPro v2.3",
  "purpose": "One sentence describing what this tool does for the user.",
  "key_features": [
    "Feature one",
    "Feature two",
    "Feature three"
  ],
  "data_deps": [
    "corpus_autofill.json",
    "stories.json"
  ],
  "version_notes": "Any observations about how this file relates to other versions in the same batch.",
  "verdict": "active-tool | dev-pass | stub | dupe | unknown"
}
```

## Verdict definitions

| Verdict | Meaning |
|---------|---------|
| `active-tool` | Fully built, appears to be a current or recent working tool |
| `dev-pass` | An iteration/build pass of another tool — not independently useful |
| `stub` | Incomplete, minimal content, likely abandoned |
| `dupe` | Content appears identical or near-identical to another file in the batch |
| `unknown` | Cannot determine from file content alone |

## Batch response format

When analysing multiple files in one session, return a JSON array:

```json
[
  { ...file1 },
  { ...file2 }
]
```
