export type Engine = {
  destroy: () => void
  pause?: () => void
  resume?: () => void
  resize?: (width: number, height: number, dpr: number) => void
}

export type EngineFactory<TOptions = unknown> = (
  host: HTMLElement,
  options: TOptions
) => Engine
