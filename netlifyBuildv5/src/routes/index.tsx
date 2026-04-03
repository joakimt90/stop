import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useCallback } from 'react'
import { LayoutGrid, List, Menu, Columns2, Columns3, Type, Heading } from 'lucide-react'

import type { Entry, FilterState, SortField, SortDir, ViewMode } from '@/types/corpus'
import { DEFAULT_FILTERS } from '@/types/corpus'
import { UploadArea } from '@/components/UploadArea'
import { FilterSidebar } from '@/components/FilterSidebar'
import { EntryCard, EntryListItem } from '@/components/EntryCard'
import type { SummarySize, SummaryFont, TitleFont, TitleSize } from '@/components/EntryCard'
import { EntryDetail } from '@/components/EntryDetail'
import { UtilitySidebar } from '@/components/UtilitySidebar'

export const Route = createFileRoute('/')({
  component: CorpusExplorer,
})

function applyFilters(entries: Entry[], filters: FilterState): Entry[] {
  return entries.filter((entry) => {
    // Full-text search
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const hay = [
        entry.title,
        entry.summary,
        entry.character_note,
        entry.contortion_focus,
        entry.why_it_fits,
        entry.character_energy,
        entry.pose_setpiece,
        entry.pose_family,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!hay.includes(q)) return false
    }

    // Band filter
    if (filters.bands.length > 0 && !filters.bands.includes(entry.band)) return false

    // Review state
    if (filters.reviewStates.length > 0) {
      const rs = entry.review_state ?? 'unset'
      if (!filters.reviewStates.includes(rs)) return false
    }

    // Explicit
    if (filters.explicit === 'erotic' && entry.explicit !== 'erotic') return false
    if (filters.explicit === 'non-explicit' && entry.explicit != null) return false

    // Score range
    const score = entry.zstyle_score ?? 0
    if (score < filters.scoreRange[0] || score > filters.scoreRange[1]) return false

    // Tags (OR within selected)
    if (filters.tags.length > 0 && !filters.tags.some((t) => entry.tags?.includes(t))) return false

    // Tones
    if (filters.tones.length > 0 && !filters.tones.some((t) => entry.tone?.includes(t))) return false

    // Pose family (scene-level OR entry-level)
    if (filters.poseFamilies.length > 0) {
      const sceneMatch = entry.scenes?.some((s) => filters.poseFamilies.includes(s.poseFamily))
      const entryMatch = entry.pose_family && filters.poseFamilies.includes(entry.pose_family)
      if (!sceneMatch && !entryMatch) return false
    }

    // Portability (scene-level)
    if (
      filters.portabilities.length > 0 &&
      !entry.scenes?.some((s) => filters.portabilities.includes(s.portability))
    )
      return false

    // Has raw text
    if (filters.hasRawText !== null && entry.has_raw_text !== filters.hasRawText) return false

    // DNA
    if (filters.dna.length > 0 && !filters.dna.some((d) => entry.dna?.includes(d))) return false

    return true
  })
}

function applySort(entries: Entry[], field: SortField, dir: SortDir): Entry[] {
  const sorted = [...entries].sort((a, b) => {
    switch (field) {
      case 'zstyle_score':
        return (b.zstyle_score ?? 0) - (a.zstyle_score ?? 0)
      case 'title':
        return (a.title ?? '').localeCompare(b.title ?? '')
      case 'scene_count':
        return (b.scenes?.length ?? 0) - (a.scenes?.length ?? 0)
      case 'review_state': {
        const order: Record<string, number> = { approved: 0, raw: 1, unset: 2 }
        const ra = order[a.review_state ?? 'unset'] ?? 2
        const rb = order[b.review_state ?? 'unset'] ?? 2
        return ra - rb
      }
      default:
        return 0
    }
  })
  return dir === 'asc' ? sorted.reverse() : sorted
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'zstyle_score', label: 'Score' },
  { value: 'title', label: 'Title' },
  { value: 'scene_count', label: 'Scenes' },
  { value: 'review_state', label: 'Review State' },
]

type GridCols = 2 | 3

