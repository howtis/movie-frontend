export function countBytes (str: string): number {
  const encoder = new TextEncoder()
  const encodedStr = encoder.encode(str)
  return encodedStr.length
}

export function isEmpty (object: Record<string, unknown>): boolean {
  return Object.keys(object).length === 0
}
