type DestinationCb = (error: Error | null, destination: string) => void
type FilenameCb = (error: Error | null, filename: string) => void

export type { DestinationCb, FilenameCb }
