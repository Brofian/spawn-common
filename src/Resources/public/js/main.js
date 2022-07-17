import PluginManager from "PluginManager";

import AccordionComponent from "components/accordeon.component";
import AjaxFormComponent from "components/ajax-form.component";

PluginManager.register('accordion.component', AccordionComponent, '.js-accordion');
PluginManager.register('ajax-form.component', AjaxFormComponent, '.js-ajax-form');
