import Plugin from "Plugin";

/**
 <table class="table-listing">[...]</table>

 */

export default class TableListingComponent extends Plugin {

    static options = {
        usePagination: 1,
        itemsPerPage: 10,
        currentPage: 1,
    }

    init() {
        let toggleAllBtn = this._element.querySelector('thead input.toggleAllRows[type=checkbox]');
        if(toggleAllBtn) {
            toggleAllBtn.addEventListener('change', this.onToggleAllRowSelections.bind(this));
        }

        this.initPagination();
    }

    onToggleAllRowSelections(event) {
        let selectors = this._element.querySelectorAll('tbody tr.visible input.toggleRow[type=checkbox]');
        for(let s of selectors) {
            s.checked = event.target.checked;
        }
    }

    updateTableItemVisibility() {
        let rows = this._element.querySelectorAll('tbody tr');
        rows.forEach((el) => el.classList.remove('visible'));

        let from = this.options.itemsPerPage * (this.options.currentPage-1);
        let to = this.options.itemsPerPage * this.options.currentPage - 1;

        if(from > rows.length) {
            from = rows.length;
        }
        if(to > rows.length) {
            to = rows.length;
        }

        for(let i = from; i < to; i++) {
            rows[i].classList.add('visible');
        }

    }

    initPagination() {
        if(this.options.usePagination != 0) {
            this.updateTableItemVisibility();

            this.pagination = this._element.nextElementSibling;
            if(!this.pagination || !this.pagination.classList.contains('pagination')) {
                console.error('no valid pagination element found for table');
                return;
            }

            this.paginationButtons = this.pagination.querySelectorAll('.pagination-page');
            for(let btn of this.paginationButtons) {
                btn.addEventListener('click', this.onPaginationClicked.bind(this));
            }
            this.paginationFirstButton = this.pagination.querySelector('.pagination-first');
            this.paginationFirstButton.addEventListener('click', this.onPaginationClicked.bind(this));
            this.paginationLastButton = this.pagination.querySelector('.pagination-last');
            this.paginationLastButton.addEventListener('click', this.onPaginationClicked.bind(this));
        }
        else {
            this._element.querySelectorAll('tbody tr').forEach((el) => el.classList.add('visible'));
        }
    }

    onPaginationClicked(event) {
        if(event && event.target && event.target.dataset && event.target.dataset.pageId) {
            let pageId = event.target.dataset.pageId;

            if(pageId !== this.options.currentPage) {
                this.options.currentPage = pageId;

                // update visible table rows
                this.updateTableItemVisibility();

                // hide and disable all pagination buttons
                this.paginationButtons.forEach((el) => el.classList.remove('active'));
                this.paginationButtons.forEach((el) => el.classList.remove('visible'));


                this.paginationButtons[pageId-1].classList.add('active');
                let availablePages = this.paginationButtons.length;


                // show / hide pagination first button
                if(pageId == 1) this.paginationFirstButton.classList.remove('visible');
                else            this.paginationFirstButton.classList.add('visible');

                // show / hide pagination last button
                if(pageId == availablePages)    this.paginationLastButton.classList.remove('visible');
                else                            this.paginationLastButton.classList.add('visible');


                // calculate visible button range
                let visibleFrom = Math.max(1,this.options.currentPage-2);
                let visibleTo = Math.min(availablePages,this.options.currentPage-(-2));

                // fix visible button range for edge cases
                if(this.options.currentPage < 3)                        visibleTo = Math.min(availablePages, 5);
                else if(this.options.currentPage > availablePages-2)    visibleFrom = Math.max(1, availablePages-4);


                // show button range
                for(let i = visibleFrom; i <= visibleTo; i++) {
                    this.paginationButtons[i-1].classList.add('visible');
                }
            }
        }
    }

}