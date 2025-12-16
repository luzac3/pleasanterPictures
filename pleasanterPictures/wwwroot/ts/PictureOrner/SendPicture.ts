import { SignalR } from "@root/share/SignalR";
export class SendPicture {
    SignalR: SignalR;
    private url: string;
    private method: string;
    private headers: { [key: string]: string };

    constructor(signalR: SignalR) {
        this.url = '/Picture/SendPicture';
        this.method = 'Get';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.SignalR = signalR;
        this.sendPictureId();
    }

    private sendPictureId = () => {
        const sendPictureElement = document.getElementById("send_picture");
        if (sendPictureElement != null) {
            sendPictureElement.onclick = async () => {
                const pictureId = (<HTMLInputElement>document.getElementById("picture_id")).value;
                const response = await fetch(this.url + `/${pictureId}`, {
                    method: this.method,
                    headers: this.headers
                });

                await response.text().then(data => {
                    const result = JSON.parse(data);
                    if (result.status == 200 || "OK") {
                        window.alert(result.message);
                    } else {
                        window.alert(result.message);
                    }
                });
            }
        }
    }
}