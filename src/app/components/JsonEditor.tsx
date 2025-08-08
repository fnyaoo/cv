"use client"

import React, { useState, useEffect } from "react"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { Icon } from '@iconify/react/dist/iconify.js'

interface JsonEditorProps {
  data: any
  onChange?: (json: any) => void
}

interface JsonError {
  line?: number
  column?: number
}

export function JsonEditor({ data, onChange }: JsonEditorProps) {
  const [code, setCode] = useState(JSON.stringify(data, null, 2))
  const [error, setError] = useState<JsonError | null>(null)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setCode(JSON.stringify(data, null, 2))
  }, [data])

  const parseJsonError = (errorMessage: string): JsonError => {
    const positionMatch = errorMessage.match(/at position (\d+)/)
    let line: number | undefined
    let column: number | undefined

    if (positionMatch) {
      const position = parseInt(positionMatch[1])
      const lines = code.substring(0, position).split('\n')
      line = lines.length
      column = lines[lines.length - 1].length + 1
    }

    return { line, column }
  }

  const onCodeChange = (value: string) => {
    setCode(value)

    try {
      const parsed = JSON.parse(value)
      setError(null)
      setIsValid(true)
      if (onChange) onChange(parsed)
    } catch (e) {
      const message = e instanceof Error ? e.message : ""
      const parsedError = parseJsonError(message)
      setError(parsedError)
      setIsValid(false)
    }
  }

  return (
    <div className="h-screen w-full relative bg-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-sm">
          {isValid ? (
            <div className="flex items-center gap-1 text-green-600">
              <Icon icon="lineicons:checkmark-circle" className="h-4 w-4" />
              <span>Valid</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600">
              <Icon icon="lineicons:cross-circle" className="h-4 w-4" />
              <span>Invalid</span>
              {error?.line && error?.column && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  Line {error.line}, Col {error.column}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="pt-[38px] h-full">
        <CodeMirror
          value={code}
          height="100%"
          extensions={[json(), EditorView.lineWrapping]}
          onChange={onCodeChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            closeBrackets: true,
            highlightSelectionMatches: true,
          }}
        />
      </div>
    </div>
  )
}
