export * from "./actions-types"

export interface Message {
  content: string
  role: "user" | "assistant"
}

export interface Source {
  title: string
  url: string
  snippet: string
}

export type ActionState<T> = {
  isSuccess: boolean
  message: string
  data?: T
}
