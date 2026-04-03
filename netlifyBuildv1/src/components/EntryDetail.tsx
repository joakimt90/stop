import { useState, useEffect } from 'react'
import { X, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import type { Entry, Scene } from '@/types/corpus'
import { BAND_COLORS, REVIEW_COLORS } from '@/types/corpus'

function Badge({ text, cls }: { text: string; cls: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs border font-medium ${cls}`}>
      {text}
    </span>
  )
}

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-block px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">
      {text}
    </span>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value && value !== 0) return null
  return (
    <div>
      <dt className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{label}</dt>
      <dd className="text-sm text-gray-200">{value}</dd>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function SceneCard({ scene, idx }: { scene: Scene; idx: number }) {
  const [open, setOpen] = useState(idx === 0)
  const portColors: Record<string, string> = {
    high: 'bg-green-800 text-green-200 border-green-700',
    medium: 'bg-yellow-800 text-yellow-200 border-yellow-700',
    low: 'bg-red-900 text-red-200 border-red-800',
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-800 hover:bg-gray-750 text-left"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-200">
            Scene {idx + 1}{scene.poseFamily ? ` — ${scene.poseFamily}` : ''}
          </span>
          <span className="text-xs text-gray-400 font-bold">×{scene.score}</span>
          {scene.matchBand && (
            <Badge
              text={scene.matchBand}
              cls={BAND_COLORS[scene.matchBand] ?? 'bg-gray-600 text-gray-200 border-gray-500'}
            />
          )}
          {scene.portability && (
            <Badge
              text={scene.portability}
              cls={portColors[scene.portability] ?? 'bg-gray-700 text-gray-300 border-gray-600'}
            />
          )}
          {scene.tags?.slice(0, 3).map((t) => <Pill key={t} text={t} />)}
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-3 py-3 bg-gray-900 space-y-3">
          {scene.dna && (
            <p className="text-xs text-gray-400 italic">{scene.dna}</p>
          )}

          {scene.exactWording && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Exact Wording</p>
              <blockquote className="font-mono text-xs text-gray-300 bg-gray-800 border-l-2 border-gray-600 px-3 py-2 rounded whitespace-pre-wrap leading-relaxed">
                {scene.exactWording}
              </blockquote>
            </div>
          )}

          {scene.reusableWording && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Reusable Wording</p>
                <CopyButton text={scene.reusableWording} />
              </div>
              <p className="text-sm text-gray-200 bg-gray-800 px-3 py-2 rounded leading-relaxed">
                {scene.reusableWording}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface EntryDetailProps {
  entry: Entry | null
  onClose: () => void
}

export function EntryDetail({ entry, onClose }: EntryDetailProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!entry) return null

  const rs = entry.review_state ?? 'unset'

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
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-700 shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-lg font-bold text-white leading-tight">{entry.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">{entry.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-200 transition-colors shrink-0 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            <Badge text={entry.band} cls={BAND_COLORS[entry.band] ?? BAND_COLORS['good']} />
            {entry.match_band && entry.match_band !== entry.band && (
              <Badge
                text={`match: ${entry.match_band}`}
                cls={BAND_COLORS[entry.match_band] ?? BAND_COLORS['good']}
              />
            )}
            <Badge text={rs} cls={REVIEW_COLORS[rs] ?? REVIEW_COLORS['unset']} />
            {entry.explicit && (
              <Badge text={entry.explicit} cls="bg-red-900 text-red-200 border-red-700" />
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs border border-gray-600 bg-gray-800 text-gray-200 font-bold">
              {entry.zstyle_score ?? '—'}
            </span>
          </div>

          {/* Meta fields */}
          <dl className="grid grid-cols-2 gap-3">
            <Field label="Author" value={entry.author} />
            <Field label="Seed" value={entry.seed} />
            <Field label="Has Raw Text" value={entry.has_raw_text ? 'Yes' : 'No'} />
            <Field label="Mined" value={entry.mined ? 'Yes' : 'No'} />
          </dl>

          {/* Summary */}
          {entry.summary && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Summary</p>
              <p className="text-sm text-gray-300 leading-relaxed">{entry.summary}</p>
            </div>
          )}

          {/* Character */}
          <div className="space-y-2">
            {entry.character_energy && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Character Energy</p>
                <p className="text-sm text-gray-300">{entry.character_energy}</p>
              </div>
            )}
            {entry.character_note && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Character Note</p>
                <p className="text-sm text-gray-300">{entry.character_note}</p>
              </div>
            )}
          </div>

          {/* Contortion / Why */}
          {(entry.contortion_focus || entry.why_it_fits) && (
            <div className="space-y-2">
              {entry.contortion_focus && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Contortion Focus</p>
                  <p className="text-sm text-gray-300">{entry.contortion_focus}</p>
                </div>
              )}
              {entry.why_it_fits && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Why It Fits</p>
                  <p className="text-sm text-gray-300">{entry.why_it_fits}</p>
                </div>
              )}
            </div>
          )}

          {/* Pill groups */}
          {entry.dna?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">DNA</p>
              <div className="flex flex-wrap gap-1">
                {entry.dna.map((d) => <Pill key={d} text={d} />)}
              </div>
            </div>
          )}
          {entry.tone?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tone</p>
              <div className="flex flex-wrap gap-1">
                {entry.tone.map((t) => <Pill key={t} text={t} />)}
              </div>
            </div>
          )}
          {entry.tags?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                {entry.tags.map((t) => <Pill key={t} text={t} />)}
              </div>
            </div>
          )}

          {/* Sources */}
          {entry.sources?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Sources</p>
              <ul className="space-y-0.5">
                {entry.sources.map((s, i) => (
                  <li key={i} className="text-xs text-gray-400">• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Scenes */}
          {entry.scenes?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Scenes ({entry.scenes.length})
              </p>
              <div className="space-y-2">
                {entry.scenes.map((scene, i) => (
                  <SceneCard key={i} scene={scene} idx={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
