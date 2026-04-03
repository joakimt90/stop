import { useState, useEffect, useCallback } from 'react'
import { X, Upload, FolderOpen, Database } from 'lucide-react'
import type { Entry } from '@/types/corpus'
import { parseMdFile } from '@/components/UploadArea'

interface UploadSidebarProps {
  open: boolean
  onClose: () => void
  onLoad: (entries: Entry[], fileCount: number, names: string[]) => void
}

export function UploadSidebar({ open, onClose, onLoad }: UploadSidebarProps) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }
  }, [open, onClose])

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      try {
        const arr = Array.from(files).filter(
          (f) => f.name.endsWith('.json') || f.name.endsWith('.md'),
        )
        if (arr.length === 0) {
          setError('No .json or .md files found in selection.')
          setSuccess(null)
          return
        }
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
        const entries = results.flat()
        const names = arr.map((f) => f.name)
        onLoad(entries, names.length, names)
        setError(null)
        setSuccess(`Loaded ${entries.length} entries from ${names.length} file${names.length !== 1 ? 's' : ''}.`)
        setTimeout(() => setSuccess(null), 3000)
      } catch {
        setError('Failed to parse file. Ensure files match an expected format.')
        setSuccess(null)
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

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gray-900 border-l border-gray-700 z-50 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-lg font-bold text-white leading-tight">Import Files</h2>
            <p className="text-xs text-gray-500 mt-0.5">Upload JSON or Markdown corpus files</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-200 transition-colors shrink-0 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* Drag-and-drop zone */}
          <label
            className={`flex flex-col items-center justify-center gap-5 p-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
              ${dragging ? 'border-blue-400 bg-blue-900/20 scale-[1.01]' : 'border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <Upload
              className={`w-12 h-12 transition-colors ${dragging ? 'text-blue-400' : 'text-gray-500'}`}
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-200">
                {dragging ? 'Drop to load' : 'Drop files here'}
              </p>
              <p className="text-gray-500 mt-1 text-sm">or click to browse your files</p>
              <p className="text-xs text-gray-600 mt-3">
                Accepts .json corpus files and .md (StoryMiner / Deep Dive)
              </p>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
              <FolderOpen className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">Browse Files</span>
            </div>
            <input
              type="file"
              accept=".json,.md"
              multiple
              className="hidden"
              onChange={onInputChange}
            />
          </label>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-500">
            <span className="h-px flex-1 bg-gray-800" />
            <span className="text-xs uppercase tracking-wider">or</span>
            <span className="h-px flex-1 bg-gray-800" />
          </div>

          {/* Sample corpus button */}
          <button
            onClick={async () => {
              try {
                const res = await fetch('/sample-corpus.json')
                if (!res.ok) throw new Error('Failed to fetch sample data')
                const data: Entry[] = await res.json()
                onLoad(data, 1, ['sample-corpus.json'])
                setError(null)
                setSuccess(`Loaded ${data.length} entries from sample corpus.`)
                setTimeout(() => setSuccess(null), 3000)
              } catch {
                setError('Failed to load sample corpus.')
                setSuccess(null)
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            <Database className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-medium text-sm">Load Sample Corpus</span>
            <span className="text-xs text-gray-500">(25 entries)</span>
          </button>

          {/* Feedback messages */}
          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm bg-green-900/20 border border-green-800 px-4 py-2 rounded-lg">
              {success}
            </p>
          )}

          {/* Help text */}
          <div className="text-xs text-gray-600 space-y-1 pt-2">
            <p className="font-medium text-gray-500">Supported formats:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-1">
              <li>JSON corpus files (array of entries)</li>
              <li>StoryMiner Master Index (.md)</li>
              <li>Deep Dive / Bulletin (.md)</li>
            </ul>
            <p className="mt-2">Files are merged into the existing corpus. Duplicate IDs are skipped.</p>
          </div>
        </div>
      </div>
    </>
  )
}
