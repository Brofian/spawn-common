export default class InViewFunction {

    static isInView(element) {
        let rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static getPositionFromScreen(element) {
        let rect = element.getBoundingClientRect();

        let windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        let windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        if(rect.top > windowHeight) {
            return 'below';
        }

        if(rect.bottom < 0) {
            return 'above';
        }

        if(rect.left > windowWidth) {
            return 'right';
        }

        if(rect.right < 0) {
            return 'left';
        }

        return 'inside';
    }

}