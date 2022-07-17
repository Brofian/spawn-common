export default class BubbleHintFunction {

    static bubbleHintClass = 'bubble-hint';

    /**
     * Creates a bubble hint
     * @param text
     * @param element
     * @param type
     */
    static createBubbleHint(text, element, type = 'bubble') {

        let bubbleHint = BubbleHintFunction.__createBubbleHintElement(text, type, element);

        //remove bubblehint on click
        bubbleHint.addEventListener('click', this.__onBubbleHintClick.bind(null, bubbleHint, element));

        //search or create flash Container and append new item
        document.body.appendChild(bubbleHint);
    }

    static __onBubbleHintClick(bubbleHint, element, event) {
        element.classList.remove('invalid');
        bubbleHint.parentElement.removeChild(bubbleHint);
    }

    static removeAllBubbleHints(scope = document) {
        let bubbleHints = scope.querySelectorAll('.'+BubbleHintFunction.bubbleHintClass);
        for(let bubbleHint of bubbleHints) {
            bubbleHint.parentElement.removeChild(bubbleHint);
        }
    }

    static __createBubbleHintElement(text, type, element) {
        let bubbleHint = document.createElement('div');
        bubbleHint.classList.add(BubbleHintFunction.bubbleHintClass);
        bubbleHint.classList.add(BubbleHintFunction.bubbleHintClass + '-' + type);

        let elBoundRect = element.getBoundingClientRect();
        bubbleHint.style.left = Math.round(elBoundRect.left) + "px";
        bubbleHint.style.top = Math.round(elBoundRect.top) + "px";
        bubbleHint.style.maxWidth = 'calc(100vw - 3rem - ' + bubbleHint.style.left + ')';

        let message = text.substring(0, 120);
        if(text.length > 120) {
            message += '...';
        }
        bubbleHint.innerHTML = '<i class="icon icon-circle-info"></i>' + message;

        return bubbleHint;
    }
}