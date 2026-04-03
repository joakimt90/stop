######OUTPUT_1######

{
  "batch_id": "MD-01",
  "batch_label": "Audit / SOP / provenance",
  "files": [
    {
      "staging_filename": "01-20260402_STORIES_FOLDER_SCAN_PREVIEW.md",
      "original_filename_without_prefix": "20260402_STORIES_FOLDER_SCAN_PREVIEW.md",
      "doc_family": "MAPS",
      "purpose": "Provides a timestamped snapshot of the project folder structure and file contents for audit context.",
      "canonical_status": "generated",
      "likely_duplicates": [],
      "keep_archive_delete": "archive",
      "recommended_final_folder": "TOOLS/DOCS/MAPS",
      "notes": "Historical snapshot of state prior to cleanup; useful for provenance but superseded by final taxonomy."
    },
    {
      "staging_filename": "01-cleanup__SCOPE_DRIFT_SOP.md",
      "original_filename_without_prefix": "cleanup__SCOPE_DRIFT_SOP.md",
      "doc_family": "SOP",
      "purpose": "Master procedure for addressing tool overlap and scope drift across the project.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/SOP",
      "notes": "Foundation doc for the entire cleanup methodology."
    },
    {
      "staging_filename": "01-TOOLS__DOCS__AUDITS__AUDIT_SCHEMA.md",
      "original_filename_without_prefix": "TOOLS__DOCS__AUDITS__AUDIT_SCHEMA.md",
      "doc_family": "SCHEMA",
      "purpose": "Defines the mandatory JSON structure for tool audit outputs.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/AUDITS",
      "notes": "Ensures consistency across all LLM-driven audit passes."
    },
    {
      "staging_filename": "01-TOOLS__DOCS__AUDITS__HTML__html_scans.md",
      "original_filename_without_prefix": "TOOLS__DOCS__AUDITS__HTML__html_scans.md",
      "doc_family": "AUDITS",
      "purpose": "Aggregated audit results for the HTML tool lineage.",
      "canonical_status": "generated",
      "likely_duplicates": [],
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/AUDITS/HTML",
      "notes": "The primary analytical output for the HTML tool family."
    },
    {
      "staging_filename": "01-TOOLS__DOCS__AUDITS__HTML_FEATURES_PLAN.md",
      "original_filename_without_prefix": "TOOLS__DOCS__AUDITS__HTML_FEATURES_PLAN.md",
      "doc_family": "ARCHITECTURE",
      "purpose": "Technical implementation strategy for merging features identified during audits.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/AUDITS",
      "notes": "High-value bridge between audit results and technical execution."
    },
    {
      "staging_filename": "01-TOOLS__DOCS__ORIGIN__fileoriginindex.md",
      "original_filename_without_prefix": "TOOLS__DOCS__ORIGIN__fileoriginindex.md",
      "doc_family": "ORIGIN",
      "purpose": "Maps staging/audit filenames back to their original source paths and forward to final destinations.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/ORIGIN",
      "notes": "Critical for data integrity and tracking file provenance."
    },
    {
      "staging_filename": "01-TOOLS__DOCS__SOP__GEM_SPEC.md",
      "original_filename_without_prefix": "TOOLS__DOCS__SOP__GEM_SPEC.md",
      "doc_family": "SOP",
      "purpose": "System instructions for Gemini to perform tool audits.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/SOP",
      "notes": "Instruction set required for any future tool cleanup batches."
    }
  ],
  "batch_summary": {
    "role_in_system": "Governance and cleanup workflow foundation.",
    "highest_value_docs": [
      "cleanup__SCOPE_DRIFT_SOP.md",
      "TOOLS__DOCS__SOP__GEM_SPEC.md",
      "TOOLS__DOCS__AUDITS__AUDIT_SCHEMA.md",
      "TOOLS__DOCS__ORIGIN__fileoriginindex.md"
    ],
    "duplicate_risks": [
      "Low. This batch contains unique governance files rather than content."
    ],
    "recommended_moves": [
      "Move generated scans to MAPS/ARCHIVE.",
      "Keep SOPs and Schemas in root TOOLS/DOCS/ subfolders as permanent governance."
    ],
    "archive_candidates": [
      "20260402_STORIES_FOLDER_SCAN_PREVIEW.md"
    ],
    "open_questions": [
      "Are there earlier iterations of the SCOPE_DRIFT_SOP in non-MD folders that should be purged?",
      "Does the fileoriginindex.md need to be updated to reflect the final MD cleanup moves?"
    ]
  }
}


