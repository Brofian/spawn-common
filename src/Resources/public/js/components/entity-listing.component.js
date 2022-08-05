import TableListingComponent from "./table-listing.component";
import EntityApiFunction from "../abstract/entity-api.function";
import FlashHintFunction from "../abstract/flash-hint.function";

/**
 <table class="entity-listing">[...]</table>

 */

export default class EntityListingComponent extends TableListingComponent {

    static options = {
        usePagination: 1,
        itemsPerPage: 10,
        currentPage: 1,
        entityType: 'modules'
    }

    init() {
        super.init();

        EntityApiFunction.search(this.options.entityType, this.onSearchResult.bind(this));
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
    }

    createNewRow(data) {
        let row = document.importNode(this.templateElement.content, true);

        // info: debug: should be done with refreshing the pagination
        row.querySelector('tr').classList.add('visible');

        // row selection
        let rowSelection = row.querySelector('.row-selection-column');
        if(rowSelection) {
            let rand = Math.floor(Math.random()*9999999);
            rowSelection.querySelector('input').id = 'row_select_'+rand;
            rowSelection.querySelector('label').for = 'row_select_'+rand;
        }

        // data colums
        let columns = row.querySelectorAll('td[data-data-type]');

        for(let column of columns) {
            let type = column.dataset.dataType;
            let value = data[column.innerText] ?? '-';
            column.innerText = '';
            switch(type) {
                case 'datetime':
                    column.innerHTML = '<span>'+value.date+'</span>';
                    break;
                case 'bool':
                    let randId = 'row_bool_'+Math.floor(Math.random()*9999999);
                    column.innerHTML =  `<input type="checkbox" id="${randId}" ${value ? 'checked="checked"' : ''}/>` +
                                        `<label for="${randId}"></label>`;
                    break;
                default:
                    column.innerHTML = '<span>'+value+'</span>';
                    break;
            }
        }

        return row;
    }



}