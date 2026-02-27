export class PictureOverlay {
    private overlayImage: HTMLImageElement | null = null;
    private overlayCanvas: HTMLCanvasElement | null = null;
    private originalWidth: number = 0;
    private originalHeight: number = 0;

    constructor() {
        this.overlayImage = document.getElementById('picture_image_overlay') as HTMLImageElement;
        this.overlayCanvas = document.getElementById('picture_canvas_overlay') as HTMLCanvasElement;
        this.originalWidth = parseInt(this.overlayImage.dataset.width || '1475', 10);
        this.originalHeight = parseInt(this.overlayImage.dataset.height || '1258', 10);
    }

    public async composeImage(): Promise<string> {

        if (!this.overlayImage || !this.overlayCanvas) {
            throw new Error('オーバーレイ画像またはキャンバスが見つかりません');
        }

        const compositeCanvas = document.createElement('canvas');
        compositeCanvas.width = this.originalWidth;
        compositeCanvas.height = this.originalHeight;

        const compositeCtx = compositeCanvas.getContext('2d');
        if (!compositeCtx) {
            throw new Error('コンテキストを取得できません');
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        return new Promise((resolve, reject) => {
            img.onload = () => {
                compositeCtx.drawImage(img, 0, 0, this.originalWidth, this.originalHeight);

                // キャンバスの内部ピクセルサイズから原寸へ直接マッピング
                // （DPR スケーリング込みの解像度をそのまま使う）
                compositeCtx.drawImage(
                    this.overlayCanvas!,
                    0, 0, this.overlayCanvas!.width, this.overlayCanvas!.height,
                    0, 0, this.originalWidth, this.originalHeight
                );

                const dataUri = compositeCanvas.toDataURL('image/png');
                resolve(dataUri);
            };

            img.onerror = () => {
                reject(new Error('画像の読み込みに失敗しました'));
            };

            img.src = this.overlayImage!.src;
        });
    }
}