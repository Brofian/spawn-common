import Plugin from "Plugin";

/**
 <div class="js-stick-detector" style="position: sticky; top: 0;"></div>

 */

export default class StickDetectorComponent extends Plugin {

    options = {
        stickyClass: 'is-sticking'
    }

    init() {
        this.observer = new IntersectionObserver(this.onIntersectionObserverUpdate.bind(this), {
            threshold: 0.0
        });
        this.observer.observe(this._element);
    }

    onIntersectionObserverUpdate(event) {
        console.log(event);
    }
}