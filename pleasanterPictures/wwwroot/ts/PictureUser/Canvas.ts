export class Canvas {
    CanvasElement: HTMLCanvasElement;
    Ctx: CanvasRenderingContext2D;
    ClearButtonElement: HTMLButtonElement;
    private isDrawing: boolean = false;
    private lastX: number = 0;
    private lastY: number = 0;
    private drawColor: string = "#333";

    constructor () {
        this.CanvasElement = document.getElementById('textCanvas') as HTMLCanvasElement;
        const overlayCanvas = document.getElementById('picture_canvas_overlay') as HTMLCanvasElement;
        
        // オーバーレイキャンバスがあればそちらを使用
        if (overlayCanvas) {
            this.CanvasElement = overlayCanvas;
        }

        this.ClearButtonElement = document.getElementById('clear') as HTMLButtonElement;
        this.SetCanvasSizeForDpi();
        this.Ctx = this.CanvasElement.getContext('2d')!;
        this.SetCanvas();
        this.ActivateCanvas();
        this.SetColorPalette();
        this.SetDrawingPc();
        this.SetDrawingPhone();

        // ウィンドウリサイズ時にCanvasサイズを再設定
        window.addEventListener('resize', () => {
            this.SetCanvasSizeForDpi();
            this.ActivateCanvas();
        });
    }

    private SetCanvas = () => {
        this.ClearButtonElement.addEventListener("click", () => {
            this.ActivateCanvas();
        });
    }

    private ActivateCanvas = () => {
        this.Ctx.clearRect(0, 0, this.CanvasElement.width, this.CanvasElement.height);
    }

    private SetCanvasSizeForDpi = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.CanvasElement.getBoundingClientRect();
        this.CanvasElement.width = rect.width * dpr;
        this.CanvasElement.height = rect.height * dpr;
        this.CanvasElement.style.width = rect.width + "px";
        this.CanvasElement.style.height = rect.height + "px";
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
                }
            });
        });
        // デフォルトで最初のボタンをアクティブに
        if (colorButtons.length > 0) {
            (colorButtons[0] as HTMLButtonElement).classList.add('active');
        }
    }

    private SetDrawingPc = () => {
        this.CanvasElement.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            const rect = this.CanvasElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            this.lastX = (e.clientX - rect.left) * dpr;
            this.lastY = (e.clientY - rect.top) * dpr;
        });

        this.CanvasElement.addEventListener('mousemove', (e) => {
            if (!this.isDrawing) return;
            const rect = this.CanvasElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const x = (e.clientX - rect.left) * dpr;
            const y = (e.clientY - rect.top) * dpr;
            if (this.lastX === x && this.lastY === y) {
                this.Ctx.beginPath();
                this.Ctx.arc(x, y, 1 * dpr, 0, Math.PI * 2);
                this.Ctx.fillStyle = this.drawColor;
                this.Ctx.fill();
            } else {
                this.Ctx.beginPath();
                this.Ctx.moveTo(this.lastX, this.lastY);
                this.Ctx.lineTo(x, y);
                this.Ctx.strokeStyle = this.drawColor;
                this.Ctx.lineWidth = 2 * dpr;
                this.Ctx.lineCap = "round";
                this.Ctx.stroke();
            }
            this.lastX = x;
            this.lastY = y;
        });

        this.CanvasElement.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        this.CanvasElement.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });
    }

    private SetDrawingPhone = () => {
        this.CanvasElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isDrawing = true;
            const rect = this.CanvasElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const touch = e.touches[0];
            this.lastX = (touch.clientX - rect.left) * dpr;
            this.lastY = (touch.clientY - rect.top) * dpr;
        }, { passive: false });

        this.CanvasElement.addEventListener('touchmove', (e) => {
            if (!this.isDrawing) return;
            e.preventDefault();
            const rect = this.CanvasElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const touch = e.touches[0];
            const x = (touch.clientX - rect.left) * dpr;
            const y = (touch.clientY - rect.top) * dpr;
            if (this.lastX === x && this.lastY === y) {
                this.Ctx.beginPath();
                this.Ctx.arc(x, y, 1 * dpr, 0, Math.PI * 2);
                this.Ctx.fillStyle = this.drawColor;
                this.Ctx.fill();
            } else {
                this.Ctx.beginPath();
                this.Ctx.moveTo(this.lastX, this.lastY);
                this.Ctx.lineTo(x, y);
                this.Ctx.strokeStyle = this.drawColor;
                this.Ctx.lineWidth = 2 * dpr;
                this.Ctx.lineCap = "round";
                this.Ctx.stroke();
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