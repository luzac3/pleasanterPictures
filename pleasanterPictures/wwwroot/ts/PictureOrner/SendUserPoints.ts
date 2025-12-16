import { FetchApi } from "@root/share/FetchApi"

export class SendUserPoints {
    private url: string;
    private method: string;
    private headers: { [key: string]: string };
    private responseKind: string;

    constructor() {
        this.url = '/Picture/Sendpoints';
        this.method = 'POST';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.responseKind = "json";
    }

    SendPoints = () => {
        const sendPointsElement = document.getElementById("send_points") as HTMLButtonElement;
        const answerElements = document.getElementsByClassName("answer");

        if (sendPointsElement != null) {
            sendPointsElement.onclick = () => {
                let pointEntityList: { [key: string]: string }[] = [];

                Array.from(answerElements).forEach(answerElement => {
                    const answerId = (answerElement.querySelector('.answer_id') as HTMLInputElement).value;
                    const point = (answerElement.querySelector('.point') as HTMLInputElement).value;
                    pointEntityList.push({
                        AnswerId: answerId,
                        Point: point
                    });
                });

                this.Send(pointEntityList).then((data: string) => {
                    const result = JSON.parse(data);
                    window.alert(result.message);
                });
            }
        }
    }

    private Send = async (pointEntityList: { [key: string]: string }[]) => {
        const fetchApi = new FetchApi();
        return await fetchApi.send(
            this.url,
            this.method,
            this.headers,
            pointEntityList,
            this.responseKind
        ).then(async (data: string) => {
            return data;
        }).catch(e => {
            throw e;
        });
    }
}