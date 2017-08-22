Ext.define('MyApp.controller.CustomerOrders', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'customerOrdersTable',
            selector: '#customerOrdersTable'
        }
    ],

    onCancelOrderClick: function(button, e, eOpts) {
        var store = Ext.getStore('CustomerOrders');

        var record = this.getCustomerOrdersTable().getSelectionModel().getSelection()[0];
        var orderId = record.raw.OrderId;
        var orderDate = MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.OrderDate);
        var cancelOrderForm = Ext.create("widget.cancelOrderForm");

        // Загрузка данных
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {

                var positions = [];
                var sum = 0;

                var discount = result.info.Discount;

                result.data.forEach(function(entry){
                    sum += (entry.Price * entry.ItemsCount);
                    positions.push(
                        entry.Name + ", " +
                        entry.ItemsCount + " шт. по " +
                        MyApp.app.getController('Utilities').kopToRub(entry.Price));
                });
                var positionsList = MyApp.app.getController('Utilities').arrayToUnorderedList(positions);
                Ext.getCmp("closeOrderPositionInfoList2").setValue(positionsList);
                Ext.getCmp("closeOrderFormSumField2").setValue(
                    MyApp.app.getController('Utilities').kopToRub(sum)
                );
                Ext.getCmp("closeOrderFormOrderDateField2").setValue(orderDate);

                if (discount === 0)
                {
                    Ext.getCmp("closeOrderFormDiscountField2").hide();
                    Ext.getCmp("closeOrderFormDiscountSumField2").hide();
                }
                else
                {
                    Ext.getCmp("closeOrderFormDiscountField2").setValue(discount + "%");
                    var sumWithDiscount = Math.ceil(sum * (100 - discount) / 100);
                    Ext.getCmp("closeOrderFormDiscountSumField2").setValue(
                        MyApp.app.getController('Utilities').kopToRub(sumWithDiscount)
                    );
                }

                cancelOrderForm.down('form').loadRecord(record);
                cancelOrderForm.show();
            }
            else
            {
                console.log("answer: failure");
            }
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };
        Ext.Ajax.request({
            method: 'POST',
            url: "/Positions/GetPositionsByOrderId",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            params: {
                "OrderId": orderId
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    onCancelButtonClick: function(button, e, eOpts) {
        var win    = button.up('window');
        var form   = win.down('form');
        var record = form.getRecord();
        var orderId = record.raw.OrderId;

        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                win.close();
                Ext.create("Ext.Window", {
                    title: "Отмена заказа",
                    height: 150,
                    width: 200,
                    modal: true,
                    bodyStyle: "padding:10px",
                    html: "Заказ отменен",
                    buttons: [
                        { text: "Хорошо", handler: function()
                         {
                             this.up('window').destroy();
                         }
                        }
                    ]
                }).show();
                Ext.getStore('CustomerOrders').reload();
            }
            else
            {
                console.log("Cancel order: failure");
            }
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/Orders/CancelOrder",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            params: {
                "OrderId": orderId
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    init: function(application) {
        this.control({
            "#cancelOrder": {
                click: this.onCancelOrderClick
            },
            "#cancelButton": {
                click: this.onCancelButtonClick
            }
        });
    }

});
