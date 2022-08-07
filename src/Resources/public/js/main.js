import PluginManager from "PluginManager";

import AccordionComponent from "./components/accordeon.component";
import AjaxFormComponent from "./components/ajax-form.component";
import StickDetectorComponent from "./components/stick-detector.component";
import TableListingComponent from "./components/table-listing.component";
import EntityListingComponent from "./components/entity-listing.component";
import DraggableTableComponent from "./components/draggable-table.component";

PluginManager.register('accordion.component', AccordionComponent, '.js-accordion');
PluginManager.register('ajax-form.component', AjaxFormComponent, '.js-ajax-form');
PluginManager.register('stick-detector.component', StickDetectorComponent, '.js-stick-detector');
PluginManager.register('table-listing.component', TableListingComponent, 'table.js-table-listing');
PluginManager.register('entity-listing.component', EntityListingComponent, 'table.js-entity-listing');
PluginManager.register('draggable-table.component', DraggableTableComponent, 'table[data-draggable-row-entity]');