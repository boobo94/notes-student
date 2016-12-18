
export class extraHandler {
    constructor() {

    }

    static compareObj(obj1, obj2) {
        var diff = {};
        for (var i in obj1) {
            if (!this.compareVal(obj1[i], obj2[i])) {
                diff[i] = obj1[i];
            }
        }
        return diff
    }

    static compareVal(val1, val2) {
        var isSame = true;
        for (var p in val1) {

            if (typeof (val1[p]) === "object") {
                var objectValue1 = val1[p],
                    objectValue2 = val2[p];
                for (var value in objectValue1) {
                    isSame = this.compareVal(objectValue1[value], objectValue2[value]);
                    if (isSame === false) {
                        return false;
                    }
                }
            } else {
                if (val1 !== val2) {
                    isSame = false;
                }
            }
        }
        return isSame;
    }

}