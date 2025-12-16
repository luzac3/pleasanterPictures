export class Counter {
    SetCounter = () => {
        const counterElements = Array.from(document.getElementsByClassName('counter'));
        counterElements.forEach((element) => {
            const counterElement = <HTMLInputElement>element;
            const incrementButtonElement = <HTMLButtonElement>counterElement.querySelector('.counter_increment');
            const decrementButtonElement = <HTMLButtonElement>counterElement.querySelector('.counter_decrement');

            if (!counterElement) {
                return;
            }

            this.HandlePress(counterElement, incrementButtonElement, 1);
            this.HandlePress(counterElement, decrementButtonElement, -1);
        });
    }

    private ChangeValue = (counterElement: HTMLInputElement, delta: number) => {
        const decrementNumberElement = <HTMLInputElement>counterElement.querySelector('.counter_number');
        const max = parseInt(counterElement.max) || 100;
        const min = parseInt(counterElement.min) || 0;

        let value = parseInt(decrementNumberElement.value) || 0;
        value += delta;
        value = Math.max(min, Math.min(max, value));
        decrementNumberElement.value = String(value);

        const event = new Event('change', { bubbles: true });
        decrementNumberElement.dispatchEvent(event);
    }

    private HandlePress = (counterElement: HTMLInputElement, buttonElement: HTMLButtonElement, delta: number) => {
        const interval = 200; // 長押し時の間隔(ms)
        let timer: ReturnType<typeof setTimeout>;
        let step = 1;
        let longPressStep = 5;

        buttonElement.addEventListener('mousedown', () => {
            step = 1;
            this.ChangeValue(counterElement, delta);

            const repeat = () => {
                step = longPressStep;
                this.ChangeValue(counterElement, delta * step);
                timer = setTimeout(repeat, interval);
            }; // 0.5秒後に長押し判定
            timer = setTimeout(repeat, 500);
        });

        buttonElement.addEventListener('mouseup', () => {
            clearTimeout(timer);
        });

        buttonElement.addEventListener('mouseleave', () => {
            clearTimeout(timer);
        });

        buttonElement.addEventListener('touchend', () => {
            clearTimeout(timer);
        });
    }
}