######OUTPUT_2######

{
  "batch_id": "MD-02",
  "batch_label": "Architecture / schema / pipeline",
  "files": [
    {
      "staging_filename": "02-CORPUS_TAXONOMY__schema-taxonomy-archive.md",
      "original_filename_without_prefix": "CORPUS_TAXONOMY__schema-taxonomy-archive.md",
      "doc_family": "SCHEMA",
      "architecture_or_schema": "schema",
      "purpose": "Canonical reference for Workbench record schema (v5.2) and core taxonomy labels.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_primary_file": "self",
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/SCHEMA",
      "notes_for_consolidation": "Primary authoritative source for system-wide data fields."
    },
    {
      "staging_filename": "02-CORPUS_TAXONOMY__workbench-upgrade-spec.md",
      "original_filename_without_prefix": "CORPUS_TAXONOMY__workbench-upgrade-spec.md",
      "doc_family": "ARCHITECTURE",
      "architecture_or_schema": "architecture",
      "purpose": "Technical specification for merging StoryMinerPro features into Workbench v6.1.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_primary_file": "self",
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/ARCHITECTURE",
      "notes_for_consolidation": "Defines the unified tool architecture for the system's primary application."
    },
    {
      "staging_filename": "02-README.md",
      "original_filename_without_prefix": "README.md",
      "doc_family": "ARCHITECTURE",
      "architecture_or_schema": "architecture",
      "purpose": "Master project overview including folder structure, classification system, and status.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_primary_file": "self",
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/ARCHITECTURE",
      "notes_for_consolidation": "This is the root project roadmap and classification key."
    },
    {
      "staging_filename": "02-LIBRARY__schema.md",
      "original_filename_without_prefix": "LIBRARY__schema.md",
      "doc_family": "SCHEMA",
      "architecture_or_schema": "schema",
      "purpose": "Field guide for the extended StoryMinerPro vNext schema (Scenes, Extractions, Concepts).",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_primary_file": "self",
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/SCHEMA",
      "notes_for_consolidation": "Authoritative schema for the extended 'vNext' data model."
    },
    {
      "staging_filename": "02-LIBRARY__schema1.md",
      "original_filename_without_prefix": "LIBRARY__schema1.md",
      "doc_family": "SCHEMA",
      "architecture_or_schema": "schema",
      "purpose": "Basic instructions for adding a story to stories.json.",
      "canonical_status": "duplicate",
      "likely_duplicates": [
        "02-LIBRARY__story-library-package__hybrid-version__schema.md",
        "02-LIBRARY__story-library-package__json-version__schema.md"
      ],
      "recommended_primary_file": "02-CORPUS_TAXONOMY__schema-taxonomy-archive.md",
      "keep_archive_delete": "delete",
      "recommended_final_folder": "none",
      "notes_for_consolidation": "A derivative instruction sheet that should be merged into canonical schema documentation."
    },
    {
      "staging_filename": "02-LIBRARY__story-library-package__hybrid-version__schema.md",
      "original_filename_without_prefix": "LIBRARY__story-library-package__hybrid-version__schema.md",
      "doc_family": "SCHEMA",
      "architecture_or_schema": "schema",
      "purpose": "Field guide and template for the hybrid library package.",
      "canonical_status": "package-local",
      "likely_duplicates": [
        "02-LIBRARY__schema1.md",
        "02-LIBRARY__story-library-package__json-version__schema.md"
      ],
      "recommended_primary_file": "02-CORPUS_TAXONOMY__schema-taxonomy-archive.md",
      "keep_archive_delete": "archive",
      "recommended_final_folder": "TOOLS/DOCS/SCHEMA",
      "notes_for_consolidation": "Implementation detail for specific tool package; duplicate of basic schema."
    },
    {
      "staging_filename": "02-LIBRARY__README.md",
      "original_filename_without_prefix": "LIBRARY__README.md",
      "doc_family": "ARCHITECTURE",
      "architecture_or_schema": "architecture",
      "purpose": "Package documentation for StoryMinerPro vNext modes and migration.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_primary_file": "self",
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/ARCHITECTURE",
      "notes_for_consolidation": "Describes the vNext tool pipeline and mode logic."
    },
    {
      "staging_filename": "02-LIBRARY__story-library-package__README.md",
      "original_filename_without_prefix": "LIBRARY__story-library-package__README.md",
      "doc_family": "ARCHITECTURE",
      "architecture_or_schema": "architecture",
      "purpose": "Explains the difference between json-version and hybrid-version packages.",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_primary_file": "self",
      "keep_archive_delete": "keep",
      "recommended_final_folder": "TOOLS/DOCS/ARCHITECTURE",
      "notes_for_consolidation": "Critical for understanding package delivery variants."
    }
  ],
  "batch_summary": {
    "role_in_system": "Defines the core data structures (Schema) and the tool integration logic (Architecture) for the STORIES ecosystem.",
    "highest_value_docs": [
      "02-CORPUS_TAXONOMY__schema-taxonomy-archive.md",
      "02-CORPUS_TAXONOMY__workbench-upgrade-spec.md",
      "02-README.md"
    ],
    "duplicate_risks": [
      "The various 'schema' files in the LIBRARY folder (schema1, hybrid-version, json-version) are near-identical and represent significant copy drift."
    ],
    "recommended_moves": [
      "Designate 'CORPUS_TAXONOMY__schema-taxonomy-archive.md' as the single source of truth for all schemas.",
      "Consolidate package-local READMEs into a single 'Library Architecture' document in TOOLS/DOCS/ARCHITECTURE."
    ],
    "archive_candidates": [
      "02-LIBRARY__schema1.md",
      "02-LIBRARY__story-library-package__hybrid-version__schema.md"
    ],
    "open_questions": [
      "Should the 'vNext' schema (Scenes/Extractions) be fully merged into the Workbench v5.2 canonical archive, or remain a separate layer?"
    ]
  }
}



