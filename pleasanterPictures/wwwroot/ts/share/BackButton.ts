export class BackButton {
    Buck = () => {
        const element = document.getElementById('back') as HTMLButtonElement;

        element.addEventListener("click", () => {
            history.back();
        });
    }
}