import { DrawingToolbar } from "./DrawingToolbar";
import { UndoHistory } from "./UndoHistory";

export class Canvas {
    CanvasElement: HTMLCanvasElement;
    Ctx!: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private lastX: number = 0;
    private lastY: number = 0;
    private dpr: number = 1;
    private isOverlay: boolean = false;
    private toolbar: DrawingToolbar;
    private undoHistory!: UndoHistory;

    constructor () {
        this.CanvasElement = document.getElementById('textCanvas') as HTMLCanvasElement;
        const overlayCanvas = document.getElementById('picture_canvas_overlay') as HTMLCanvasElement;
        
        if (overlayCanvas) {
            this.CanvasElement = overlayCanvas;
            this.isOverlay = true;
        }

        this.dpr = window.devicePixelRatio || 1;
        this.toolbar = new DrawingToolbar();

        if (this.isOverlay) {
            const image = document.getElementById('picture_image_overlay') as HTMLImageElement;
            if (image) {
                if (image.complete && image.naturalWidth > 0) {
                    this.InitCanvas();
                } else {
                    image.addEventListener('load', () => this.InitCanvas());
                }
            }
        } else {
            this.InitCanvas();
        }

        window.addEventListener('resize', () => {
            this.HandleResize();
            this.toolbar.AdjustToolbarSize();
        });

        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                this.undoHistory?.Undo();
            }
        });
    }

    // ── キャンバス初期化 ──

    private InitCanvas = () => {
        this.SetCanvasSizeForDpi();
        this.Ctx = this.CanvasElement.getContext('2d')!;
        this.undoHistory = new UndoHistory(this.CanvasElement, this.Ctx);
        this.SetClearButton();
        this.ClearCanvas();
        this.SetDrawingPc();
        this.SetDrawingPhone();
    }

    private SetClearButton = () => {
        const clearButton = document.getElementById('clear') as HTMLButtonElement;
        clearButton?.addEventListener("click", () => {
            this.undoHistory.Save();
            this.ClearCanvas();
        });
    }

    private ClearCanvas = () => {
        if (!this.Ctx) return;
        this.Ctx.clearRect(0, 0, this.CanvasElement.width, this.CanvasElement.height);
    }

    // ── DPI・リサイズ ──

    private SetCanvasSizeForDpi = () => {
        let width: number;
        let height: number;

        if (this.isOverlay) {
            const image = document.getElementById('picture_image_overlay') as HTMLImageElement;
            if (!image) return;
            width = image.offsetWidth;
            height = image.offsetHeight;
        } else {
            const rect = this.CanvasElement.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
        }

        if (width === 0 || height === 0) return;

        this.CanvasElement.width = width * this.dpr;
        this.CanvasElement.height = height * this.dpr;
        this.CanvasElement.style.width = width + "px";
        this.CanvasElement.style.height = height + "px";
    }

    private HandleResize = () => {
        if (!this.Ctx) return;

        const prevWidth = this.CanvasElement.width;
        const prevHeight = this.CanvasElement.height;
        const savedImage = this.Ctx.getImageData(0, 0, prevWidth, prevHeight);

        this.dpr = window.devicePixelRatio || 1;
        this.SetCanvasSizeForDpi();

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = prevWidth;
        tempCanvas.height = prevHeight;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.putImageData(savedImage, 0, 0);

        this.Ctx.drawImage(
            tempCanvas,
            0, 0, prevWidth, prevHeight,
            0, 0, this.CanvasElement.width, this.CanvasElement.height
        );

        this.undoHistory.Clear();
    }

    // ── ストローク描画（PC/Phone共通） ──

    private GetCanvasPoint = (clientX: number, clientY: number): { x: number; y: number } => {
        const rect = this.CanvasElement.getBoundingClientRect();
        return {
            x: (clientX - rect.left) * this.dpr,
            y: (clientY - rect.top) * this.dpr
        };
    }

    private StartStroke = (clientX: number, clientY: number) => {
        this.undoHistory.Save();
        this.isDrawing = true;
        const { x, y } = this.GetCanvasPoint(clientX, clientY);
        this.lastX = x;
        this.lastY = y;
    }

    private ContinueStroke = (clientX: number, clientY: number) => {
        if (!this.isDrawing) return;
        const { x, y } = this.GetCanvasPoint(clientX, clientY);

        if (this.toolbar.IsEraser) {
            const size = this.toolbar.EraserSize * this.dpr;
            this.Ctx.clearRect(x - size / 2, y - size / 2, size, size);
        } else if (this.lastX === x && this.lastY === y) {
            this.Ctx.beginPath();
            this.Ctx.arc(x, y, (this.toolbar.PenSize / 2) * this.dpr, 0, Math.PI * 2);
            this.Ctx.fillStyle = this.toolbar.DrawColor;
            this.Ctx.fill();
        } else {
            this.Ctx.beginPath();
            this.Ctx.moveTo(this.lastX, this.lastY);
            this.Ctx.lineTo(x, y);
            this.Ctx.strokeStyle = this.toolbar.DrawColor;
            this.Ctx.lineWidth = this.toolbar.PenSize * this.dpr;
            this.Ctx.lineCap = "round";
            this.Ctx.stroke();
        }

        this.lastX = x;
        this.lastY = y;
    }

    private EndStroke = () => {
        this.isDrawing = false;
    }

    // ── イベントバインド ──

    private SetDrawingPc = () => {
        this.CanvasElement.addEventListener('mouseenter', (e) => this.toolbar.Cursor.Show(e));
        this.CanvasElement.addEventListener('mouseleave', () => {
            this.toolbar.Cursor.Hide();
            this.EndStroke();
        });
        this.CanvasElement.addEventListener('mousedown', (e) => {
            this.StartStroke(e.clientX, e.clientY);
        });
        this.CanvasElement.addEventListener('mousemove', (e) => {
            this.toolbar.Cursor.Move(e);
            this.ContinueStroke(e.clientX, e.clientY);
        });
        this.CanvasElement.addEventListener('mouseup', () => this.EndStroke());
    }

    private SetDrawingPhone = () => {
        this.CanvasElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.StartStroke(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: false });

        this.CanvasElement.addEventListener('touchmove', (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            this.ContinueStroke(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: false });

        this.CanvasElement.addEventListener('touchend', () => this.EndStroke());
        this.CanvasElement.addEventListener('touchcancel', () => this.EndStroke());
    }
}