######OUTPUT_3######


{
  "batch_id": "MD-03",
  "batch_label": "Corpus processing / index / summary",
  "files": [
    {
      "staging_filename": "03-1_LIBRARY__ContortionFiction_ZlataProse_v1.0.md",
      "original_filename_without_prefix": "ContortionFiction_ZlataProse_v1.0.md",
      "doc_family": "REFERENCE",
      "purpose": "A practical prose guide and glossary for writers and LLMs to produce Zlata-style fiction.",
      "generated_vs_handauthored": "hand-authored",
      "keep_archive_regenerate": "keep",
      "recommended_final_folder": "REFERENCE",
      "overlap_with_other_docs": "Contains the 'Locked Zlata House Glossary' which overlaps with other taxonomy definitions.",
      "importance_for_future_builds": "High. Essential for maintaining narrative consistency in future LLM story generation."
    },
    {
      "staging_filename": "03-1_LIBRARY__ZlataCodexIndexList_v1.0.md",
      "original_filename_without_prefix": "ZlataCodexIndexList_v1.0.md",
      "doc_family": "REFERENCE",
      "purpose": "Master index of Zlata-style images and video clips with pose tags for story recombination.",
      "generated_vs_handauthored": "hand-authored",
      "keep_archive_regenerate": "keep",
      "recommended_final_folder": "REFERENCE",
      "overlap_with_other_docs": "References the Visual Codex and provides IDs used in story metadata.",
      "importance_for_future_builds": "High. Provides the 'Media Library' metadata for tool ingestion."
    },
    {
      "staging_filename": "03-cleanup__story-corpus-processing-pipeline.md",
      "original_filename_without_prefix": "story-corpus-processing-pipeline.md",
      "doc_family": "ARCHITECTURE",
      "purpose": "Defines the standard workflow for converting raw story text into structured JSON data.",
      "generated_vs_handauthored": "hand-authored",
      "keep_archive_regenerate": "keep",
      "recommended_final_folder": "ARCHITECTURE",
      "overlap_with_other_docs": "Redundant with '03-TOOLS__story-corpus-processing-pipeline.md'.",
      "importance_for_future_builds": "Medium. Provides logic for ingestion scripts."
    },
    {
      "staging_filename": "03-research__Zlata_Master_Index.md",
      "original_filename_without_prefix": "Zlata_Master_Index.md",
      "doc_family": "MAPS",
      "purpose": "A human-readable report of processed stories, including scores and keyword highlights.",
      "generated_vs_handauthored": "generated",
      "keep_archive_regenerate": "archive",
      "recommended_final_folder": "MAPS",
      "overlap_with_other_docs": "Summarizes the content found in the various *.StoriesSummary.md files.",
      "importance_for_future_builds": "Low. Useful as a snapshot but should be regenerated after the next cleanup."
    },
    {
      "staging_filename": "03-STORIES__DeviantARTStoriesSummary.md",
      "original_filename_without_prefix": "DeviantARTStoriesSummary.md",
      "doc_family": "REFERENCE",
      "purpose": "JSON-structured summaries and metadata for the DeviantArt source corpus.",
      "generated_vs_handauthored": "generated",
      "keep_archive_regenerate": "regenerate",
      "recommended_final_folder": "REFERENCE",
      "overlap_with_other_docs": "Individual entries are indexed in the Master Index.",
      "importance_for_future_builds": "High. This is the source-of-truth metadata for the StoryLibrary tool."
    },
    {
      "staging_filename": "03-STORIES__MiscSourcesStoriesSummary.md",
      "original_filename_without_prefix": "MiscSourcesStoriesSummary.md",
      "doc_family": "REFERENCE",
      "purpose": "JSON-structured summaries for secondary story sources (Literotica, etc.).",
      "generated_vs_handauthored": "generated",
      "keep_archive_regenerate": "regenerate",
      "recommended_final_folder": "REFERENCE",
      "overlap_with_other_docs": "Follows the same schema as other summary files.",
      "importance_for_future_builds": "High. Source data for corpus analysis."
    },
    {
      "staging_filename": "03-STORIES__txt__Z_Clean_Text__story_snippets_summary.md",
      "original_filename_without_prefix": "story_snippets_summary.md",
      "doc_family": "MAPS",
      "purpose": "Aggregated preview of the first 25 lines of each story for quick analysis.",
      "generated_vs_handauthored": "generated",
      "keep_archive_regenerate": "archive",
      "recommended_final_folder": "ARCHIVE",
      "overlap_with_other_docs": "Direct overlap with raw .txt story files.",
      "importance_for_future_builds": "Low. Transient working document for auditing."
    },
    {
      "staging_filename": "03-STORIES__ZlataStoriesSummary.md",
      "original_filename_without_prefix": "ZlataStoriesSummary.md",
      "doc_family": "REFERENCE",
      "purpose": "JSON-structured summaries for the core 'Space corpus' and Zlata-themed stories.",
      "generated_vs_handauthored": "generated",
      "keep_archive_regenerate": "regenerate",
      "recommended_final_folder": "REFERENCE",
      "overlap_with_other_docs": "Primary data source for the Zlata Master Index.",
      "importance_for_future_builds": "High. Core metadata for the primary tool lineage."
    },
    {
      "staging_filename": "03-TOOLS__story-corpus-processing-pipeline.md",
      "original_filename_without_prefix": "story-corpus-processing-pipeline.md",
      "doc_family": "SOP",
      "purpose": "Advanced documentation for a replicable multi-LLM pipeline for text-to-JSON conversion.",
      "generated_vs_handauthored": "hand-authored",
      "keep_archive_regenerate": "keep",
      "recommended_final_folder": "SOP",
      "overlap_with_other_docs": "Supersedes the simpler '03-cleanup' version of the pipeline.",
      "importance_for_future_builds": "High. Essential for future corpus growth and automation."
    }
  ],
  "batch_summary": {
    "role_in_system": "Operational corpus intelligence: This batch contains the definitions for data transformation (Pipelines) and the actual analytical data (Summaries/Indices) used by the tools.",
    "highest_value_docs": [
      "03-TOOLS__story-corpus-processing-pipeline.md",
      "03-1_LIBRARY__ContortionFiction_ZlataProse_v1.0.md",
      "03-1_LIBRARY__ZlataCodexIndexList_v1.0.md"
    ],
    "duplicate_risks": [
      "The pipeline documentation exists in two locations; the version in TOOLS/ should be treated as canonical."
    ],
    "recommended_moves": [
      "Move hand-authored guides (Prose Guide, Codex Index) to REFERENCE.",
      "Move the advanced Pipeline documentation to SOP.",
      "Consolidate the JSON summary files into a dedicated DATA or REFERENCE/CORPUS subfolder."
    ],
    "archive_candidates": [
      "03-research__Zlata_Master_Index.md",
      "03-STORIES__txt__Z_Clean_Text__story_snippets_summary.md"
    ],
    "open_questions": [
      "Can the Master Index generation be automated via a Python script instead of being maintained as a static Markdown file?",
      "Are there discrepancies between the 'Locked Glossary' in the Prose Guide and the actual tags being generated in the JSON summaries?"
    ]
  }
}


