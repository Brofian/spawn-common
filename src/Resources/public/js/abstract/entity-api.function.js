import AjaxFunction from "./ajax.function";

export default class EntityApiFunction {

    static url = '/backend/api/v1/{entityName}/';

    static search(entityName, callback) {
        this.__sendApiRequest(entityName, 'GET', callback, {abc: 123});
    }

    static delete(entityName, callback) {
        this.__sendApiRequest(entityName, 'DELETE', callback, {abc: 125});
    }

    static upsert(entityName, callback) {
        this.__sendApiRequest(entityName, 'POST', callback, {abc: 124});
    }

    /**
     * @internal
     * @param entityName
     * @param method
     * @param callback
     * @param data
     * @private
     */
    static __sendApiRequest(entityName, method, callback, data) {
        AjaxFunction.send(
            EntityApiFunction.url.replace('{entityName}', entityName),
            method,
            data,
            null,
            this.__responseJsonProxy.bind(null, callback),
            this.__responseJsonProxy.bind(null, callback, null)
        );
    }

    /**
     * @internal
     * @param callback
     * @param response
     * @private
     */
    static __responseJsonProxy(callback, response = null) {
        if(!response) {
            console.error('Problems fetching from API endpoint');
            callback({
                success: false
            });
            return;
        }

        let data = {};
        try {
            data = JSON.parse(response);
        }
        catch (error) {
            console.error('Recieved invalid data from API endpoint request');
            callback({
                success: false
            });
            return;
        }

        callback(data);
    }

}