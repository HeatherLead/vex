import { camara, Color, Point, Side, XYWH } from "@/types/Canvas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  '#DC2626' , '#D97706' , '#059669' , '#7C3AED' , '#DB2777',"#64C2DB","#7476ED" , "#C994DF"
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
export function colorToCss(color : Color){
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`
}

export function resizeBounds (bounds:XYWH , corner:Side , point:Point):XYWH {

  const result = {
    x: bounds.x,
    y:bounds.y,
    width:bounds.width,
    height:bounds.height
  }

  if((corner & Side.left) === Side.left){
    result.x = Math.min(point.x , bounds.x + bounds.width)
    result.width = Math.abs(bounds.x+bounds.width - point.x)
  }
  if((corner & Side.right) === Side.right){
    result.x = Math.min(point.x , bounds.x)
    result.width = Math.abs(point.x - bounds.x)
  } 
  if((corner & Side.top) === Side.top){
    result.y = Math.min(point.y , bounds.y + bounds.height)
    result.height = Math.abs(bounds.y + bounds.height - point.y)
  }
  if((corner & Side.bottom) === Side.bottom){
    result.y = Math.min(point.y , bounds.y)
    result.height= Math.abs(point.y - bounds.y)

  }
  return result

}