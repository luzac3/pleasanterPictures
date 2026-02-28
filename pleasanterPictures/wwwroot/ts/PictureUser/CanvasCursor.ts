export class CanvasCursor {
    private element: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('canvas-cursor');
        document.body.appendChild(this.element);
    }

    UpdateStyle = (isEraser: boolean, penSize: number, eraserSize: number, drawColor: string) => {
        const size = isEraser ? eraserSize : penSize;
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";
        this.element.style.borderColor = isEraser ? "#999" : drawColor;
    }

    Show = (e: MouseEvent) => {
        this.element.style.display = "block";
        this.Move(e);
    }

    Hide = () => {
        this.element.style.display = "none";
    }

    Move = (e: MouseEvent) => {
        this.element.style.left = e.clientX + "px";
        this.element.style.top = e.clientY + "px";
    }
}