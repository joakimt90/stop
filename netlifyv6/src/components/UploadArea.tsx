import { useCallback, useState } from 'react'
import { Upload, FolderOpen, Database, Trash2 } from 'lucide-react'
import type { Entry } from '@/types/corpus'

interface UploadAreaProps {
  onLoad: (entries: Entry[], fileCount: number, names: string[]) => void
  onClear?: () => void
  compact?: boolean
}

/** Create a minimal Entry with sensible defaults for missing fields */
function makeEntry(partial: Partial<Entry> & { id: string; title: string }): Entry {
  return {
    summary: '',
    author: '',
    seed: '',
    explicit: null,
    band: 'good',
    match_band: '',
    review_state: null,
    zstyle_score: 0,
    tags: [],
    tone: [],
    dna: [],
    character_energy: '',
    character_note: '',
    contortion_focus: '',
    why_it_fits: '',
    has_raw_text: false,
    mined: false,
    sources: [],
    scenes: [],
    ...partial,
  }
}

// --------------- Markdown Parsers ---------------

/** Parse StoryMiner Master Index markdown.
 *  Numbered entries like: 001. Title
 *  Fields: Character Energy, Plot Scaffold, Key Pose Setpiece, Summary/description text */
function parseStoryMinerMd(text: string): Entry[] {
  const entries: Entry[] = []
  // Split on numbered entry headers: "001. Title"
  const entryBlocks = text.split(/^(\d{2,4})\.\s+/m)
  // entryBlocks: ['preamble', '001', 'Title\n...body...', '002', 'Title2\n...body...', ...]
  for (let i = 1; i < entryBlocks.length; i += 2) {
    const num = entryBlocks[i]
    const rest = entryBlocks[i + 1] ?? ''
    const lines = rest.split('\n')
    const title = lines[0]?.trim() ?? `Entry ${num}`
    const body = lines.slice(1).join('\n')

    const charEnergy = extractField(body, /Character\s*Energy[:\s]*(.+)/i)
    const plotScaffold = extractField(body, /Plot\s*Scaffold[:\s]*(.+)/i)
    const poseSetpiece = extractField(body, /Key\s*Pose\s*Setpiece[:\s]*(.+)/i)

    // Collect remaining text as summary (first non-field paragraph)
    const summary = extractSummary(body, ['Character Energy', 'Plot Scaffold', 'Key Pose Setpiece'])

    // Derive tags from character energy and plot scaffold
    const tags: string[] = []
    if (charEnergy) tags.push(charEnergy.split(/[,;]/)[0].trim())
    if (plotScaffold) tags.push(plotScaffold.split(/[,;]/)[0].trim())

    // Derive band from presence of data
    const band = poseSetpiece && charEnergy ? 'strong' : charEnergy || plotScaffold ? 'partial' : 'weak'

    entries.push(makeEntry({
      id: `sm-${num}`,
      title,
      summary,
      band,
      tags: tags.filter(Boolean),
      character_energy: charEnergy,
      pose_setpiece: poseSetpiece,
      plot_scaffold: plotScaffold,
      sources: ['StoryMiner Master Index'],
    }))
  }
  return entries
}

/** Parse Deep Dive / Bulletin markdown.
 *  Headers like: # Title — Deep Dive
 *  Fields: Anatomical Breakdown, PoseFamily */
