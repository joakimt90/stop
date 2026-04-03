import type { Entry } from '@/types/corpus'

interface StatsBarProps {
  total: number
  filtered: number
  totalScenes: number
  avgScore: number
}

export function StatsBar({ total, filtered, totalScenes, avgScore }: StatsBarProps) {
  return (
    <div className="sticky top-0 z-30 flex items-center gap-6 px-4 py-2 bg-gray-900/95 backdrop-blur border-b border-gray-700 text-sm">
      <Stat label="Total" value={total} />
      <Stat label="Filtered" value={filtered} highlight={filtered !== total} />
      <Stat label="Scenes" value={totalScenes} />
      <Stat label="Avg Score" value={avgScore.toFixed(1)} />
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`font-bold tabular-nums ${highlight ? 'text-blue-400' : 'text-gray-100'}`}>
        {value}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
}

export function computeStats(entries: Entry[]) {
  const totalScenes = entries.reduce((sum, e) => sum + (e.scenes?.length ?? 0), 0)
  const avgScore =
    entries.length > 0
      ? entries.reduce((sum, e) => sum + (e.zstyle_score ?? 0), 0) / entries.length
      : 0
  return { totalScenes, avgScore }
}
