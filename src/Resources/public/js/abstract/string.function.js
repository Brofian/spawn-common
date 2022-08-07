export default class StringFunction {

    static trim(value, charlist = ' \n\r\t') {
        value = StringFunction.trimRight(value, charlist);
        value = StringFunction.trimLeft(value, charlist);

        return value;
    }

    static trimLeft(value, charlist = ' \n\r\t') {

        let hasRemovedChar = false;
        do {
            hasRemovedChar = false;
            for(let charToRemove of charlist) {
                if(value.charAt(0) === charToRemove) {
                    value = value.substring(1);
                    hasRemovedChar = true;
                    break;
                }
            }
        }
        while(hasRemovedChar);

        return value;
    }

    static trimRight(value, charlist = ' \n\r\t') {

        let hasRemovedChar = false;
        do {
            hasRemovedChar = false;
            for(let charToRemove of charlist) {
                if(value.charAt(value.length-1) === charToRemove) {
                    value = value.substring(0,value.length-1);
                    hasRemovedChar = true;
                    break;
                }
            }
        }
        while(hasRemovedChar);

        return value;
    }

    static isString(value) {
        return (typeof value === 'string' || value instanceof String);
    }
}