import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
  const [showDetails, setShowDetails] = useState(false)
  const primaryTag = entry.tags?.[0]
  const matchBand = entry.match_band

  return (
    <div
      className="bg-gray-800/80 border border-gray-700/60 rounded-xl p-4 hover:border-gray-500 hover:bg-gray-800 transition-all duration-150 flex flex-col group"
    >
      {/* Header: band + match band badges */}
      <div className="flex items-center gap-1.5 mb-2">
        <Badge text={entry.band} cls={BAND_COLORS[entry.band] ?? BAND_COLORS['good']} />
        {matchBand && matchBand !== entry.band && (
          <Badge text={matchBand} cls={`${BAND_COLORS[matchBand] ?? BAND_COLORS['good']} opacity-60`} />
        )}
        {primaryTag && (
          <span className="ml-auto px-1.5 py-0.5 bg-blue-900/30 text-blue-300/80 border border-blue-700/30 rounded text-xs truncate max-w-[10rem]">
            {primaryTag}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-base font-bold text-gray-50 leading-snug line-clamp-2 cursor-pointer hover:text-white mb-1.5"
        onClick={onClick}
      >
        {entry.title}
      </h3>

      {/* Summary */}
      <p
        className="text-sm text-gray-400 leading-relaxed cursor-pointer mb-2"
        style={{ display: '-webkit-box', WebkitLineClamp: showDetails ? 999 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        onClick={onClick}
      >
        {entry.summary}
      </p>

      {/* Details toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails) }}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors self-start mt-auto"
      >
        {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {showDetails ? 'Less' : 'Details'}
      </button>

      {showDetails && (
        <div className="text-xs text-gray-400 space-y-1.5 border-t border-gray-700/50 pt-2 mt-2">
          {entry.zstyle_score > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Score:</span>
              <span className="font-bold text-gray-200">{entry.zstyle_score}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {entry.review_state && (
              <Badge text={entry.review_state} cls={REVIEW_COLORS[entry.review_state] ?? REVIEW_COLORS['unset']} />
            )}
            {entry.explicit && (
              <Badge text={entry.explicit} cls="bg-red-900 text-red-200 border-red-700" />
            )}
          </div>
          {entry.character_energy && (
            <p><span className="text-gray-500">Energy:</span> {entry.character_energy}</p>
          )}
          {entry.pose_setpiece && (
            <p><span className="text-gray-500">Pose:</span> {entry.pose_setpiece}</p>
          )}
          {entry.pose_family && (
            <p><span className="text-gray-500">Pose Family:</span> {entry.pose_family}</p>
          )}
          {(entry.tags?.length ?? 0) > 1 && (
            <div className="flex flex-wrap gap-1">
              {entry.tags.slice(1).map((t) => (
                <span key={t} className="px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">{t}</span>
              ))}
            </div>
          )}
          {(entry.scenes?.length ?? 0) > 0 && (
            <p><span className="text-gray-500">Scenes:</span> {entry.scenes.length}</p>
          )}
          {entry.seed && <p><span className="text-gray-500">Seed:</span> {entry.seed}</p>}
        </div>
      )}
    </div>
  )
}

interface EntryListItemProps {
  entry: Entry
  onClick: () => void
}

export function EntryListItem({ entry, onClick }: EntryListItemProps) {
  const rs = entry.review_state ?? 'unset'
  const matchBand = entry.match_band
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-800 hover:bg-gray-800/70 cursor-pointer transition-colors"
    >
      <span className="text-lg font-bold text-gray-200 tabular-nums w-10 shrink-0">
        {entry.zstyle_score ?? '—'}
      </span>
      <Badge text={entry.band} cls={BAND_COLORS[entry.band] ?? BAND_COLORS['good']} />
      {matchBand && matchBand !== entry.band && (
        <Badge text={matchBand} cls={`${BAND_COLORS[matchBand] ?? BAND_COLORS['good']} opacity-60`} />
      )}
      <Badge text={rs} cls={REVIEW_COLORS[rs] ?? REVIEW_COLORS['unset']} />
      <span className="text-sm text-gray-200 flex-1 truncate font-medium">{entry.title}</span>
      <span className="text-xs text-gray-500 shrink-0">
        {entry.tags?.length ?? 0} tags
      </span>
      <span className="text-xs text-gray-500 shrink-0">
        {entry.scenes?.length ?? 0} scenes
      </span>
    </div>
  )
}
