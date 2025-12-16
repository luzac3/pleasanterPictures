export class ControlModal {
    setControl = () => {
        Array.from(document.getElementsByClassName("modal_parent")).forEach((element) => {
            const modalParent = element as HTMLElement;
            const modalElement = modalParent.querySelector(".modal_window") as HTMLElement | null;
            const modalWrapper = modalParent.querySelector(".modal_wrapper") as HTMLElement | null;
            const closeBtn = modalParent.querySelector(".close_modal") as HTMLElement | null;
            const openBtn = modalParent.querySelector(".open_modal") as HTMLElement | null;

            if (closeBtn && modalWrapper) {
                closeBtn.addEventListener("click", () => {
                    this.hidden(modalWrapper);
                });
            }

            if (modalWrapper && modalElement) {
                modalWrapper.addEventListener("click", (event: Event) => {
                    if (!modalElement.contains(event.target as HTMLElement)) {
                        this.hidden(modalWrapper);
                    }
                });
            }

            if (openBtn && modalWrapper) {
                openBtn.addEventListener("click", () => {
                    this.show(modalWrapper);
                });
            }
        });
    }

    private show = (modalWrapper: HTMLElement) => {
        modalWrapper.classList.remove("nodisplay");
    }

    private hidden = (modalWrapper: HTMLElement) => {
        modalWrapper.classList.add("nodisplay");
    }
}