######OUTPUT_4######


{
  "batch_id": "MD-04",
  "batch_label": "Idea-system / creative reference docs",
  "files": [
    {
      "staging_filename": "04-IDEAS__Reference_Docs__ZlataCodex_Visual_Pose_Reference_Bible_v1.0.md",
      "original_filename_without_prefix": "ZlataCodex_Visual_Pose_Reference_Bible_v1.0.md",
      "doc_family": "REFERENCE",
      "idea_system_role": "Visual/Prose Bible",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "merge_candidates": [],
      "recommended_final_folder": "REFERENCE",
      "notes_on_scope": "The primary canonical visual and prose master reference for the system. Guarantees geometric precision and terminology compliance."
    },
    {
      "staging_filename": "04-IDEAS__ContortionBurlesque.md",
      "original_filename_without_prefix": "ContortionBurlesque.md",
      "doc_family": "REFERENCE",
      "idea_system_role": "Knowledge Deep-Dive",
      "canonical_status": "canonical",
      "likely_duplicates": [
        "04-cleanup__IDEAS__Knowledge__ContortionBurlesque.md"
      ],
      "merge_candidates": [],
      "recommended_final_folder": "REFERENCE",
      "notes_on_scope": "Detailed historical and style-matched creative reference merged from multiple source RTFs."
    },
    {
      "staging_filename": "04-IDEAS__IdeaINDEX.md",
      "original_filename_without_prefix": "IdeaINDEX.md",
      "doc_family": "IDEAS",
      "idea_system_role": "Idea Index",
      "canonical_status": "canonical",
      "likely_duplicates": [
        "04-cleanup__IDEAS__Knowledge__IdeaINDEX.md"
      ],
      "merge_candidates": [
        "ZlataPrompts.md"
      ],
      "recommended_final_folder": "IDEAS",
      "notes_on_scope": "Master file containing 125 structured story ideas. Provides high-depth ideation seeds."
    },
    {
      "staging_filename": "04-IDEAS__ZlataPrompts.md",
      "original_filename_without_prefix": "ZlataPrompts.md",
      "doc_family": "IDEAS",
      "idea_system_role": "Prompt Bank",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "merge_candidates": [
        "IdeaINDEX.md"
      ],
      "recommended_final_folder": "IDEAS",
      "notes_on_scope": "75 high-quality prompt seeds optimized for StoryMinerPro usage. Lower depth than IdeaINDEX but wider volume."
    },
    {
      "staging_filename": "04-IDEAS__SCAN_INDEX.md",
      "original_filename_without_prefix": "SCAN_INDEX.md",
      "doc_family": "MAPS",
      "idea_system_role": "Audit Tracking",
      "canonical_status": "generated",
      "likely_duplicates": [],
      "merge_candidates": [],
      "recommended_final_folder": "TOOLS/DOCS/MAPS",
      "notes_on_scope": "Workspace inventory snapshot used for tracking classification and anomalies during cleanup."
    },
    {
      "staging_filename": "04-IDEAS__MERGE_CANDIDATES.md",
      "original_filename_without_prefix": "MERGE_CANDIDATES.md",
      "doc_family": "MAPS",
      "idea_system_role": "Cleanup Execution",
      "canonical_status": "generated",
      "likely_duplicates": [],
      "merge_candidates": [],
      "recommended_final_folder": "TOOLS/DOCS/MAPS",
      "notes_on_scope": "Working roadmap for renaming, merging, and deleting files to resolve project drift."
    },
    {
      "staging_filename": "04-cleanup__IDEAS__GEMPROMPT.md",
      "original_filename_without_prefix": "GEMPROMPT.md",
      "doc_family": "SOP",
      "idea_system_role": "Pipeline Instruction",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "merge_candidates": [],
      "recommended_final_folder": "TOOLS/DOCS/SOP",
      "notes_on_scope": "Specific instruction set for LLM-driven corpus append-only updates."
    },
    {
      "staging_filename": "04-cleanup__IDEAS__IDEAS_GEM_SPEC.md",
      "original_filename_without_prefix": "IDEAS_GEM_SPEC.md",
      "doc_family": "SOP",
      "idea_system_role": "Governance",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "merge_candidates": [],
      "recommended_final_folder": "TOOLS/DOCS/SOP",
      "notes_on_scope": "System prompt and instructions for auditing the ideas/creative batch."
    }
  ],
  "batch_summary": {
    "role_in_system": "This batch comprises the 'creative engine' of the STORIES project, containing both the raw material for generation (Ideas/Prompts) and the constraints/knowledge (Reference Bibles) required for consistency.",
    "highest_value_docs": [
      "ZlataCodex_Visual_Pose_Reference_Bible_v1.0.md",
      "IdeaINDEX.md",
      "ContortionBurlesque.md"
    ],
    "duplicate_risks": [
      "Multiple copies of IdeaINDEX and ContortionBurlesque exist in 'Knowledge' subfolders created during staging; these should be deleted once the canonical versions are moved."
    ],
    "recommended_moves": [
      "Move all 'Reference' and 'Deep-Dive' documents to a top-level REFERENCE folder.",
      "Move the 'IdeaINDEX' and 'ZlataPrompts' to a dedicated IDEAS folder for active generation.",
      "Relocate Audit artifacts (SCAN_INDEX, MERGE_CANDIDATES) and SOPs (GEMPROMPT, GEM_SPEC) to the TOOLS/DOCS hierarchy."
    ],
    "archive_candidates": [
      "04-cleanup__IDEAS__Knowledge__ContortionBurlesque.md",
      "04-cleanup__IDEAS__Knowledge__IdeaINDEX.md"
    ],
    "open_questions": [
      "Should IdeaINDEX and ZlataPrompts be formally merged into a single multi-depth prompt database, or maintained as separate 'seed' and 'full' files as recommended in MERGE_CANDIDATES?"
    ]
  }
}


