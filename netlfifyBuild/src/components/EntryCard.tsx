import type { Entry } from '@/types/corpus'
import { BAND_COLORS, REVIEW_COLORS } from '@/types/corpus'

function Badge({ text, cls }: { text: string; cls: string }) {
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-xs border font-medium ${cls}`}>
      {text}
    </span>
  )
}

interface EntryCardProps {
  entry: Entry
  onClick: () => void
}

export function EntryCard({ entry, onClick }: EntryCardProps) {
  const rs = entry.review_state ?? 'unset'
  const tags = entry.tags?.slice(0, 3) ?? []

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-gray-500 hover:bg-gray-750 transition-all duration-150 flex flex-col gap-2.5 group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-100 group-hover:text-white leading-tight line-clamp-2 flex-1">
          {entry.title}
        </h3>
        <span className="text-2xl font-bold text-gray-200 tabular-nums shrink-0 leading-none">
          {entry.zstyle_score ?? '—'}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <Badge text={entry.band} cls={BAND_COLORS[entry.band] ?? BAND_COLORS['good']} />
        <Badge text={rs} cls={REVIEW_COLORS[rs] ?? REVIEW_COLORS['unset']} />
        {entry.explicit && (
          <Badge text={entry.explicit} cls="bg-red-900 text-red-200 border-red-700" />
        )}
      </div>

      {/* Summary */}
      <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{entry.summary}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((t) => (
            <span key={t} className="px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">
              {t}
            </span>
          ))}
          {(entry.tags?.length ?? 0) > 3 && (
            <span className="px-1.5 py-0.5 bg-gray-700 text-gray-500 rounded text-xs">
              +{entry.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-1 border-t border-gray-700">
        <span>{entry.scenes?.length ?? 0} scenes</span>
        {entry.has_raw_text && <span className="text-teal-500">raw text</span>}
        {entry.mined && <span className="text-amber-600">mined</span>}
        <span className="ml-auto">{entry.seed}</span>
      </div>
    </div>
  )
}

interface EntryListItemProps {
  entry: Entry
  onClick: () => void
}

export function EntryListItem({ entry, onClick }: EntryListItemProps) {
  const rs = entry.review_state ?? 'unset'
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors"
    >
      <span className="text-lg font-bold text-gray-200 tabular-nums w-10 shrink-0">
        {entry.zstyle_score ?? '—'}
      </span>
      <Badge text={entry.band} cls={BAND_COLORS[entry.band] ?? BAND_COLORS['good']} />
      <Badge text={rs} cls={REVIEW_COLORS[rs] ?? REVIEW_COLORS['unset']} />
      <span className="text-sm text-gray-200 flex-1 truncate">{entry.title}</span>
      <span className="text-xs text-gray-500 shrink-0">
        {entry.tags?.length ?? 0} tags
      </span>
      <span className="text-xs text-gray-500 shrink-0">
        {entry.scenes?.length ?? 0} scenes
      </span>
    </div>
  )
}
