Ext.define('MyApp.controller.CustomerItems', {
    extend: 'Ext.app.Controller',

    addItemToBasket: function(itemId) {
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {}
            else
            {}
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: "/Orders/AddItemToBasket",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            params: {
                "ItemId": itemId
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    deleteAllItemFromBasket: function(positionId) {
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                Ext.getStore('Positions').reload();
                //Ext.getStore('Positions').reload();
                //MyApp.app.getController('AdditionalInformation').updateBasket();
            }
            else
            {

            }
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: "/Orders/DeleteAllPositionFromBasket",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            params: {
                "PositionId": positionId
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    deleteItemFromBasket: function(itemId) {
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                //Ext.getStore('Positions').reload();
            }
            else
            {

            }
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: "/Orders/DeletePositionFromBasket",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            params: {
                "ItemId": itemId
            },
            success: successCallback,
            failure: failureCallback
        });
    }

});