function CorpusExplorer() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [fileCount, setFileCount] = useState(0)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sortField, setSortField] = useState<SortField>('zstyle_score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selected, setSelected] = useState<Entry | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [gridCols, setGridCols] = useState<GridCols>(3)
  const [summarySize, setSummarySize] = useState<SummarySize>('medium')
  const [summaryFont, setSummaryFont] = useState<SummaryFont>('sans')
  const [titleFont, setTitleFont] = useState<TitleFont>('sans')
  const [titleSize, setTitleSize] = useState<TitleSize>('medium')

  const handleLoad = useCallback(
    (newEntries: Entry[], count: number, names: string[]) => {
      setEntries((prev) => {
        const existingIds = new Set(prev.map((e) => e.id))
        const merged = [...prev, ...newEntries.filter((e) => !existingIds.has(e.id))]
        return merged
      })
      setFileCount((c) => c + count)
      setFileNames((n) => [...n, ...names])
    },
    [],
  )

  const clearAll = useCallback(() => {
    setEntries([])
    setFileCount(0)
    setFileNames([])
    setFilters(DEFAULT_FILTERS)
    setSelected(null)
  }, [])

  const filteredEntries = useMemo(() => applyFilters(entries, filters), [entries, filters])
  const sortedEntries = useMemo(
    () => applySort(filteredEntries, sortField, sortDir),
    [filteredEntries, sortField, sortDir],
  )

  // Empty state — show upload
  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <UploadArea onLoad={handleLoad} />
      </div>
    )
  }

  const gridClass = viewMode === 'grid'
    ? gridCols === 2
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl'
      : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
    : ''

  return (
    <div className="h-screen bg-gray-950 text-gray-100 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop always visible, mobile overlay */}
        <div
          className={`
            ${sidebarOpen ? 'fixed inset-0 z-40 flex' : 'hidden'}
            lg:relative lg:flex lg:inset-auto lg:z-auto
            w-64 shrink-0
          `}
        >
          {/* Backdrop on mobile */}
          {sidebarOpen && (
            <div
              className="absolute inset-0 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="relative z-10 w-64 h-full">
            <FilterSidebar
              entries={entries}
              filters={filters}
              filteredCount={filteredEntries.length}
              onChange={setFilters}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Toolbar */}
          <div className="sticky top-0 z-20 flex items-center gap-2 px-4 py-2 bg-gray-900/95 backdrop-blur border-b border-gray-800">
            {/* Mobile sidebar toggle */}
            <button
              className="lg:hidden p-1.5 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-300 focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
                className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-300 hover:text-white"
                title="Toggle sort direction"
              >
                {sortDir === 'desc' ? '↓' : '↑'}
              </button>
            </div>

            {/* View toggle */}
            <div className="flex items-center border border-gray-700 rounded overflow-hidden ml-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                title="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Column toggle (grid only) */}
            {viewMode === 'grid' && (
              <div className="flex items-center border border-gray-700 rounded overflow-hidden ml-1">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1.5 transition-colors ${gridCols === 2 ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  title="2 columns"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 transition-colors ${gridCols === 3 ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  title="3 columns"
                >
                  <Columns3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Summary text size */}
            <div className="flex items-center gap-1 ml-1">
              <Type className="w-3.5 h-3.5 text-gray-500" />
              <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                {([['very-small', 'XS'], ['small', 'S'], ['medium', 'M']] as [SummarySize, string][]).map(([size, label]) => (
                  <button
                    key={size}
                    onClick={() => setSummarySize(size)}
                    className={`px-1.5 py-1 text-xs transition-colors ${summarySize === size ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title={`Summary text: ${label}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary font */}
            <div className="flex items-center gap-1 ml-1">
              <span className="text-[10px] text-gray-500 font-medium">Sf</span>
              <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                {([['sans', 'Sans'], ['serif', 'Serif'], ['mono', 'Mono']] as [SummaryFont, string][]).map(([font, label]) => (
                  <button
                    key={font}
                    onClick={() => setSummaryFont(font)}
                    className={`px-1.5 py-1 text-xs transition-colors ${summaryFont === font ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title={`Summary font: ${label}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title font */}
            <div className="flex items-center gap-1 ml-1">
              <Heading className="w-3.5 h-3.5 text-gray-500" />
              <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                {([['sans', 'Sans'], ['playfair', 'Serif'], ['grotesk', 'Geo']] as [TitleFont, string][]).map(([font, label]) => (
                  <button
                    key={font}
                    onClick={() => setTitleFont(font)}
                    className={`px-1.5 py-1 text-xs transition-colors ${titleFont === font ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title={`Title font: ${label}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title size */}
            <div className="flex items-center gap-1 ml-1">
              <span className="text-[10px] text-gray-500 font-medium">Ts</span>
              <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                {([['small', 'S'], ['medium', 'M'], ['large', 'L']] as [TitleSize, string][]).map(([size, label]) => (
                  <button
                    key={size}
                    onClick={() => setTitleSize(size)}
                    className={`px-1.5 py-1 text-xs transition-colors ${titleSize === size ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title={`Title size: ${label}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact count */}
            <div className="hidden md:flex items-center gap-3 ml-3 text-xs text-gray-500">
              <span>{filteredEntries.length}{filteredEntries.length !== entries.length ? `/${entries.length}` : ''} entries</span>
            </div>

            {/* Upload + clear */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:block">
                {fileCount} file{fileCount !== 1 ? 's' : ''}
              </span>
              <UploadArea onLoad={handleLoad} onClear={clearAll} compact />
            </div>
          </div>

          {/* Results */}
          {sortedEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-600">
              <p className="text-lg">No entries match current filters</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="mt-3 text-sm text-blue-500 hover:text-blue-400"
              >
                Reset filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className={`p-4 ${gridClass}`}>
              {sortedEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onClick={() => setSelected(entry)} summarySize={summarySize} summaryFont={summaryFont} titleFont={titleFont} titleSize={titleSize} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {sortedEntries.map((entry) => (
                <EntryListItem key={entry.id} entry={entry} onClick={() => setSelected(entry)} />
              ))}
            </div>
          )}
        </main>

        {/* Utility sidebar — stats & activity */}
        <UtilitySidebar
          entries={entries}
          filteredEntries={filteredEntries}
          fileCount={fileCount}
          fileNames={fileNames}
        />
      </div>

      {/* Detail panel */}
      <EntryDetail entry={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