######OUTPUT_5######

{
  "batch_id": "MD-05",
  "batch_label": "Builder / handoff / operator docs",
  "files": [
    {
      "staging_filename": "05-BUILDER_NOTES__BUILDERS_NOTES.md",
      "original_filename_without_prefix": "BUILDERS_NOTES.md",
      "doc_family": "HANDOFF",
      "operator_value": "High",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_final_folder": "TOOLS/DOCS/HANDOFF",
      "archive_recommendation": "keep",
      "notes_for_future_collaborators": "Essential high-level overview of toolchain, data flow, and LLM delegation protocols."
    },
    {
      "staging_filename": "05-BUILDER_NOTES__HANDOFF_PROMPTS.md",
      "original_filename_without_prefix": "HANDOFF_PROMPTS.md",
      "doc_family": "HANDOFF",
      "operator_value": "Medium",
      "canonical_status": "canonical",
      "likely_duplicates": [
        "05-research__HANDOFF_PROMPTS.md"
      ],
      "recommended_final_folder": "TOOLS/DOCS/HANDOFF",
      "archive_recommendation": "keep",
      "notes_for_future_collaborators": "Contains specific technical prompts for JS logic implementation (Phase 1-4)."
    },
    {
      "staging_filename": "05-BUILDER_NOTES__perplexity-computer-prompt.md",
      "original_filename_without_prefix": "perplexity-computer-prompt.md",
      "doc_family": "SOP",
      "operator_value": "Critical",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_final_folder": "TOOLS/DOCS/SOP",
      "archive_recommendation": "keep",
      "notes_for_future_collaborators": "A durable operator prompt used for standardized grading of new stories against the Zlata corpus."
    },
    {
      "staging_filename": "05-BUILDER_NOTES__PROJECT_HANDOFF.md",
      "original_filename_without_prefix": "PROJECT_HANDOFF.md",
      "doc_family": "HANDOFF",
      "operator_value": "High",
      "canonical_status": "canonical",
      "likely_duplicates": [
        "05-BUILDER_NOTES__PROJECT_HANDOFF copy.md"
      ],
      "recommended_final_folder": "TOOLS/DOCS/HANDOFF",
      "archive_recommendation": "keep",
      "notes_for_future_collaborators": "Provides snapshot of active build status, folder structure, and necessary context for incoming builders."
    },
    {
      "staging_filename": "05-BUILDER_NOTES__PROJECT_HANDOFF copy.md",
      "original_filename_without_prefix": "PROJECT_HANDOFF copy.md",
      "doc_family": "HANDOFF",
      "operator_value": "None",
      "canonical_status": "duplicate",
      "likely_duplicates": [
        "05-BUILDER_NOTES__PROJECT_HANDOFF.md"
      ],
      "recommended_final_folder": "none",
      "archive_recommendation": "delete",
      "notes_for_future_collaborators": "Redundant copy of the primary handoff document."
    },
    {
      "staging_filename": "05-research__HANDOFF_PROMPTS.md",
      "original_filename_without_prefix": "HANDOFF_PROMPTS.md",
      "doc_family": "HANDOFF",
      "operator_value": "None",
      "canonical_status": "duplicate",
      "likely_duplicates": [
        "05-BUILDER_NOTES__HANDOFF_PROMPTS.md"
      ],
      "recommended_final_folder": "none",
      "archive_recommendation": "delete",
      "notes_for_future_collaborators": "Misplaced duplicate of the builder notes version."
    },
    {
      "staging_filename": "05-research__Zlata-Style Erotic Contortion Fiction  Verified Deep-Dive Guide.md",
      "original_filename_without_prefix": "Zlata-Style Erotic Contortion Fiction Verified Deep-Dive Guide.md",
      "doc_family": "REFERENCE",
      "operator_value": "High",
      "canonical_status": "canonical",
      "likely_duplicates": [
        "05-research__Zlata-Style Erotic Contortion Fiction Guide.md"
      ],
      "recommended_final_folder": "REFERENCE",
      "archive_recommendation": "keep",
      "notes_for_future_collaborators": "Core analytical reference guide for maintaining Zlata-style narrative consistency."
    },
    {
      "staging_filename": "05-research__Zlata-Style Erotic Contortion Fiction Guide.md",
      "original_filename_without_prefix": "Zlata-Style Erotic Contortion Fiction Guide.md",
      "doc_family": "REFERENCE",
      "operator_value": "None",
      "canonical_status": "duplicate",
      "likely_duplicates": [
        "05-research__Zlata-Style Erotic Contortion Fiction Verified Deep-Dive Guide.md"
      ],
      "recommended_final_folder": "none",
      "archive_recommendation": "delete",
      "notes_for_future_collaborators": "Redundant copy of the 'Verified' version with identical content."
    },
    {
      "staging_filename": "05-VIEW__NetlifyAIPrompt.md",
      "original_filename_without_prefix": "NetlifyAIPrompt.md",
      "doc_family": "HANDOFF",
      "operator_value": "Low",
      "canonical_status": "canonical",
      "likely_duplicates": [],
      "recommended_final_folder": "TOOLS/DOCS/HANDOFF",
      "archive_recommendation": "archive",
      "notes_for_future_collaborators": "Task-specific prompt for a completed UI build pass; archive for historical reference."
    }
  ],
  "batch_summary": {
    "role_in_system": "Defines the handoff bridge between system architecture and technical execution, providing active prompts for operators and context for future builders.",
    "highest_value_docs": [
      "perplexity-computer-prompt.md",
      "Verified Deep-Dive Guide.md",
      "BUILDERS_NOTES.md"
    ],
    "duplicate_risks": [
      "High overlap in research and handoff folders (duplicate Prompts and Deep-Dive guides).",
      "Loose 'copy' files exist for major handoff documents."
    ],
    "recommended_moves": [
      "Move all durable style analysis to REFERENCE.",
      "Consolidate all handoff prompts and builder notes into TOOLS/DOCS/HANDOFF.",
      "Relocate the active operator prompt to TOOLS/DOCS/SOP."
    ],
    "archive_candidates": [
      "05-VIEW__NetlifyAIPrompt.md",
      "05-BUILDER_NOTES__PROJECT_HANDOFF copy.md",
      "05-research__Zlata-Style Erotic Contortion Fiction Guide.md"
    ],
    "open_questions": [
      "Should one-off build prompts (like NetlifyAIPrompt) be purged entirely once the feature is deployed, or kept as 'provenance'?",
      "Is there a need for a unified 'Master Handoff' document to replace several scattered status notes?"
    ]
  }
}


