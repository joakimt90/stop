import { useCallback, useState } from 'react'
import { Upload, FolderOpen, Database } from 'lucide-react'
import type { Entry } from '@/types/corpus'

interface UploadAreaProps {
  onLoad: (entries: Entry[], fileCount: number, names: string[]) => void
  compact?: boolean
}

async function parseFiles(files: FileList | File[]): Promise<{ entries: Entry[]; names: string[] }> {
  const arr = Array.from(files).filter((f) => f.name.endsWith('.json'))
  const results = await Promise.all(
    arr.map(async (f) => {
      const text = await f.text()
      const parsed = JSON.parse(text)
      return Array.isArray(parsed) ? (parsed as Entry[]) : []
    }),
  )
  return { entries: results.flat(), names: arr.map((f) => f.name) }
}

export function UploadArea({ onLoad, compact = false }: UploadAreaProps) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      try {
        const { entries, names } = await parseFiles(files)
        if (names.length === 0) {
          setError('No .json files found in selection.')
          return
        }
        onLoad(entries, names.length, names)
        setError(null)
      } catch {
        setError('Failed to parse JSON. Ensure files match the expected schema.')
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
      <div>
        <label
          className={`flex items-center gap-2 px-3 py-1.5 rounded border border-dashed cursor-pointer transition-colors text-sm
            ${dragging ? 'border-blue-400 bg-blue-900/30 text-blue-300' : 'border-gray-600 hover:border-gray-400 text-gray-400 hover:text-gray-300'}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <Upload className="w-3.5 h-3.5 shrink-0" />
          <span>Add files</span>
          <input type="file" accept=".json" multiple className="hidden" onChange={onInputChange} />
        </label>
        {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Corpus Explorer</h1>
        <p className="text-gray-400">Upload JSON corpus files to browse and filter entries</p>
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
            {dragging ? 'Drop to load' : 'Drop JSON files here'}
          </p>
          <p className="text-gray-500 mt-1">or click to browse your files</p>
          <p className="text-xs text-gray-600 mt-3">Accepts one or more .json corpus files — merged into a single corpus</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
          <FolderOpen className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">Browse Files</span>
        </div>
        <input type="file" accept=".json" multiple className="hidden" onChange={onInputChange} />
      </label>
      <div className="mt-6 flex items-center gap-3 text-gray-500">
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
