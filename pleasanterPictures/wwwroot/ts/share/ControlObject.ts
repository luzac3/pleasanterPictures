export class ControlObject {
    static copyObject = (object: HTMLElement) => {
        const cloneObject = object.cloneNode(true);
        object.after(cloneObject);
    }
    static elaseObject = (object: HTMLElement) => {
        object.remove();
    }
}