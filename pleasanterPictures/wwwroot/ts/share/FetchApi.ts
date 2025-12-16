export class FetchApi {
    send = async (
        url: string,
        method: string,
        headers: { [key: string]: string },
        body: any,
        responseKind: string = "json",
        needResponseData: boolean = true
    ) => {
        let request;

        if (method == "GET") {
            request = new Request(url, {
                method: method,
                headers: headers
            });
        } else {
            request = new Request(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            });
        }

        ManageLoadElement.set();

        const response = await fetch(request).catch(e => { throw e });

        if (!response.ok) {
            ManageLoadElement.remove();
            throw new Error(response.statusText);
        }

        if (!needResponseData) {
            ManageLoadElement.remove();
            return;
        }

        switch (responseKind) {
            case "json":
                return await this.fetchResonse(response.json()).catch(e => { throw e });
            case "text":
                return await this.fetchResonse(response.text()).catch(e => { throw e });
        }
    }

    private async fetchResonse(response: Promise<any>) {
        return await response.then(data => {
            return data;
        })
        .catch(error => {
            // エラー処理
            console.log(error);
            throw error;
        })
        .finally(() => {
            ManageLoadElement.remove();
        });
    }
}

class  ManageLoadElement {
    static loadElement = document.getElementById("loading-overlay") as HTMLElement;
    static set = () => {
        if (this.loadElement == null) {
            return;
        }
        this.loadElement.classList.remove("nodisplay");
    }

    static remove = () => {
        if (this.loadElement == null) {
            return;
        }
        this.loadElement.classList.add("nodisplay");
    }
}