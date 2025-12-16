import * as signalR from "@microsoft/signalr";

export class SignalR {
    private connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();
    }

    activate = async () => {
        // 読み込み不良エラー防止のため、読み込み完了するまでBodyはHidden
        document.getElementsByTagName("body").item(0)!.style.visibility = "hidden";

        await this.connectionStart();

        // hiddenの解除
        document.getElementsByTagName("body").item(0)!.style.visibility = "visible";
    }

    private connectionStart = async () => {
        await this.connection.start().catch(
            // fixme error処理実装
            (err) => console.log(err)
        );
    }

    send = (sendProcessName: string, ...args: (string |number | boolean)[]) => {
        this.connection.send(sendProcessName, ...args);
    }

    get = (getProcessName: string, callback: (json: any) => void) => {
        this.connection.on(getProcessName, (
            strJson: any
        ) => {
            let json = {};
            if ((typeof strJson) == "string") {
                json = JSON.parse(strJson) as { [key: string]: string | number | boolean } | { [key: string]: string | number }[];
            } else {
                json = strJson as { [key: string]: string | number | boolean } | { [key: string]: string | number }[];
            }
            callback(json);
        });
    }

    close = () => {
        this.connection.stop();
    }
}