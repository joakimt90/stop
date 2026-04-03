import { useState, useMemo } from 'react'
import { X, ChevronDown, ChevronUp, Search, RotateCcw } from 'lucide-react'
import type { Entry, FilterState } from '@/types/corpus'
import { DEFAULT_FILTERS, BAND_COLORS } from '@/types/corpus'

interface FilterSidebarProps {
  entries: Entry[]
  filters: FilterState
  filteredCount: number
  onChange: (f: FilterState) => void
  onClose?: () => void
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-700 py-3">
      <button
        className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-200 hover:text-white mb-2"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function CheckboxItem({
  label,
  checked,
  onChange,
  count,
  badge,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  count?: number
  badge?: string
}) {
  return (
    <label className="flex items-center gap-2 py-0.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-blue-500 w-3.5 h-3.5"
      />
      {badge ? (
        <span className={`px-1.5 py-0.5 rounded text-xs border ${badge}`}>{label}</span>
      ) : (
        <span className="text-sm text-gray-300 group-hover:text-white">{label}</span>
      )}
      {count !== undefined && (
        <span className="ml-auto text-xs text-gray-500">{count}</span>
      )}
    </label>
  )
}

function SearchableList({
  options,
  selected,
  onToggle,
}: {
  options: { value: string; count: number }[]
  selected: string[]
  onToggle: (v: string) => void
}) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const lower = q.toLowerCase()
    return options.filter((o) => o.value.toLowerCase().includes(lower))
  }, [options, q])
  const show = filtered.slice(0, 50)

  return (
    <div>
      {options.length > 6 && (
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-full pl-6 pr-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
      )}
      <div className="max-h-40 overflow-y-auto space-y-0.5 pr-1">
        {show.map((o) => (
          <CheckboxItem
            key={o.value}
            label={o.value}
            checked={selected.includes(o.value)}
            onChange={() => onToggle(o.value)}
            count={o.count}
          />
        ))}
        {filtered.length > 50 && (
          <p className="text-xs text-gray-600 pt-1">+{filtered.length - 50} more — refine search</p>
        )}
        {filtered.length === 0 && <p className="text-xs text-gray-600">No matches</p>}
      </div>
    </div>
  )
}

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
}

function RangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number
  max: number
  value: [number, number]
  onChange: (v: [number, number]) => void
}) {
  const lowPct = ((value[0] - min) / (max - min)) * 100
  const highPct = ((value[1] - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 bg-gray-700 rounded" />
        <div
          className="absolute h-1.5 bg-blue-500 rounded"
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => {
            const v = Math.min(+e.target.value, value[1])
            onChange([v, value[1]])
          }}
          className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => {
            const v = Math.max(+e.target.value, value[0])
            onChange([value[0], v])
          }}
          className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>
    </div>
  )
}

