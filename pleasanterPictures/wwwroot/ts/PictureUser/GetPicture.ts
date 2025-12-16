import { SignalR } from "@root/share/SignalR";

export class GetPicture {
    private url: string;
    private method: string;
    private headers: { [key: string]: string };

    constructor() {
        this.url = '/Picture/GetPicture';
        this.method = 'Get';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
    }

    GetPicture = async (signalR: SignalR) => {
        signalR.get("ReceivePictureId", async (pictureId) => {
            const parsedPictureId = <{ [key: string]: string }>pictureId;

            const response = await fetch(this.url + `/${parsedPictureId.PictureId}`, {
                method: this.method,
                headers: this.headers
            });

            await response.text().then(data => {
                console.log(data);
                document.getElementById("picture")!.innerHTML = data;
            });
            // 問題を受信したらボタンをアクティブに
            const sendElement = document.getElementById('send') as HTMLButtonElement;
            sendElement.disabled = false;
        });
    }
}