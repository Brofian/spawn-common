import Plugin from "Plugin";
import StringFunction from "../abstract/string.function";
import EntityApiFunction from "../abstract/entity-api.function";

/**
    <table data-draggable-row-entity=""
           data-id-column=""
    >[...]</table>
 */

export default class DraggableTableComponent extends Plugin {

    static options = {
        draggableRowEntity: null,
        idColumn: null
    }

    init() {
        let rows = this._element.querySelectorAll('tbody tr td.row-position-column:not(.js-drag-processed)');
        for(let row of rows) {
            row.classList.add('js-drag-processed');
            row.addEventListener('mouseenter', this.onDragElementHover.bind(this));
            row.addEventListener('mouseleave', this.onDragElementLeave.bind(this));
            row.parentElement.addEventListener('dragstart', this.onDragStart.bind(this));
            row.parentElement.addEventListener('dragend', this.onDragEnd.bind(this));
            row.parentElement.addEventListener('dragover', this.onDragOver.bind(this, row.parentElement));
        }
    }

    onPluginElementUpdate() {
        this.init();
    }

    afterCompleteDragDrop() {
        let idsElements = this._element.querySelectorAll(`tbody tr td[data-key=${this.options.idColumn}]`);

        let data = {};
        let counter = 0;
        for(let el of idsElements) {
            data[counter] = {
                id: StringFunction.trim(el.textContent),
                position: counter++
            };
        }

        let payload = {
            data: data
        };

        EntityApiFunction.upsert(this.options.draggableRowEntity, this.onUpsertComplete.bind(this), payload);
    }

    onUpsertComplete(result) {
        //console.log('upsert complete', result);
    }

    onDragStart(event) {
        this.draggedRow = event.target;
        event.target.classList.add('js-dragged-row');
    }

    onDragOver(tr, event) {
        if(tr.classList.contains('js-dragged-over') || tr.classList.contains('js-dragged-row')) {
            // is already initialized
        }
        else {
            tr.classList.add('js-dragged-over');
            this.resetFakeRows();

            // generate fake rows
            if(tr !== this.draggedRow.nextElementSibling) {
                tr.parentElement.insertBefore(this.createFakeRow(), tr);
            }

            if(tr.nextElementSibling !== this.draggedRow) {
                tr.parentElement.insertBefore(this.createFakeRow(), tr.nextElementSibling);
            }
        }
    }

    onDragOverPlaceholder(tr, event) {
        event.preventDefault();
        tr.classList.add('dragover');
    }

    onDragLeavePlaceholder(tr, event) {
        tr.classList.remove('dragover');
    }

    createFakeRow() {
        let fakeRow = document.createElement('tr');
        fakeRow.innerHTML = '<td>&nbsp;</td>';
        fakeRow.classList.add('js-fake-table-row');
        fakeRow.classList.add('visible');
        fakeRow.dataset.hoverText = 'Drop';
        fakeRow.addEventListener('drop', this.onDrop.bind(this));
        fakeRow.addEventListener('dragover', this.onDragOverPlaceholder.bind(this, fakeRow));
        fakeRow.addEventListener('dragleave', this.onDragLeavePlaceholder.bind(this, fakeRow));
        return fakeRow;
    }

    onDragEnd(event) {
        event.target.classList.remove('js-dragged-row');
        this.draggedRow = null;
        this.resetFakeRows();
    }

    onDrop(event) {
        event.preventDefault();
        event.target.parentElement.insertBefore(this._element.querySelector('.js-dragged-row'), event.target);

        this.afterCompleteDragDrop();
    }

    resetFakeRows() {
        // remove fake rows
        for(let fakeRow of this._element.querySelectorAll('tbody tr.js-fake-table-row')) {
            fakeRow.parentElement.removeChild(fakeRow);
        }

        this._element.querySelectorAll('tbody tr.js-dragged-over').forEach((el) => {
            el.classList.remove('js-dragged-over');
        });
    }

    onDragElementHover(event) {
        event.target.parentElement.setAttribute('draggable', 'true');
    }

    onDragElementLeave(event) {
        event.target.parentElement.setAttribute('draggable', 'false');
    }

}