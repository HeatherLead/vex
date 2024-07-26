import { camara } from "@/types/Canvas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  '#DC2626' , '#D97706' , '#059669' , '#7C3AED' , '#DB2777'
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor (connectionId: number) {

  return COLORS[connectionId % COLORS.length]

}

export function pointerEventToCanvasPoint (e:React.PointerEvent , camera:camara) {
  return {
    x: Math.round(e.clientX-camera.x),
    y: Math.round(e.clientY - camera.y)
  }

}