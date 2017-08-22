Ext.define('MyApp.controller.Security', {
    extend: 'Ext.app.Controller',

    id: 'security',

    refs: [
        {
            ref: 'sections',
            selector: '#sections'
        },
        {
            ref: 'itemsTab',
            selector: '#itemsTab'
        },
        {
            ref: 'loginPanel',
            selector: 'mainviewport #loginPanel'
        },
        {
            ref: 'logoutPanel',
            selector: 'mainviewport #logoutPanel'
        }
    ],

    processLoggedIn: function(component, eOpts) {
        this.application.fireEvent("applyRights");
    },

    onApplyRights: function() {
        var successGetCurrentUser = function(resp, ops)
        {
            var me = this;

            var loginPanel = Ext.getCmp("loginPanel");
            var logoutPanel = Ext.getCmp("logoutPanel");

            var customersTab = Ext.getCmp('sections').child('#customersTab').tab;
            var managerItemsTab = Ext.getCmp('sections').child('#managerItemsTab').tab;
            var basketTab = Ext.getCmp('sections').child('#basketTab').tab;
            var customerItemsTab = Ext.getCmp('sections').child('#customerItemsTab').tab;
            var managerOrdersTab = Ext.getCmp('sections').child('#managerOrdersTab').tab;
            var guestItemsTab = Ext.getCmp('sections').child('#guestItemsTab').tab;
            var customerOrdersTab = Ext.getCmp('sections').child('#customerOrdersTab').tab;


            var tabs = Ext.getCmp('sections');

            var displayUsername = Ext.getCmp('DisplayUsername');
            var displayRoles = Ext.getCmp('DisplayRoles');

            var result = Ext.decode(resp.responseText);
            //console.log(resp.responseText);

            // Пользователь имеется на сайте
            if (result.success === true)
            {
                MyApp.LoggedInUser = Ext.create('MyApp.model.User',
                    {
                        Username: result.username,
                        Role: result.roles
                    }
                );

                loginPanel.hide();
                logoutPanel.show();

                // Вывод логина и роли
                displayUsername.setText(result.username);
                if (result.roles.length > 0)
                {
                    var roles = "";
                    for (var i = 0; i < result.roles.length - 1; i++)
                        roles += result.roles[i] + ", ";
                    roles += result.roles[result.roles.length - 1];

                    // Вывод роли на русском языке
                    roles = roles.replace("Manager", "Менеджер");
                    roles = roles.replace("Customer", "Заказчик");
                    displayRoles.setText(roles);
                }
                else
                    displayRoles.setText("");

                // Разграничение прав пользователей по ролям
                if (MyApp.LoggedInUser.inRole("Manager"))
                {
                    customersTab.show();
                    managerItemsTab.show();
                    basketTab.hide();
                    customerItemsTab.hide();
                    managerOrdersTab.show();
                    guestItemsTab.hide();
                    customerOrdersTab.hide();

                    tabs.setActiveTab("managerOrdersTab");
                }
                else if (MyApp.LoggedInUser.inRole("Customer"))
                {
                    customersTab.hide();
                    managerItemsTab.hide();
                    basketTab.show();
                    customerItemsTab.show();
                    managerOrdersTab.hide();
                    guestItemsTab.hide();
                    customerOrdersTab.show();

                    var sortByCategory = Ext.getCmp('customerItemsFilters').child("#sortByCategory");
                    sortByCategory.value = 'Все категории';
                    sortByCategory.loadPage();

                    tabs.setActiveTab("customerItemsTab");
                }

                // У пользователя нет роли
                else
                {
                    customersTab.hide();
                    managerItemsTab.hide();
                    basketTab.hide();
                    customerItemsTab.hide();
                    managerOrdersTab.hide();
                    guestItemsTab.show();
                    customerOrdersTab.hide();

                    tabs.setActiveTab("guestItemsTab");
                }
            }

            // Пользователя нет на сайте
            else
            {
                customersTab.hide();
                managerItemsTab.hide();
                basketTab.hide();
                customerItemsTab.hide();
                managerOrdersTab.hide();
                guestItemsTab.show();
                customerOrdersTab.hide();

                Ext.getCmp('managerItemsTable').hide();
                Ext.getCmp('customerItemsTable').hide();
                Ext.getCmp('guestItemsTable').show();
                Ext.getCmp('basketTable').hide();
                Ext.getCmp('managerOrdersTable').hide();
                Ext.getCmp('customersTable').hide();

                var sortByCategory = Ext.getCmp('guestItemsFilters').child("#sortByCategory");
                sortByCategory.value = 'Все категории';
                sortByCategory.loadPage();

                tabs.setActiveTab("guestItemsTab");
            }
        };

        var failureGetCurrentUser = function(resp, ops)
        {
            Ext.create("Ext.Window", {
                title: "Ошибка",
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

        Ext.Ajax.request({
            method: 'POST',
            url: "/Account/GetCurrentUser",
            timeout: 10000,
            success: successGetCurrentUser,
            failure: failureGetCurrentUser
        });
    },

    onGetAntiForgeryTokens: function() {
        var successGetAntiForgeryToken = function(resp, ops) {

            var result = Ext.decode(resp.responseText);

            MyApp.application.Globals.formToken = result.formToken;

        };
        var failureGetAntiForgeryToken = function(resp, ops) {
            console.log("Request AntiForgeryTokens: failure");
        };

        Ext.Ajax.request({
            method: 'POST',
            async: false,
            url: "/ItemTable/GetAntiForgeryToken",
            timeout: 30000,
            success: successGetAntiForgeryToken,
            failure: failureGetAntiForgeryToken
        });
    },

    onChangeCsrfTokens: function() {
        var successChangeCsrfTokens = function(resp, ops) {

            var result = Ext.decode(resp.responseText);
            MyApp.application.Globals.csrfToken = result.formToken;

            // Обновление formToken

            // Stores
            Ext.getStore('Customers').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
            Ext.getStore('ManagerItems').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
            Ext.getStore('CustomerItems').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
            Ext.getStore('ManagerOrders').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
            Ext.getStore('Positions').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
            Ext.getStore('GuestItems').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
            Ext.getStore('CustomerOrders').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };

            // ComboBoxes
            Ext.getStore('SortByCategory').getProxy().headers = { '__RequestVerificationToken': MyApp.application.Globals.csrfToken };
        };
        var failureChangeCsrfTokens = function(resp, ops) {
            console.log("Запрос ChangeCsrfTokens: failure");
        };

        Ext.Ajax.request({
            method: 'POST',
            url: "/ItemTable/ChangeCsrfTokens",
            timeout: 30000,
            success: successChangeCsrfTokens,
            failure: failureChangeCsrfTokens
        });
    },

    init: function(application) {
        this.control({
            "#MainViewport": {
                afterrender: this.processLoggedIn
            }
        });

        application.on({
            applyRights: {
                fn: this.onApplyRights,
                scope: this
            },
            GetAntiForgeryTokens: {
                fn: this.onGetAntiForgeryTokens,
                scope: this
            },
            changeCsrfTokens: {
                fn: this.onChangeCsrfTokens,
                scope: this
            }
        });
    }

});
