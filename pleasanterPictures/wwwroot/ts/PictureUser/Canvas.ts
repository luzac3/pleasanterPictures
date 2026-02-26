export class Canvas {
    CanvasElement: HTMLCanvasElement;
    Ctx!: CanvasRenderingContext2D;
    ClearButtonElement: HTMLButtonElement;
    private isDrawing: boolean = false;
    private lastX: number = 0;
    private lastY: number = 0;
    private drawColor: string = "#333";
    private isEraser: boolean = false;
    private dpr: number = 1;
    private isOverlay: boolean = false;
    private penSize: number = 2;
    private eraserSize: number = 16;
    private cursorElement: HTMLDivElement;

    constructor () {
        this.CanvasElement = document.getElementById('textCanvas') as HTMLCanvasElement;
        const overlayCanvas = document.getElementById('picture_canvas_overlay') as HTMLCanvasElement;
        
        // オーバーレイキャンバスがあればそちらを使用
        if (overlayCanvas) {
            this.CanvasElement = overlayCanvas;
            this.isOverlay = true;
        }

        this.ClearButtonElement = document.getElementById('clear') as HTMLButtonElement;
        this.dpr = window.devicePixelRatio || 1;
        this.cursorElement = this.CreateCursorElement();

        this.SetToolButtons();
        this.SetColorPalette();
        this.AdjustToolbarSize();

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

        // ウィンドウリサイズ時にCanvasサイズを再設定
        window.addEventListener('resize', () => {
            this.SetCanvasSizeForDpi();
            this.ActivateCanvas();
            this.AdjustToolbarSize();
        });
    }

    private CreateCursorElement = (): HTMLDivElement => {
        const cursor = document.createElement('div');
        cursor.classList.add('canvas-cursor');
        document.body.appendChild(cursor);
        this.UpdateCursorStyle();
        return cursor;
    }

    private UpdateCursorStyle = () => {
        if (!this.cursorElement) return;
        const size = this.isEraser ? this.eraserSize : this.penSize;
        this.cursorElement.style.width = size + "px";
        this.cursorElement.style.height = size + "px";
        this.cursorElement.style.borderColor = this.isEraser ? "#999" : this.drawColor;
    }

    private ShowCursor = (e: MouseEvent) => {
        this.cursorElement.style.display = "block";
        this.MoveCursor(e);
    }

    private HideCursor = () => {
        this.cursorElement.style.display = "none";
    }

    private MoveCursor = (e: MouseEvent) => {
        this.cursorElement.style.left = e.clientX + "px";
        this.cursorElement.style.top = e.clientY + "px";
    }

    private InitCanvas = () => {
        this.SetCanvasSizeForDpi();
        this.Ctx = this.CanvasElement.getContext('2d')!;
        this.SetCanvas();
        this.ActivateCanvas();
        this.SetDrawingPc();
        this.SetDrawingPhone();
    }

    private SetCanvas = () => {
        this.ClearButtonElement.addEventListener("click", () => {
            this.ActivateCanvas();
        });
    }

    private ActivateCanvas = () => {
        if (!this.Ctx) return;
        this.Ctx.clearRect(0, 0, this.CanvasElement.width, this.CanvasElement.height);
    }

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

    private AdjustToolbarSize = () => {
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

    private SetToolButtons = () => {
        const penButton = document.getElementById('tool-pen');
        const eraserButton = document.getElementById('tool-eraser');

        if (penButton) {
            penButton.addEventListener('click', () => {
                this.isEraser = false;
                penButton.classList.add('active');
                eraserButton?.classList.remove('active');
                this.UpdateCursorStyle();
            });
        }

        if (eraserButton) {
            eraserButton.addEventListener('click', () => {
                this.isEraser = true;
                eraserButton.classList.add('active');
                penButton?.classList.remove('active');
                this.UpdateCursorStyle();
            });
        }
    }

    private SetColorPalette = () => {
        const colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const color = (e.target as HTMLButtonElement).dataset.color;
                if (color) {
                    this.drawColor = color;
                    // アクティブ状態を更新
                    colorButtons.forEach(b => b.classList.remove('active'));
                    (e.target as HTMLButtonElement).classList.add('active');
                    this.UpdateCursorStyle();
                }
            });
        });
        // デフォルトで最初のボタンをアクティブに
        if (colorButtons.length > 0) {
            (colorButtons[0] as HTMLButtonElement).classList.add('active');
        }
    }

    private SetDrawingPc = () => {
        this.CanvasElement.addEventListener('mouseenter', (e) => this.ShowCursor(e));
        this.CanvasElement.addEventListener('mouseleave', () => {
            this.HideCursor();
            this.isDrawing = false;
        });

        this.CanvasElement.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            const rect = this.CanvasElement.getBoundingClientRect();
            this.lastX = (e.clientX - rect.left) * this.dpr;
            this.lastY = (e.clientY - rect.top) * this.dpr;
        });

        this.CanvasElement.addEventListener('mousemove', (e) => {
            this.MoveCursor(e);
            if (!this.isDrawing) return;
            const rect = this.CanvasElement.getBoundingClientRect();
            const x = (e.clientX - rect.left) * this.dpr;
            const y = (e.clientY - rect.top) * this.dpr;
            
            if (this.isEraser) {
                const size = this.eraserSize * this.dpr;
                this.Ctx.clearRect(x - size / 2, y - size / 2, size, size);
            } else {
                if (this.lastX === x && this.lastY === y) {
                    this.Ctx.beginPath();
                    this.Ctx.arc(x, y, (this.penSize / 2) * this.dpr, 0, Math.PI * 2);
                    this.Ctx.fillStyle = this.drawColor;
                    this.Ctx.fill();
                } else {
                    this.Ctx.beginPath();
                    this.Ctx.moveTo(this.lastX, this.lastY);
                    this.Ctx.lineTo(x, y);
                    this.Ctx.strokeStyle = this.drawColor;
                    this.Ctx.lineWidth = this.penSize * this.dpr;
                    this.Ctx.lineCap = "round";
                    this.Ctx.stroke();
                }
            }
            this.lastX = x;
            this.lastY = y;
        });

        this.CanvasElement.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
    }

    private SetDrawingPhone = () => {
        this.CanvasElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isDrawing = true;
            const rect = this.CanvasElement.getBoundingClientRect();
            const touch = e.touches[0];
            this.lastX = (touch.clientX - rect.left) * this.dpr;
            this.lastY = (touch.clientY - rect.top) * this.dpr;
        }, { passive: false });

        this.CanvasElement.addEventListener('touchmove', (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            const rect = this.CanvasElement.getBoundingClientRect();
            const touch = e.touches[0];
            const x = (touch.clientX - rect.left) * this.dpr;
            const y = (touch.clientY - rect.top) * this.dpr;
            
            if (this.isEraser) {
                const size = this.eraserSize * this.dpr;
                this.Ctx.clearRect(x - size / 2, y - size / 2, size, size);
            } else {
                if (this.lastX === x && this.lastY === y) {
                    this.Ctx.beginPath();
                    this.Ctx.arc(x, y, (this.penSize / 2) * this.dpr, 0, Math.PI * 2);
                    this.Ctx.fillStyle = this.drawColor;
                    this.Ctx.fill();
                } else {
                    this.Ctx.beginPath();
                    this.Ctx.moveTo(this.lastX, this.lastY);
                    this.Ctx.lineTo(x, y);
                    this.Ctx.strokeStyle = this.drawColor;
                    this.Ctx.lineWidth = this.penSize * this.dpr;
                    this.Ctx.lineCap = "round";
                    this.Ctx.stroke();
                }
            }
            this.lastX = x;
            this.lastY = y;
        }, { passive: false });

        this.CanvasElement.addEventListener('touchend', () => {
            this.isDrawing = false;
        });

        this.CanvasElement.addEventListener('touchcancel', () => {
            this.isDrawing = false;
        });
    }
}