import { useState } from 'react'
import { ChevronDown, ChevronUp, BarChart3, Clock } from 'lucide-react'
import type { Entry } from '@/types/corpus'
import { BAND_COLORS } from '@/types/corpus'

interface UtilitySidebarProps {
  entries: Entry[]
  filteredEntries: Entry[]
  fileCount: number
  fileNames: string[]
}

function Panel({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-800">
      <button
        className="flex items-center gap-2 w-full px-3 py-2.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="flex-1">{title}</span>
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  )
}

export function UtilitySidebar({ entries, filteredEntries, fileCount, fileNames }: UtilitySidebarProps) {
  const totalScenes = filteredEntries.reduce((sum, e) => sum + (e.scenes?.length ?? 0), 0)
  const avgScore = filteredEntries.length > 0
    ? filteredEntries.reduce((sum, e) => sum + (e.zstyle_score ?? 0), 0) / filteredEntries.length
    : 0

  // Band distribution for filtered entries
  const bandCounts = new Map<string, number>()
  filteredEntries.forEach((e) => bandCounts.set(e.band, (bandCounts.get(e.band) ?? 0) + 1))
  const bandOrder = ['core', 'excellent', 'strong', 'good', 'partial', 'weak']

  // Top tags
  const tagMap = new Map<string, number>()
  filteredEntries.forEach((e) => e.tags?.forEach((t) => tagMap.set(t, (tagMap.get(t) ?? 0) + 1)))
  const topTags = Array.from(tagMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const isFiltered = filteredEntries.length !== entries.length

  return (
    <aside className="w-56 shrink-0 bg-gray-900/50 border-l border-gray-800 overflow-y-auto hidden xl:flex flex-col">
      {/* Stats panel */}
      <Panel title="Stats" icon={BarChart3} defaultOpen={true}>
        <div className="space-y-2">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-800/60 rounded-lg px-2.5 py-2">
              <div className="text-lg font-bold text-gray-100 tabular-nums leading-tight">
                {filteredEntries.length}
                {isFiltered && <span className="text-xs font-normal text-gray-500">/{entries.length}</span>}
              </div>
              <div className="text-xs text-gray-500">entries</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg px-2.5 py-2">
              <div className="text-lg font-bold text-gray-100 tabular-nums leading-tight">{totalScenes}</div>
              <div className="text-xs text-gray-500">scenes</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg px-2.5 py-2">
              <div className="text-lg font-bold text-gray-100 tabular-nums leading-tight">{avgScore.toFixed(0)}</div>
              <div className="text-xs text-gray-500">avg score</div>
            </div>
            <div className="bg-gray-800/60 rounded-lg px-2.5 py-2">
              <div className="text-lg font-bold text-gray-100 tabular-nums leading-tight">{fileCount}</div>
              <div className="text-xs text-gray-500">files</div>
            </div>
          </div>

          {/* Band distribution */}
          {bandCounts.size > 0 && (
            <div className="space-y-1 pt-1">
              <div className="text-xs text-gray-500 font-medium">Band distribution</div>
              {bandOrder.filter((b) => bandCounts.has(b)).map((band) => {
                const count = bandCounts.get(band) ?? 0
                const pct = filteredEntries.length > 0 ? (count / filteredEntries.length) * 100 : 0
                return (
                  <div key={band} className="flex items-center gap-2">
                    <span className={`inline-block w-14 text-right px-1 py-0.5 rounded text-xs border font-medium ${BAND_COLORS[band]}`}>
                      {band}
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 tabular-nums w-6 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Top tags */}
          {topTags.length > 0 && (
            <div className="space-y-1 pt-1">
              <div className="text-xs text-gray-500 font-medium">Top tags</div>
              <div className="flex flex-wrap gap-1">
                {topTags.map(([tag, count]) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                    {tag} <span className="text-gray-600">{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Panel>

      {/* Recent Activity / Files panel */}
      <Panel title="Recent Activity" icon={Clock} defaultOpen={false}>
        <div className="space-y-1.5">
          {fileNames.length === 0 ? (
            <p className="text-xs text-gray-600 italic">No files loaded</p>
          ) : (
            fileNames.map((name, i) => (
              <div key={i} className="text-xs text-gray-400 truncate" title={name}>
                {name}
              </div>
            ))
          )}
        </div>
      </Panel>
    </aside>
  )
}
