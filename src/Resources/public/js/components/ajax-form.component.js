import Plugin from 'Plugin';
import EventManager from "EventManager";
import FlashHintFunction from "../abstract/flash-hint.function";
import BubbleHintFunction from "../abstract/bubble-hint.function";

export default class AjaxFormComponent extends Plugin {

    options = {
        doReload: false
    }

    init() {
        this.reloadOnSuccessData = '';

        this.action = this._element.action;
        this.method = this._element.method;
        this.reloadOnSuccess = !!this.options.doReload;

        if(!['POST', 'GET', 'PUT', 'DELETE'].includes(this.method)) {
            this.method = 'POST';
        }

        this._element.addEventListener('submit', this.onSubmitForm.bind(this), true);
    }

    getFormValues() {
        return this._$element.serialize();
    }

    onSubmitForm(event) {
        event.preventDefault();
        event.stopPropagation();

        //load url content
        $.ajax(
            {
                url: this.action,
                type: this.method,
                data: this.getFormValues(),
                async: true,
                cache: false,
            }
        ).done(
            this.onAjaxFormSubmitResult.bind(this)
        );
    }

    onAjaxFormSubmitResult(data) {
        try {       data = JSON.parse(data);    }
        catch(e) {  data = {success: false};    }

        BubbleHintFunction.removeAllBubbleHints();

        if(data.success) {
            if(data.redirect) {
                window.location.href = data.redirect;
            }
            else if(data.reload || this.reloadOnSuccess) {
                location.reload();
            }

            if(data.invalidFields) {
                // use this option with caution! Never allow any user input to be transmitted via data.script!
                for(let invalidField in data.invalidFields) {
                    if(data.invalidFields.hasOwnProperty(invalidField)) {
                        let invalidElement = this._element.querySelector('[name="'+invalidField+'"]');
                        if(invalidElement) {
                            invalidElement.classList.add('invalid');
                            BubbleHintFunction.createBubbleHint(data.invalidFields[invalidField], invalidElement, 'bubble');
                        }
                    }
                }
            }
        }
        else if(data.errors && data.errors.length) {
            for(let error of data.errors) {
                FlashHintFunction.createFlashHint(error, 'error');
            }
        }
        else {
            FlashHintFunction.createFlashHint('Could not submit form!', 'error');
        }


        if(data.script) {
            // use this option with caution! Never allow any user input to be transmitted via data.script!
            eval(data.script);
        }

        if(data.events && data.events.length) {
            // use this option with caution! Never allow any user input to be transmitted via data.script!
            for(let event of data.events) {
                EventManager.publish(event);
            }
        }
    }

}