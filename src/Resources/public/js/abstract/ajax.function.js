export default class AjaxFunction {

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

}