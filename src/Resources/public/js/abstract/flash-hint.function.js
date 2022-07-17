export default class FlashHintFunction {

    /**
     * Creates a flash hint and its container
     * @param text
     * @param type
     * @param lifetime
     * @param fadeOutTime
     */
    static createFlashHint(text, type = 'info', lifetime = 5000, fadeOutTime = 1250) {
        //create Hint
        let flashHint = FlashHintFunction.__createFlashHintElement(type, text);

        //remove flashAfterLifetime (plus fadeout time of 25%)
        window.setTimeout(FlashHintFunction.__removeFlashHint.bind(null, flashHint), lifetime*fadeOutTime);

        //search or create flash Container and append new item
        let flashContainer = FlashHintFunction.__getContainer();
        flashContainer.appendChild(flashHint);
    }


    /**
     * @param flashHint
     * @private
     */
    static __removeFlashHint(flashHint) {
        flashHint.parentElement.removeChild(flashHint);
    }

    /**
     * @param type
     * @param text
     * @returns {HTMLDivElement}
     * @private
     */
    static __createFlashHintElement(type, text) {
        let flashHint = document.createElement('div');
        flashHint.classList.add('flash-hint');
        flashHint.classList.add(type + '-flash');
        let message = text.substring(0, 120);
        if(text.length > 120) {
            message += '...';
        }
        flashHint.innerHTML = '<span class="flash-icon icon-'+type+'"></span>' + message;
        return flashHint;
    }

    /**
     * @returns {HTMLElement}
     * @private
     */
    static __getContainer() {
        let flashContainer = document.getElementById('flash-hint-container');
        if(!flashContainer) {
            flashContainer = document.createElement('div');
            flashContainer.id = 'flash-hint-container';
            document.body.appendChild(flashContainer);
        }
        return flashContainer;
    }

}