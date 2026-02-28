import { CanvasCursor } from "./CanvasCursor";

export class DrawingToolbar {
    Cursor: CanvasCursor;
    private _isEraser: boolean = false;
    private _drawColor: string = "#333";
    readonly PenSize: number = 2;
    readonly EraserSize: number = 16;

    get IsEraser(): boolean { return this._isEraser; }
    get DrawColor(): string { return this._drawColor; }

    constructor() {
        this.Cursor = new CanvasCursor();
        this.UpdateCursorStyle();
        this.SetToolButtons();
        this.SetColorPalette();
        this.AdjustToolbarSize();
    }

    AdjustToolbarSize = () => {
        const drawingTools = document.querySelector('.drawing-tools');
        if (!drawingTools) return;

        const containerWidth = (drawingTools.parentElement?.offsetWidth || 300);
        const toolButtonSize = Math.max(32, Math.min(48, containerWidth * 0.08));
        const colorButtonSize = Math.max(24, Math.min(36, containerWidth * 0.06));
        const gap = Math.max(4, Math.min(10, containerWidth * 0.02));

        document.documentElement.style.setProperty('--tool-button-size', `${toolButtonSize}px`);
        document.documentElement.style.setProperty('--color-button-size', `${colorButtonSize}px`);
        document.documentElement.style.setProperty('--gap-size', `${gap}px`);
    }

    private UpdateCursorStyle = () => {
        this.Cursor.UpdateStyle(this._isEraser, this.PenSize, this.EraserSize, this._drawColor);
    }

    private SetToolButtons = () => {
        const penButton = document.getElementById('tool-pen');
        const eraserButton = document.getElementById('tool-eraser');

        penButton?.addEventListener('click', () => {
            this._isEraser = false;
            penButton.classList.add('active');
            eraserButton?.classList.remove('active');
            this.UpdateCursorStyle();
        });

        eraserButton?.addEventListener('click', () => {
            this._isEraser = true;
            eraserButton.classList.add('active');
            penButton?.classList.remove('active');
            this.UpdateCursorStyle();
        });
    }

    private SetColorPalette = () => {
        const colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const color = (e.target as HTMLButtonElement).dataset.color;
                if (color) {
                    this._drawColor = color;
                    colorButtons.forEach(b => b.classList.remove('active'));
                    (e.target as HTMLButtonElement).classList.add('active');
                    this.UpdateCursorStyle();
                }
            });
        });
        if (colorButtons.length > 0) {
            (colorButtons[0] as HTMLButtonElement).classList.add('active');
        }
    }
}