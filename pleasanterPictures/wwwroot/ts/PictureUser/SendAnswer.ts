import { FetchApi } from "@root/share/FetchApi"
import { PictureOverlay } from "./PictureOverlay";

export class SendAnswer {
    private url: string;
    private method: string;
    private headers: { [key: string]: string }; 
    private responseKind: string;

    constructor() {
        this.url = '/Picture/SendAnswer';
        this.method = 'POST';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.responseKind = "json";
    }

    SendCanvas = async () => {
        const sendElement = document.getElementById('send') as HTMLButtonElement;
        sendElement.onclick = async () => {
            let dataUrl = "";
            const canvasElement = document.getElementById('textCanvas') as HTMLCanvasElement;
            if (!canvasElement) {
                const pictureOverlay = new PictureOverlay();
                dataUrl = await pictureOverlay.composeImage();
            } else {
                dataUrl = canvasElement.toDataURL("image/png");
            }
            const pictureId = (document.getElementById('picture_id') as HTMLInputElement).value;
            const answerEntity: { [key: string]: string } = {
                pictureId: pictureId,
                image: dataUrl
            };
            this.Send(answerEntity).then((data: string) => {
                const result = JSON.parse(data);
                sendElement.disabled = true;
                window.alert(result.message);
            });
        };
    }

    private Send = async (answerEntity: { [key: string]: string }) => {
        const fetchApi = new FetchApi();
        return await fetchApi.send(
            this.url,
            this.method,
            this.headers,
            answerEntity,
            this.responseKind
        ).then(async (data: string) => {
            return data;
        }).catch(e => {
            throw e;
        });
    }
}