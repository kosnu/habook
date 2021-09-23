import { format } from "date-fns"

export function dateFormatter(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return format(d, "yyyy/MM/dd (EEE)")
}

export function dateToString(date: Date): string {
  return format(date, "yyyy/MM/dd")
}
