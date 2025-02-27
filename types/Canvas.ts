export type CanvasState =
| {
    mode: CanvasMode.None
} 
| {
    mode: CanvasMode.Pressing
    origin:Point
} 
|{
    mode: CanvasMode.SelectionNet
    origin: Point
    current?:Point
}
|{
    mode: CanvasMode.Translating
    current:Point
} |{
    mode: CanvasMode.Resizing
    initialBounds:XYWH
    corner:Side
} |{
    mode:CanvasMode.Pencil
}
|{
    mode: CanvasMode.Inserting
    layerType:LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note
}

export enum LayerType{
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note
}
export type ReactangleLayer = {
    type: LayerType.Rectangle,
    x: number,
    y: number,
    height: number,
    width: number,
    fill : Color,
    value?:string
}
export type EllipseLayer = {
    type: LayerType.Ellipse,
    x: number,
    y: number,
    height: number,
    width: number,
    fill : Color,
    value?:string
}
export type PathLayer = {
    type: LayerType.Path,
    x: number,
    y: number,
    height: number,
    width: number,
    fill : Color,
    points : number[][]
    value?:string
}
export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    fill : Color;
    value?:string
}
export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    height: number;
    width: number;
    fill : Color;
    value?:string
}
export type Point = {
    x: number;
    y: number;

}
export type XYWH ={
    x: number;
    y: number;
    width: number;
    height: number;
}
export enum Side{
    top = 1,
    bottom = 2,
    left = 4,
    right = 8
}
export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}
export type Color = {
    r: number;
    g: number;
    b: number;
}

export type camara = {
    x: number;
    y: number;
}

export type Layer = ReactangleLayer | EllipseLayer | PathLayer | TextLayer |NoteLayer