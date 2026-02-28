export class UndoHistory {
    private history: ImageData[] = [];
    private maxHistory: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private undoButton: HTMLButtonElement | null;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, maxHistory: number = 30) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.maxHistory = maxHistory;
        this.undoButton = document.getElementById('tool-undo') as HTMLButtonElement | null;
        this.undoButton?.addEventListener('click', () => this.Undo());
        this.UpdateButtonState();
    }

    Save = () => {
        const snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.history.push(snapshot);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        this.UpdateButtonState();
    }

    Undo = () => {
        if (this.history.length === 0) return;
        const snapshot = this.history.pop()!;
        this.ctx.putImageData(snapshot, 0, 0);
        this.UpdateButtonState();
    }

    Clear = () => {
        this.history = [];
        this.UpdateButtonState();
    }

    private UpdateButtonState = () => {
        if (this.undoButton) {
            this.undoButton.disabled = this.history.length === 0;
        }
    }
}