"use client"

import React, { useRef, useEffect } from "react"
import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.css"

interface JsonEditorProps {
  data: any
  onChange?: (json: any) => void
}

export function JsonEditor({ data, onChange }: JsonEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<JSONEditor | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    editorRef.current = new JSONEditor(containerRef.current, {
      mode: "code",
      onChangeJSON: (updatedJson: any) => {
        if (onChange) onChange(updatedJson)
      },

    })

    editorRef.current.set(data)

    return () => editorRef.current?.destroy()
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.update(data)
    }
  }, [data])

  return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />
}
