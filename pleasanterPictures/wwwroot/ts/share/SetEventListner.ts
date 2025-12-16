export class SetEventListner {
    static setEvent = (
        parentElement: HTMLElement | undefined | null,
        type: keyof HTMLElementEventMap,
        targetName: string,
        callback: (event: Event) => void,
        atOnce: boolean = false
    ) => {
        const returnHandler = (event: Event) => {
            const targetElement = parentElement?.querySelector(targetName);
            if (event.target == targetElement) {
                callback(event);
                if (atOnce) {
                    parentElement?.removeEventListener(type, returnHandler)
                }
            }
        }
        parentElement?.addEventListener(type, returnHandler);
        return returnHandler;
    }

    static setEventAll = (
        parentElement: HTMLElement | undefined | null,
        type: keyof HTMLElementEventMap,
        targetName: string,
        callback: (event: Event) => void,
        atOnce: boolean = false
    ) => {
        const returnHandler = (event: Event) => {
            const targetElements = parentElement?.querySelectorAll(targetName);
            if (targetElements && Array.from(targetElements).includes(event.target as Element)) {
                callback(event);
                if (atOnce) {
                    parentElement?.removeEventListener(type, returnHandler)
                }
            }
        }
        parentElement?.addEventListener(type, returnHandler);
        return returnHandler;
    }

    static removeEvent = (
        parentElement: HTMLElement | undefined | null,
        type: keyof HTMLElementEventMap,
        handler: (event: Event) => void
    ) => {
        parentElement?.removeEventListener(type, handler);
    }
}