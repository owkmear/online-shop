Ext.define('MyApp.controller.AdditionalInformation', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'additionalInformation',
            selector: '#additionalInformation'
        }
    ],

    updateBasket: function() {
        MyApp.app.getController('AdditionalInformation').getBasketInformation();
    },

    updateCustomerItems: function() {
        MyApp.app.getController('AdditionalInformation').getBasketInformation();
    },

    updateGuestItems: function() {
        var additionalInformation = Ext.getCmp('additionalInformation');
        additionalInformation.setText(
            'Каталог товаров',
            false
        );
    },

    getBasketInformation: function() {
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                sum = MyApp.app.getController('Utilities').kopToRub(result.data.sum);
                positionsCount = result.data.total;
                var additionalInformation = Ext.getCmp('additionalInformation');
                additionalInformation.setText(
                    positionsCount + ' товаров ' +
                    ' на ' + sum,
                    false
                );
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
            url: "/Orders/GetBasketInformation",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            success: successCallback,
            failure: failureCallback
        });
    }

});
