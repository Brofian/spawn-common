import Plugin from "Plugin";

/**
 <div data-remote-submit="#myForm">Submit</div>
 */


export default class RemoteSubmitComponent extends Plugin {

    options = {
        formSelector: null
    }

    init() {
        if(!this.options.formSelector) {
            return;
        }

        this.form = document.querySelector(this.options.formSelector);
        if(!this.form) {
            return;
        }

        this.form.addEventListener('click', this.onButtonClick.bind(this));
    }

    onButtonClick(event) {
        this.form.submit();
    }


}