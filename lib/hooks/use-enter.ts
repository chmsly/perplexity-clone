"use client"

import { useEffect } from "react"

export function useEnter(callback: () => void, dependencies: any[] = []) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        callback()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [callback, ...dependencies])
}
