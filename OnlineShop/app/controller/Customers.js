Ext.define('MyApp.controller.Customers', {
    extend: 'Ext.app.Controller',

    stores: [
        'Customers'
    ],

    onAddSendButtonClick: function(button, e, eOpts) {
        var form = button.up('form'), // Форма добавления заказчика
            formWindow = button.up('window'), // Окно добавления заказчика
            values = form.getValues(); // Данные с формы
        var store = Ext.data.StoreManager.get("Customer");

        var newAddress = values.address;
        var newCode = values.code;
        var newDiscount = values.discount;
        var newName = values.name;

        store.add(
            {
                Address : newAddress,
                Code : newCode,
                Discount : newDiscount,
                Name : newName
            }
        );

        formWindow.destroy(); // Закрыть окно
    },

    onEditSendButtonClick: function(button, e, eOpts) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        record.set(values);
        win.close();
    },

    onCreateAccountButtonClick: function(button, e, eOpts) {
        var form = button.up('form'),
            formWindow = button.up('window'),
            values = form.getValues();

        var UserName = values.UserName;
        var Password = values.Password;
        var ConfirmPassword = values.ConfirmPassword;
        var Address = values.Address;
        var Code = values.Code;
        var Discount = values.Discount;
        var Name = values.Name;

        var successCreateAccountCallback = function(resp, ops) {

            var result = Ext.decode(resp.responseText);
            if (result.success === true)
            {
                var store = Ext.data.StoreManager.get("Customers");
                store.reload();
                console.log('Create is success');
                formWindow.destroy();
            }
            else
            {
                //console.log('Create is failure');

                // Вывод сообщения об ошибке
                var resultText = "";
                if (result.errors !== undefined)
                {
                    if (result.errors.length > 0)
                    {
                        resultText += "<ul>";
                        for (var i = 0; i < result.errors.length - 1; i++)
                            resultText += "<li>" + result.errors[i] + "</li>";
                        resultText += "<li>" + result.errors[result.errors.length - 1] + "</li></ul>";
                    }
                    else
                        resultText += "Нет данных";
                }
                else
                    resultText += "Нет данных";

                Ext.create("Ext.Window", {
                    title: "Ошибка создания нового пользователя",
                    modal: true,
                    bodyStyle: "padding:10px",
                    html: resultText,
                    buttons: [
                        { text: "Хорошо", handler: function()
                         {
                             this.up('window').destroy();
                         }
                        }
                    ]
                }).show();

                // Очистка полей пароля в форме создания заказчика
                Ext.getCmp('CreateAccountFormPasswordField').setValue('');
                Ext.getCmp('CreateAccountFormConfirmPasswordField').setValue('');
            }
        };

        var failureCreateAccountCallback = function(resp, ops) {
            Ext.Msg.alert("Create account failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/Customers/CreateAccount",
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            timeout: 30000,
            params: {
                "UserName": UserName,
                "Password": Password,
                "ConfirmPassword": ConfirmPassword,
                "Address" : Address,
                "Code" : Code,
                "Discount" : Discount,
                "Name" : Name
            },
            success: successCreateAccountCallback,
            failure: failureCreateAccountCallback
        });
    },

    onAddCustomerButtonClick: function(button, e, eOpts) {
        var customersTableAddForm = Ext.create("widget.addAccountForm");
        customersTableAddForm.show();
    },

    init: function(application) {
        this.control({
            "customersTableAddForm #sendButton": {
                click: this.onAddSendButtonClick
            },
            "editAccountForm #sendButton": {
                click: this.onEditSendButtonClick
            },
            "addAccountForm #createButton": {
                click: this.onCreateAccountButtonClick
            },
            "#addCustomerButton": {
                click: this.onAddCustomerButtonClick
            }
        });
    }

});
