import TableListingComponent from "./table-listing.component";
import EntityApiFunction from "../abstract/entity-api.function";
import FlashHintFunction from "../abstract/flash-hint.function";
import EventManager from "EventManager";

/**
 <table class="entity-listing">[...]</table>

 */

export default class EntityListingComponent extends TableListingComponent {

    static options = {
        usePagination: 1,
        itemsPerPage: 10,
        currentPage: 1,
        entityName: '',
        entityCriteria: '{}'
    }

    init() {
        super.init();

        EntityApiFunction.search(this.options.entityName, this.onSearchResult.bind(this), JSON.parse(this.options.entityCriteria));
        this.templateElement = document.getElementById('entity-row');
    }

    onSearchResult(answer) {
        if(!answer.success) {
            FlashHintFunction.createFlashHint('Failed loading entity data', 'error');
            return;
        }

        let entityData = answer.data.apiResult;

        this.refreshListing(entityData);
    }

    refreshListing(rowsData) {

        this.tbody.textContent = '';
        for(let rowData of rowsData) {
            this.tbody.appendChild(this.createNewRow(rowData));
        }

        EventManager.publish('pluginmanager.startInitializeScope', [this._element.parentElement]);
    }

    createNewRow(data) {
        let row = document.importNode(this.templateElement.content, true);

        // info: debug: should be done with refreshing the pagination
        row.querySelector('tr').classList.add('visible');

        // row selection
        let rowSelection = row.querySelector('.row-selection-column');
        if(rowSelection) {
            let rand = Math.floor(Math.random()*9999999);
            let selectionInput = rowSelection.querySelector('input');
                selectionInput.id = 'row_select_'+rand;
                selectionInput.addEventListener('change', this.onRowToggled.bind(this));
            rowSelection.querySelector('label').setAttribute('for', 'row_select_'+rand);
        }

        // data colums
        let columns = row.querySelectorAll('td[data-data-type]');

        for(let column of columns) {
            let type = column.dataset.dataType;
            let value = data[column.innerText] ?? '-';
            column.innerText = '';

            if(type === 'hidden') {
                column.style.display = 'none';
            }


            let columnValue = '';
            switch(type) {
                case 'datetime':
                    columnValue = '<span>'+value.date+'</span>';
                    break;
                case 'bool':
                    let randId = 'row_bool_'+Math.floor(Math.random()*9999999);
                    columnValue =  `<input type="checkbox" id="${randId}" ${value ? 'checked="checked"' : ''}/>` +
                                    `<label for="${randId}"></label>`;
                    break;
                default:
                    columnValue = '<span>'+value+'</span>';

                    if(column.dataset.hrefTemplate) {
                        let href = column.dataset.hrefTemplate;

                        let partNames = JSON.parse(column.dataset.hrefTemplateParts);
                        for(let part of partNames) {
                            href = href.replace(/{}/, data[part]);
                        }

                        columnValue = `<a href="${href}">` + columnValue + '</a>';
                    }
                    break;
            }

            column.innerHTML = columnValue;
        }

        return row;
    }



}