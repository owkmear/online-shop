Ext.define('MyApp.controller.Accounts', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'loginPanel',
            selector: 'mainviewport #loginPanel'
        },
        {
            ref: 'logoutPanel',
            selector: 'mainviewport #logoutPanel'
        }
    ],

    showLogin: function(button, e, eOpts) {
        var login = Ext.create("widget.loginform");
        login.show();
    },

    doLogin: function(button, e, eOpts) {
        me = this;
        var form = button.up('form'),				// Login form
            formWindow = button.up('window'),		// Login form window
            values = form.getValues(),				// Form values
            loginPanel = this.getLoginPanel(),		// Panel shown when logged out
            logoutPanel = this.getLogoutPanel();	// Panel shown when logged in

        // Success
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);

            // TODO: переписать на проверку отсутствия значений, напр. access

            var success = false;
            if (result.success === true)
                    success = true;
            var error = "";
            if (result.errors !== undefined)
                error = result.errors[0];
            if (success === true)
                {
                    //console.log("Вход выполнен успешно");

                    me.application.fireEvent("changeCsrfTokens");

                    loginPanel.hide();
                    logoutPanel.show();
                    formWindow.destroy();

                    me.application.fireEvent("applyRights");
                }
            else
                {
                    Ext.create("Ext.Window", {
                     title: "Ошибка входа",
                     modal: true,
                        //cls: 'x-window yellow-window',
                     //bodyStyle:"padding: 10px; background: #FF0000; background-color: #FFFFFF",
                     bodyStyle: "padding:10px",
                        html: error,
                     buttons: [
                         { text: "Хорошо", handler: function()
                             {
                                 this.up('window').destroy();
                             }
                         }
                            ]
                    }).show();
                    Ext.getCmp('LoginFormPasswordField').setValue('');
                }
        };

        // Failure
        var failureCallback = function(resp, ops) {
            //Ext.Msg.alert("Ошибка входа", "Сервер недоступен");
            Ext.create("Ext.Window", {
                title: "Ошибка входа",
                modal: true,
                bodyStyle: "padding:10px",
                html: "Сервер недоступен",
                buttons: [
                    { text: "Хорошо", handler: function()
                     {
                         this.up('window').destroy();
                     }
                    }
                ]
            }).show();
        };

        var UserName = values.identity;
        var Password = values.password;
        var RememberMe = false;
        if (values.rememberme == "on")
            RememberMe = true;

        Ext.Ajax.request({
            //async: false,
            method: 'POST',
            url: "/Account/JsonLogin",
            //url: "http://localhost:50506/Account/Login",
            timeout: 10000,
            params: {
                /*"__RequestVerificationToken": "eG-tARCIxr9gyqcvJSYaK4ihLTibkRUC_2IJnm7pkZEfdPXULFvCS4wYGNBJETCVtJz_haSbjWFEcfDBcbF1r1cPb3_x999p_n_Df9JdOUk1",
                        "UserName": "Admin",
                        "Password": "123456",*/
                "UserName": UserName,
                "Password": Password,
                "RememberMe": RememberMe
            },
            success: successCallback,
            failure: failureCallback
        });

    },

    doLogout: function(button, e, eOpts) {
        //this.application.fireEvent("getAntiForgeryTokens");
        me = this;

        var form = button.up('form'),				// Login form
            formWindow = button.up('window'),		// Login form window
            loginPanel = this.getLoginPanel(),		// Panel shown when logged out
            logoutPanel = this.getLogoutPanel();	// Panel shown when logged in

        // Success
        var successCallback = function(resp, ops) {

            var result = Ext.decode(resp.responseText);
            //console.log(result.success);
            if (result.success === true)
            {
                //console.log("Выход выполнен успешно");
                logoutPanel.hide(); // Show logout panel
                loginPanel.show(); // Hide login panel

                me.application.fireEvent("applyRights");
                me.application.fireEvent("changeCsrfTokens");
            }
            else
            {}
        };

        // Failure
        var failureCallback = function(resp, ops) {
            Ext.Msg.alert("Login Failure", "Сервер недоступен");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/Account/LogOff",
            timeout: 30000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            /*params: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },*/
            success: successCallback,
            failure: failureCallback
        });
    },

    showRegister: function(button, e, eOpts) {
        // Create new register form window
        var register = Ext.create("widget.registerform");

        // Show window
        register.show();
    },

    doRegister: function(button, e, eOpts) {
        me = this;
        //this.application.fireEvent("getAntiForgeryTokens");

        //Ответ от сервера получен
        var successRegister = function(resp, ops) {

            var result = Ext.decode(resp.responseText);
            var success = false;
            if (result.success === true)
                success = true;

            // Пользователь создан на сервере
            if (success === true)
            {
                loginPanel.hide(); // Hide panel
                logoutPanel.show(); // Show logout panel
                formWindow.destroy(); // Close window

                var successGetCurrentUser = function(resp, ops)
                {
                    var result = Ext.decode(resp.responseText);
                    Ext.getCmp('DisplayUsername').setText(result.username);
                    if (result.roles.length > 0)
                    {
                        var roles = "";
                        for (var i = 0; i < result.roles.length - 1; i++)
                            roles += result.roles[i] + ", ";
                        roles += result.roles[result.roles.length - 1];
                        Ext.getCmp('DisplayRoles').setText(roles);

                        me.application.fireEvent("changeCsrfTokens");
                    }
                    else
                        Ext.getCmp('DisplayRoles').setText("");
                };
                Ext.Ajax.request({
                    method: 'POST',
                    url: "/Account/GetCurrentUser",
                    timeout: 10000,
                    success: successGetCurrentUser
                });
            }

            // Ошибка создания пользователя на сервере
            else
            {
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
                    title: "Ошибка регистрации",
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

                // Очистка полей пароля в форме регистрации
                Ext.getCmp('RegisterFormConfirmPasswordField').setValue('');
                Ext.getCmp('RegisterFormPasswordField').setValue('');
            }

        };

        // Нет ответа от сервера
        var failureRegister = function(resp, ops) {

            // Show registration failure error
            Ext.Msg.alert("Registration Failure", "Сервер не ответил");

        };

        var form = button.up('form'),				// Register form
            formWindow = button.up('window'),		// Register form window
            values = form.getValues(),				// Form values
            loginPanel = this.getLoginPanel(),		// Panel shown when logged out
            logoutPanel = this.getLogoutPanel();	// Panel shown when logged in

        var UserName = values.UserName;
        var Password = values.Password;
        var ConfirmPassword = values.ConfirmPassword;

        Ext.Ajax.request({
            method: 'POST',
            url: "/Account/JsonRegister",
            timeout: 10000,
            headers: {
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken
            },
            params: {
                "UserName": UserName,
                "Password": Password,
                "ConfirmPassword": ConfirmPassword/*,
                "__RequestVerificationToken": MyApp.application.Globals.csrfToken*/
            },
            success: successRegister,
            failure: failureRegister
        });
    },

    init: function(application) {
        this.control({
            "mainviewport #loginButton": {
                click: this.showLogin
            },
            "loginform #loginButton": {
                click: this.doLogin
            },
            "mainviewport #logoutButton": {
                click: this.doLogout
            },
            "mainviewport #registerButton": {
                click: this.showRegister
            },
            "registerform #registerButton": {
                click: this.doRegister
            }
        });
    }

});
