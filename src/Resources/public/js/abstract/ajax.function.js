export default class AjaxFunction {

    /**
     *
     * @param {string} url
     * @param {string} method
     * @param {array|object} data
     * @param {mixed} context
     * @param {callable} success
     * @param {callable} error
     * @returns {*}
     */
    static send(url, method = 'get', data=[], context = null, success=null, error=null) {
        return $.ajax({
            url: url,
            type: method,
            data: data,
            context: context,
            success: success,
            error: error,
        });
    }

    static sendConfigured(configuration) {
        return AjaxFunction.send(
            configuration.url,
            configuration.method,
            configuration.data,
            configuration.context,
            configuration.success,
            configuration.error,
        );
    }
}