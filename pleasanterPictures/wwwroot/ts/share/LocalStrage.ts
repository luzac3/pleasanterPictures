export class LocalStrage {
    static set(Obj_name: string, Obj: Object) {
        window.sessionStorage.setItem(Obj_name, JSON.stringify(Obj));
    }

    static get(objName: string) {
        const obj = window.sessionStorage.getItem(objName);
        if (!this.check(objName)) {
            return false;
        }
        if (obj === null) {
            throw new Error("未知のエラー")
        }
        const parser = function (_k: string, v: Object) { return v.toString().indexOf('function') === 0 ? eval('(' + v + ')') : v };

        return JSON.parse(obj, parser);
    }

    static check(Obj_name: string) {
        if (window.sessionStorage.getItem(Obj_name)) {
            return true;
        } else {
            return false;
        }
    }
    static delete() {
        window.sessionStorage.clear();
    }
}