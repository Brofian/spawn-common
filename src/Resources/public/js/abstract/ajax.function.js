export default class AjaxFunction {

    static send(url, method = 'get', data=[], context = null, success=null, error=null) {

        return $.ajax({
            url: url,
            type: method,
            data: data,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            context: context,
            success: success,
            error: error,
        });
    }

}