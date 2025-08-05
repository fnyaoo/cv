"use client"

import React, { useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"

interface JsonEditorProps {
  data: any
  onChange?: (json: any) => void
}

export function JsonEditor({ data, onChange }: JsonEditorProps) {
  const [code, setCode] = useState(JSON.stringify(data, null, 2))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setCode(JSON.stringify(data, null, 2))
  }, [data])

  const onCodeChange = (value: string) => {
    setCode(value)
    try {
      const parsed = JSON.parse(value)
      setError(null)
      if (onChange) onChange(parsed)
    } catch {
      setError("Ошибка синтаксиса JSON")
    }
  }

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <CodeMirror
        value={code}
        height="100%"
        extensions={[json()]}
        theme={oneDark}
        onChange={onCodeChange}
      />
      {error && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