function parseDeepDiveMd(text: string): Entry[] {
  const entries: Entry[] = []
  // Split on H1/H2 headers containing "Deep Dive" or "Bulletin"
  const sections = text.split(/^#{1,2}\s+/m)

  for (let i = 1; i < sections.length; i++) {
    const section = sections[i]
    const lines = section.split('\n')
    let title = lines[0]?.trim() ?? ''
    // Clean up title suffixes like " — Deep Dive"
    title = title.replace(/\s*[—–-]\s*(Deep\s*Dive|Bulletin)\s*$/i, '').trim()
    if (!title) continue
    const body = lines.slice(1).join('\n')

    const anatomical = extractField(body, /Anatomical\s*Breakdown[:\s]*(.+)/i)
    const poseFamily = extractField(body, /PoseFamily[:\s]*(.+)/i)

    const summary = extractSummary(body, ['Anatomical Breakdown', 'PoseFamily'])

    const tags: string[] = []
    if (poseFamily) tags.push(poseFamily.split(/[,;]/)[0].trim())

    const band = anatomical && poseFamily ? 'strong' : anatomical || poseFamily ? 'partial' : 'weak'

    entries.push(makeEntry({
      id: `dd-${i}`,
      title,
      summary,
      band,
      tags: tags.filter(Boolean),
      anatomical_breakdown: anatomical,
      pose_family: poseFamily,
      sources: ['Deep Dive / Bulletin'],
      // Also populate a scene with poseFamily for filter compat
      scenes: poseFamily ? [{
        exactWording: '',
        reusableWording: '',
        poseFamily: poseFamily.split(/[,;]/)[0].trim(),
        tags: [],
        dna: '',
        portability: '',
        score: 0,
        matchBand: '',
      }] : [],
    }))
  }
  return entries
}

function extractField(body: string, regex: RegExp): string {
  const m = body.match(regex)
  return m?.[1]?.trim() ?? ''
}

function extractSummary(body: string, fieldNames: string[]): string {
  // Remove known field lines and return first substantial paragraph
  let cleaned = body
  for (const name of fieldNames) {
    cleaned = cleaned.replace(new RegExp(`^.*${name}[:\\s].*$`, 'gim'), '')
  }
  const paras = cleaned.split(/\n{2,}/).map(p => p.trim()).filter(p => p.length > 20)
  return paras[0] ?? ''
}

/** Detect markdown format and parse accordingly */
export function parseMdFile(text: string, fileName: string): Entry[] {
  // Deep Dive detection: header with "Deep Dive" or "Bulletin"
  if (/^#{1,2}\s+.+[—–-]\s*(Deep\s*Dive|Bulletin)/m.test(text)) {
    return parseDeepDiveMd(text)
  }
  // StoryMiner detection: numbered entries like "001. "
  if (/^\d{2,4}\.\s+/m.test(text)) {
    return parseStoryMinerMd(text)
  }
  // Fallback: try StoryMiner parser
  return parseStoryMinerMd(text)
}

// --------------- File parsing ---------------

async function parseFiles(files: FileList | File[]): Promise<{ entries: Entry[]; names: string[] }> {
  const arr = Array.from(files).filter((f) => f.name.endsWith('.json') || f.name.endsWith('.md'))
  const results = await Promise.all(
    arr.map(async (f) => {
      const text = await f.text()
      if (f.name.endsWith('.md')) {
        return parseMdFile(text, f.name)
      }
      const parsed = JSON.parse(text)
      return Array.isArray(parsed) ? (parsed as Entry[]) : []
    }),
  )
  return { entries: results.flat(), names: arr.map((f) => f.name) }
}

export function UploadArea({ onLoad, onClear, compact = false }: UploadAreaProps) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      try {
        const { entries, names } = await parseFiles(files)
        if (names.length === 0) {
          setError('No .json or .md files found in selection.')
          return
        }
        onLoad(entries, names.length, names)
        setError(null)
      } catch {
        setError('Failed to parse file. Ensure files match an expected format.')
      }
    },
    [onLoad],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }
  const onDragLeave = () => setDragging(false)
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files)
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <label
          className={`flex items-center gap-2 px-3 py-1.5 rounded border border-dashed cursor-pointer transition-colors text-sm
            ${dragging ? 'border-blue-400 bg-blue-900/30 text-blue-300' : 'border-gray-600 hover:border-gray-400 text-gray-400 hover:text-gray-300'}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <Upload className="w-3.5 h-3.5 shrink-0" />
          <span>Upload</span>
          <input type="file" accept=".json,.md" multiple className="hidden" onChange={onInputChange} />
        </label>
        {onClear && (
          <button
            onClick={onClear}
            title="Clear all data"
            className="p-1.5 rounded border border-gray-700 text-gray-500 hover:text-red-400 hover:border-red-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
        {error && <p className="ml-1 text-red-400 text-xs">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Corpus Explorer</h1>
        <p className="text-gray-400">Upload JSON or Markdown corpus files to browse and filter entries</p>
      </div>
      <label
        className={`w-full max-w-2xl flex flex-col items-center justify-center gap-6 p-16 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200
          ${dragging ? 'border-blue-400 bg-blue-900/20 scale-[1.02]' : 'border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <Upload
          className={`w-14 h-14 transition-colors ${dragging ? 'text-blue-400' : 'text-gray-500'}`}
        />
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-200">
            {dragging ? 'Drop to load' : 'Drop files here'}
          </p>
          <p className="text-gray-500 mt-1">or click to browse your files</p>
          <p className="text-xs text-gray-600 mt-3">Accepts .json corpus files and .md (StoryMiner / Deep Dive) — merged into a single corpus</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
          <FolderOpen className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">Browse Files</span>
        </div>
        <input type="file" accept=".json,.md" multiple className="hidden" onChange={onInputChange} />
      </label>
      <div className="mt-6 flex items-center gap-3 text-gray-500 w-full max-w-2xl">
        <span className="h-px flex-1 bg-gray-800" />
        <span className="text-xs uppercase tracking-wider">or</span>
        <span className="h-px flex-1 bg-gray-800" />
      </div>
      <button
        onClick={async () => {
          try {
            const res = await fetch('/sample-corpus.json')
            if (!res.ok) throw new Error('Failed to fetch sample data')
            const data: Entry[] = await res.json()
            onLoad(data, 1, ['sample-corpus.json'])
            setError(null)
          } catch {
            setError('Failed to load sample corpus.')
          }
        }}
        className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
      >
        <Database className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300 font-medium text-sm">Load Sample Corpus</span>
        <span className="text-xs text-gray-500">(25 entries)</span>
      </button>
      {error && (
        <p className="mt-4 text-red-400 text-sm bg-red-900/20 border border-red-800 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}
    </div>
  )
}
