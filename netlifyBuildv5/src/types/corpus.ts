export interface Scene {
  exactWording: string
  reusableWording: string
  poseFamily: string
  tags: string[]
  dna: string
  portability: string
  score: number
  matchBand: string
}

export interface Entry {
  id: string
  title: string
  summary: string
  author: string
  seed: string
  explicit: string | null
  band: string
  match_band: string
  review_state: string | null
  zstyle_score: number
  tags: string[]
  tone: string[]
  dna: string[]
  character_energy: string
  character_note: string
  contortion_focus: string
  why_it_fits: string
  has_raw_text: boolean
  mined: boolean
  sources: string[]
  scenes: Scene[]
  /* optional fields for markdown imports */
  pose_setpiece?: string
  plot_scaffold?: string
  anatomical_breakdown?: string
  pose_family?: string
}

export type SortField = 'zstyle_score' | 'title' | 'scene_count' | 'review_state'
export type SortDir = 'asc' | 'desc'
export type ViewMode = 'grid' | 'list'

export interface FilterState {
  search: string
  bands: string[]
  reviewStates: string[]
  explicit: 'all' | 'erotic' | 'non-explicit'
  scoreRange: [number, number]
  tags: string[]
  tones: string[]
  poseFamilies: string[]
  portabilities: string[]
  hasRawText: boolean | null
  dna: string[]
}

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  bands: [],
  reviewStates: [],
  explicit: 'all',
  scoreRange: [0, 100],
  tags: [],
  tones: [],
  poseFamilies: [],
  portabilities: [],
  hasRawText: null,
  dna: [],
}

export const BAND_COLORS: Record<string, string> = {
  core: 'bg-purple-700 text-purple-100 border-purple-500',
  excellent: 'bg-green-700 text-green-100 border-green-500',
  strong: 'bg-blue-700 text-blue-100 border-blue-500',
  good: 'bg-gray-600 text-gray-100 border-gray-400',
  partial: 'bg-yellow-700 text-yellow-100 border-yellow-500',
  weak: 'bg-gray-500 text-gray-100 border-gray-400',
}

export const BAND_DOT_COLORS: Record<string, string> = {
  core: 'bg-purple-500',
  excellent: 'bg-green-500',
  strong: 'bg-blue-500',
  good: 'bg-gray-400',
  partial: 'bg-orange-500',
  weak: 'bg-gray-500',
}

export const REVIEW_COLORS: Record<string, string> = {
  approved: 'bg-emerald-800 text-emerald-100 border-emerald-600',
  raw: 'bg-yellow-800 text-yellow-100 border-yellow-600',
  unset: 'bg-gray-700 text-gray-300 border-gray-500',
}
