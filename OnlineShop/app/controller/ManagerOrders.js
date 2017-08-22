Ext.define('MyApp.controller.ManagerOrders', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'confirmOrderButton',
            selector: '#confirmOrderButton'
        },
        {
            ref: 'closeOrderButton',
            selector: '#closeOrderButton'
        },
        {
            ref: 'managerOrdersTable',
            selector: '#managerOrdersTable'
        }
    ],

    onConfirmOrderButtonClick: function(button, e, eOpts) {
        var store = Ext.getStore('ManagerOrders');

        var record = this.getManagerOrdersTable().getSelectionModel().getSelection()[0];
        var orderId = record.raw.OrderId;
        var orderDate = MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.OrderDate);
        var confirmOrderForm = Ext.create("widget.confirmOrderForm");

        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                var positions = [];
                var sum = 0;

                var name = result.info.Name;
                var address = result.info.Address;
                var discount = result.info.Discount;
                //console.log(result.info.Name);

                result.data.forEach(function(entry){
                    sum += (entry.Price * entry.ItemsCount);
                    positions.push(
                        entry.Name + ", " +
                        entry.ItemsCount + " шт. по " +
                        MyApp.app.getController('Utilities').kopToRub(entry.Price));
                });
                var positionsList = MyApp.app.getController('Utilities').arrayToUnorderedList(positions);
                Ext.getCmp("positionInfoList").setValue(positionsList);
                Ext.getCmp("confirmOrderFormSumField").setValue(
                    MyApp.app.getController('Utilities').kopToRub(sum)
                );
                Ext.getCmp("confirmOrderFormOrderDateField").setValue(orderDate);
                Ext.getCmp("confirmOrderFormNameField").setValue(name);
                Ext.getCmp("confirmOrderFormAddressField").setValue(address);

                if (discount === 0)
                {
                    Ext.getCmp("confirmOrderFormDiscountField").hide();
                    Ext.getCmp("confirmOrderFormDiscountSumField").hide();
                }
                else
                {
                    Ext.getCmp("confirmOrderFormDiscountField").setValue(discount + "%");
                    var sumWithDiscount = Math.ceil(sum * (100 - discount) / 100);
                    Ext.getCmp("confirmOrderFormDiscountSumField").setValue(
                        MyApp.app.getController('Utilities').kopToRub(sumWithDiscount)
                    );
                }

                confirmOrderForm.down('form').loadRecord(record);
                confirmOrderForm.show();
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

    onCloseOrderButtonClick: function(button, e, eOpts) {
        var store = Ext.getStore('ManagerOrders');

        var record = this.getManagerOrdersTable().getSelectionModel().getSelection()[0];
        var orderId = record.raw.OrderId;
        var orderDate = MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.OrderDate);
        var shipmentDate = MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.ShipmentDate);
        var confirmOrderForm = Ext.create("widget.closeOrderForm");

        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                var positions = [];
                var sum = 0;

                var name = result.info.Name;
                var address = result.info.Address;
                var discount = result.info.Discount;
                //console.log(result.info.Name);

                result.data.forEach(function(entry){
                    sum += (entry.Price * entry.ItemsCount);
                    positions.push(
                        entry.Name + ", " +
                        entry.ItemsCount + " шт. по " +
                        MyApp.app.getController('Utilities').kopToRub(entry.Price));
                });
                var positionsList = MyApp.app.getController('Utilities').arrayToUnorderedList(positions);
                Ext.getCmp("closeOrderPositionInfoList").setValue(positionsList);
                Ext.getCmp("closeOrderFormSumField").setValue(
                    MyApp.app.getController('Utilities').kopToRub(sum)
                );
                Ext.getCmp("closeOrderFormOrderDateField").setValue(orderDate);
                Ext.getCmp("closeOrderFormNameField").setValue(name);
                Ext.getCmp("closeOrderFormAddressField").setValue(address);
                Ext.getCmp("closeOrderFormShipmentDateField").setValue(shipmentDate);

                if (discount === 0)
                {
                    Ext.getCmp("closeOrderFormDiscountField").hide();
                    Ext.getCmp("closeOrderFormDiscountSumField").hide();
                }
                else
                {
                    Ext.getCmp("closeOrderFormDiscountField").setValue(discount + "%");
                    var sumWithDiscount = Math.ceil(sum * (100 - discount) / 100);
                    Ext.getCmp("closeOrderFormDiscountSumField").setValue(
                        MyApp.app.getController('Utilities').kopToRub(sumWithDiscount)
                    );
                }

                confirmOrderForm.down('form').loadRecord(record);
                confirmOrderForm.show();
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

    onConfirmButtonClick: function(button, e, eOpts) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        var orderId = record.raw.OrderId;
        var shipmentDate = values.ShipmentDate;

        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                console.log("answer: success");
                win.close();
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
            url: "/Orders/ConfirmOrder",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken

            },
            params: {
                "OrderId": orderId,
                "ShipmentDate": shipmentDate
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    onCloseButtonClick: function(button, e, eOpts) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        var orderId = record.raw.OrderId;

        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                win.close();
            }
            else
            {
                console.log("close order: failure");
            }
        };
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Server Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/Orders/CloseOrder",
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
            "#confirmOrderButton": {
                click: this.onConfirmOrderButtonClick
            },
            "#closeOrderButton": {
                click: this.onCloseOrderButtonClick
            },
            "confirmOrderForm #confirmButton": {
                click: this.onConfirmButtonClick
            },
            "#closeButton": {
                click: this.onCloseButtonClick
            }
        });
    }

});
