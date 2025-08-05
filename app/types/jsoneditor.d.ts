declare module 'jsoneditor' {
  import { Component } from 'react'

  interface JSONEditorOptions {
    mode?: 'tree' | 'view' | 'form' | 'code' | 'text'
    onChangeJSON?: (json: any) => void
    onChange?: () => void
    onError?: (err: Error) => void
  }

  export default class JSONEditor {
    constructor(container: HTMLElement, options?: JSONEditorOptions)
    set(json: any): void
    update(json: any): void
    get(): any
    destroy(): void
  }
}
