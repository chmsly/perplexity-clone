export type ActionState<T> = {
  isSuccess: boolean
  message: string
  data?: T
}

export type ActionError = {
  code: string
  message: string
}

export type ActionResponse<T> = {
  data?: T
  error?: ActionError
}
