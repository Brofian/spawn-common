import PluginManager from "PluginManager";

import AccordionComponent from "./components/accordeon.component";
import AjaxFormComponent from "./components/ajax-form.component";
import StickDetectorComponent from "./components/stick-detector.component";
import TableListingComponent from "./components/table-listing.component";

PluginManager.register('accordion.component', AccordionComponent, '.js-accordion');
PluginManager.register('ajax-form.component', AjaxFormComponent, '.js-ajax-form');
PluginManager.register('stick-detector.component', StickDetectorComponent, '.js-stick-detector');
PluginManager.register('table-listing.component', TableListingComponent, 'table.table-listing');