export function FilterSidebar({
  entries,
  filters,
  filteredCount,
  onChange,
  onClose,
}: FilterSidebarProps) {
  const allTags = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach((e) => e.tags?.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)))
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }))
  }, [entries])

  const allTones = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach((e) => e.tone?.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)))
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }))
  }, [entries])

  const allPoseFamilies = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach((e) => {
      // Scene-level pose families
      e.scenes?.forEach((s) => {
        if (s.poseFamily) map.set(s.poseFamily, (map.get(s.poseFamily) ?? 0) + 1)
      })
      // Entry-level pose_family (from markdown imports)
      if (e.pose_family) map.set(e.pose_family, (map.get(e.pose_family) ?? 0) + 1)
    })
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }))
  }, [entries])

  const allDna = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach((e) => e.dna?.forEach((d) => map.set(d, (map.get(d) ?? 0) + 1)))
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }))
  }, [entries])

  const isDefault =
    JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS)

  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch })

  return (
    <aside className="w-full flex flex-col bg-gray-900 border-r border-gray-700 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
        <span className="text-sm font-semibold text-gray-200">Filters</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{filteredCount} results</span>
          {!isDefault && (
            <button
              onClick={() => onChange(DEFAULT_FILTERS)}
              title="Reset filters"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-300 ml-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 flex-1">
        {/* Search */}
        <div className="py-3 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input
              value={filters.search}
              onChange={(e) => set({ search: e.target.value })}
              placeholder="Search title, summary, notes…"
              className="w-full pl-8 pr-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-500"
            />
            {filters.search && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                onClick={() => set({ search: '' })}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Band */}
        <Section title="Band">
          {['core', 'excellent', 'strong', 'good', 'partial', 'weak'].map((b) => (
            <CheckboxItem
              key={b}
              label={b}
              checked={filters.bands.includes(b)}
              onChange={() => set({ bands: toggle(filters.bands, b) })}
              badge={BAND_COLORS[b]}
            />
          ))}
        </Section>

        {/* Review State */}
        <Section title="Review State">
          {['approved', 'raw', 'unset'].map((rs) => (
            <CheckboxItem
              key={rs}
              label={rs}
              checked={filters.reviewStates.includes(rs)}
              onChange={() => set({ reviewStates: toggle(filters.reviewStates, rs) })}
            />
          ))}
        </Section>

        {/* Explicit */}
        <Section title="Explicit">
          {(['all', 'erotic', 'non-explicit'] as const).map((v) => (
            <label key={v} className="flex items-center gap-2 py-0.5 cursor-pointer">
              <input
                type="radio"
                name="explicit"
                checked={filters.explicit === v}
                onChange={() => set({ explicit: v })}
                className="accent-blue-500"
              />
              <span className="text-sm text-gray-300">{v === 'all' ? 'Show all' : v}</span>
            </label>
          ))}
        </Section>

        {/* Score Range */}
        <Section title="Score Range">
          <RangeSlider
            min={0}
            max={100}
            value={filters.scoreRange}
            onChange={(v) => set({ scoreRange: v })}
          />
        </Section>

        {/* Tags */}
        {allTags.length > 0 && (
          <Section title={`Tags${filters.tags.length ? ` (${filters.tags.length})` : ''}`} defaultOpen={false}>
            <SearchableList
              options={allTags}
              selected={filters.tags}
              onToggle={(v) => set({ tags: toggle(filters.tags, v) })}
            />
          </Section>
        )}

        {/* Tone */}
        {allTones.length > 0 && (
          <Section title={`Tone${filters.tones.length ? ` (${filters.tones.length})` : ''}`} defaultOpen={false}>
            <SearchableList
              options={allTones}
              selected={filters.tones}
              onToggle={(v) => set({ tones: toggle(filters.tones, v) })}
            />
          </Section>
        )}

        {/* Pose Family */}
        {allPoseFamilies.length > 0 && (
          <Section title={`Pose Family${filters.poseFamilies.length ? ` (${filters.poseFamilies.length})` : ''}`} defaultOpen={false}>
            <SearchableList
              options={allPoseFamilies}
              selected={filters.poseFamilies}
              onToggle={(v) => set({ poseFamilies: toggle(filters.poseFamilies, v) })}
            />
          </Section>
        )}

        {/* Portability */}
        <Section title="Portability" defaultOpen={false}>
          {['high', 'medium', 'low'].map((p) => (
            <CheckboxItem
              key={p}
              label={p}
              checked={filters.portabilities.includes(p)}
              onChange={() => set({ portabilities: toggle(filters.portabilities, p) })}
            />
          ))}
        </Section>

        {/* DNA */}
        {allDna.length > 0 && (
          <Section title={`DNA${filters.dna.length ? ` (${filters.dna.length})` : ''}`} defaultOpen={false}>
            <SearchableList
              options={allDna}
              selected={filters.dna}
              onToggle={(v) => set({ dna: toggle(filters.dna, v) })}
            />
          </Section>
        )}

        {/* Has Raw Text */}
        <Section title="Has Raw Text" defaultOpen={false}>
          {[
            { label: 'Any', value: null },
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ].map(({ label, value }) => (
            <label key={label} className="flex items-center gap-2 py-0.5 cursor-pointer">
              <input
                type="radio"
                name="hasRawText"
                checked={filters.hasRawText === value}
                onChange={() => set({ hasRawText: value })}
                className="accent-blue-500"
              />
              <span className="text-sm text-gray-300">{label}</span>
            </label>
          ))}
        </Section>
      </div>
    </aside>
  )
}
