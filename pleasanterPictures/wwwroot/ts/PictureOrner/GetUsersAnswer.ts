import { SignalR } from "@root/share/SignalR";

export class GetUsersAnswer {
    private url: string;
    private method: string;
    private headers: { [key: string]: string };

    constructor() {
        this.url = '/Picture/GetAnswer';
        this.method = 'Get';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
    }

    GetAnswer = async (signalR: SignalR) => {
        signalR.get("UserAnswerId", async (result) => {
            const answerListElement = document.getElementById("answer_list");
            const parsedResultId = <{ [key: string]: string }>result;

            const response = await fetch(this.url + `/${parsedResultId.ResultId}`, {
                method: this.method,
                headers: this.headers
            });

            if (answerListElement != null) {
                await response.text().then(data => {
                    const path = window.location.pathname;
                    answerListElement.insertAdjacentHTML('beforeend', data);

                    if (path.startsWith("/Picture/ShowPicture")) {
                        Array.from(document.getElementsByClassName("show")).forEach(element => {
                            element.classList.add("nodisplay");
                        });
                        const answers = document.querySelectorAll(".answer");
                        if (answers.length > 0) {
                            answers[answers.length - 1].scrollIntoView({ behavior: "smooth" });
                        }
                    }
                });
            }
        });
    }
}