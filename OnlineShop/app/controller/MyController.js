Ext.define('MyApp.controller.MyController', {
    extend: 'Ext.app.Controller',

    onButtonClick: function(button, e, eOpts) {
        // Запрос AntiForgeryTokens
        var successGetAntiForgeryToken = function(resp, ops) {
            console.log("Request AntiForgeryTokens: success");

            var result = Ext.decode(resp.responseText);

            Ext.ns('MyApp.application.Globals');
            MyApp.application.Globals.cookieToken = result.cookieToken;
            MyApp.application.Globals.formToken = result.formToken;

            console.log("cookieToken1: " + MyApp.application.Globals.cookieToken);
            console.log("formToken1: " + MyApp.application.Globals.formToken);

            var successCSRF = function(resp, ops) {
                console.log("Request CSRF: success");

                var result = Ext.decode(resp.responseText);
                console.log(result);
            };
            var failureCSRF = function(resp, ops) {
                console.log("Request CSRF: failure");
            };

            console.log("cookieToken2: " + MyApp.application.Globals.cookieToken);
            console.log("formToken2: " + MyApp.application.Globals.formToken);

            Ext.util.Cookies.set('__RequestVerificationToken', MyApp.application.Globals.cookieToken);

            task = Ext.Ajax.request({
                method: 'POST',
                url: "/ItemTable/CSRFManagerMethod",
                timeout: 30000,
                params: {
                    "__RequestVerificationToken": MyApp.application.Globals.formToken
                },
                success: successCSRF,
                failure: failureCSRF
            });




        };
        var failureGetAntiForgeryToken = function(resp, ops) {
            console.log("Request AntiForgeryTokens: failure");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/ItemTable/GetAntiForgeryToken",
            timeout: 30000,
            success: successGetAntiForgeryToken,
            failure: failureGetAntiForgeryToken
        });
    },

    onButtonClick1: function(button, e, eOpts) {
        this.application.fireEvent("getAntiForgeryTokens");
        console.log("formToken после: " + MyApp.application.Globals.formToken);

        // Обращение к серверу с защитой от CSRF
        var successCSRF = function(resp, ops) {
            console.log("Request CSRF: success");

            var result = Ext.decode(resp.responseText);
            console.log(result);
        };
        var failureCSRF = function(resp, ops) {
            console.log("Request CSRF: failure");
        };

        task = Ext.Ajax.request({
            method: 'POST',
            url: "/ItemTable/CSRFManagerMethod",
            timeout: 30000,
            params: {
                "__RequestVerificationToken": MyApp.application.Globals.formToken
            },
            success: successCSRF,
            failure: failureCSRF
        });
    },

    onMybutton8Click: function(button, e, eOpts) {
        // Обращение к серверу с защитой от CSRF
        var successCSRF = function(resp, ops) {
            console.log("Request CSRF: success");

            var result = Ext.decode(resp.responseText);
            console.log(result);
        };
        var failureCSRF = function(resp, ops) {
            console.log("Request CSRF: failure");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/ItemTable/CSRFManagerMethodHttp",
            timeout: 30000,
            success: successCSRF,
            failure: failureCSRF
        });
    },

    onMybutton9Click: function(button, e, eOpts) {
        var successCSRF = function(resp, ops) {
            console.log("Запрос cookie: success");

            var result = Ext.decode(resp.responseText);
            console.log(result);
        };
        var failureCSRF = function(resp, ops) {
            console.log("Запрос cookie: failure");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/ItemTable/GetHttpCookie",
            timeout: 30000,
            success: successCSRF,
            failure: failureCSRF
        });
    },

    onMybutton10Click: function(button, e, eOpts) {
        var successCSRF = function(resp, ops) {
            console.log("Запрос CSRF: success");

            var result = Ext.decode(resp.responseText);
            console.log(result);
        };
        var failureCSRF = function(resp, ops) {
            console.log("Запрос CSRF: failure");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/ItemTable/CSRFMethod",
            timeout: 30000,
            success: successCSRF,
            failure: failureCSRF
        });
    },

    onMybutton11Click: function(button, e, eOpts) {
        var f = Ext.getCmp('guestItemsFilters').child("#GuestItemsSortByCategoryComboBox");
    },

    ManagerClick: function(button, e, eOpts) {
        var successCallback = function(resp, ops) {
            console.log("Manager success");
        };

        var failureCallback = function(resp, ops) {
            console.log("Manager failure");
        };
        Ext.Ajax.request({
                    method: 'POST',
                    url: "/ItemTable/ManagerMethod",
                    timeout: 30000,
                    success: successCallback,
                    failure: failureCallback
                });
    },

    AnonymouseClick: function(button, e, eOpts) {
        var successCallback = function(resp, ops) {
            var result = Ext.decode(resp.responseText);
            console.log("Anonymouse success");
        };

        var failureCallback = function(resp, ops) {
            console.log("Anonymouse failure");
        };
        Ext.Ajax.request({
                    method: 'POST',
                    url: "/ItemTable/AnonymouseMethod",
                    timeout: 30000,
                    success: successCallback,
                    failure: failureCallback
                });

    },

    CustomerClick: function(button, e, eOpts) {
        var successCallback = function(resp, ops) {
            console.log("Customer success");
        };

        var failureCallback = function(resp, ops) {
            console.log("Customer failure");
            console.log(resp.status);
        };
        Ext.Ajax.request({
                    method: 'POST',
                    url: "/ItemTable/CustomerMethod",
                    timeout: 30000,
                    success: successCallback,
                    failure: failureCallback
                });

    },

    init: function(application) {
        this.control({
            "#mybutton6": {
                click: this.onButtonClick
            },
            "#mybutton7": {
                click: this.onButtonClick1
            },
            "#mybutton8": {
                click: this.onMybutton8Click
            },
            "#mybutton9": {
                click: this.onMybutton9Click
            },
            "#mybutton10": {
                click: this.onMybutton10Click
            },
            "#mybutton11": {
                click: this.onMybutton11Click
            },
            "#ManagerButton": {
                click: this.ManagerClick
            },
            "#AnonimouseButton": {
                click: this.AnonymouseClick
            },
            "#CustomerButton": {
                click: this.CustomerClick
            }
        });
    }

});
