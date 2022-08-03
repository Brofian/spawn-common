import Plugin from "Plugin";

/**
 <table class="table-listing">[...]</table>

 */

export default class TableListingComponent extends Plugin {

    init() {
        let toggleAllBtn = this._element.querySelector('thead input.toggleAllRows[type=checkbox]');
        if(toggleAllBtn) {
            toggleAllBtn.addEventListener('change', this.onToggleAllRowSelections.bind(this));
        }
        console.log(toggleAllBtn);
    }

    onToggleAllRowSelections(event) {
        let selectors = this._element.querySelectorAll('tbody input.toggleRow[type=checkbox]');
        for(let s of selectors) {
            s.checked = event.target.checked;
        }
    }


}