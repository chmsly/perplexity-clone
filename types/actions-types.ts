export interface ActionState<T> {
  isSuccess: boolean
  message: string
  data?: T
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

export interface SearchResponse {
  answer: string
  sources: string[]
}

export interface SourceMetadata {
  title: string
  url: string
  snippet: string
}

export interface SearchResult {
  query: string
  answer: string
  sources: SourceMetadata[]
  timestamp: string
}

export interface SearchHistory {
  id: string
  query: string
  timestamp: string
}
