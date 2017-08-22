Ext.define('MyApp.controller.Basket', {
    extend: 'Ext.app.Controller',

    onCreateOrderClick: function(button, e, eOpts) {
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                Ext.create("Ext.Window", {
                    title: "Создание заказа",
                    height: 150,
                    width: 200,
                    modal: true,
                    bodyStyle: "padding:10px",
                    html: "Заказ создан",
                    buttons: [
                        { text: "Хорошо", handler: function()
                         {
                             this.up('window').destroy();
                         }
                        }
                    ]
                }).show();
                Ext.getStore('Positions').reload();
            }
            else
            {
                Ext.create("Ext.Window", {
                    title: "Создание заказа",
                    height: 150,
                    width: 200,
                    modal: true,
                    bodyStyle: "padding:10px",
                    html: "Ошибка создания заказа",
                    buttons: [
                        { text: "Хорошо", handler: function()
                         {
                             this.up('window').destroy();
                         }
                        }
                    ]
                }).show();

            }
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/Orders/CreateOrder",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    init: function(application) {
        this.control({
            "#createOrder": {
                click: this.onCreateOrderClick
            }
        });
    }

});
