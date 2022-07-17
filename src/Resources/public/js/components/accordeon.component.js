import Plugin from "Plugin";
import DeviceManager from "DeviceManager";

/**
    <div class="js-accordion"
        data-body-selector="#mybody"
        data-toggle-selector="#mytoggle"
        data-has-detached="true"
        data-duration="400"
    >
        <div id="mytoggle">Toggle me</div>
        <div id="mybody">Lorem ipsum</div>
    </div>

 */


export default class AccordionPlugin extends Plugin {

    options = {
        bodySelector: null,     // required: for selecting the body/bodies
        toggleSelector: null,   // optional: specify different toggle elements
        duration: null,         // optional: if "true", search for the body and toggle in the whole document
        hasDetachedParts: false,// optional: sets the properties "none" and "auto" after the given time (in ms)
    }

    init() {
        this.toggleStateClass  = 'js-accordion-closed';

        if(!this.searchParts()) {
            console.warn('Skipping incomplete accordion element');
        }
        this.registerEventListeners();
    }

    searchParts() {
        let searchRange = (!!this.options.hasDetachedParts) ? document : this._element;

        //search toggle
        this.toggle = this.options.toggleSelector ? searchRange.querySelector(this.options.toggleSelector) : this._element;

        //search body
        this.body = searchRange.querySelector(this.options.bodySelector);

        this.duration = parseInt(this.options.duration);

        //check elements
        return (this.toggle && this.body);
    }

    registerEventListeners() {
        let event = DeviceManager.isTouchDevice() ? 'touch' : 'click';
        this.toggle.addEventListener(event, this.onToggleClick.bind(this));
    }

    onToggleClick() {
        this.body.style.maxHeight = this.body.scrollHeight + "px";

        if(this.duration) {
            let isOpening = this.body.classList.contains(this.toggleStateClass);
            window.setTimeout(this.onToggleFinish.bind(this, isOpening), this.duration + 10);
        }
        this.body.classList.toggle(this.toggleStateClass);
    }

    onToggleFinish(isOpening) {
        this.body.style.maxHeight = isOpening ? 'auto' : '0px';
    }



}