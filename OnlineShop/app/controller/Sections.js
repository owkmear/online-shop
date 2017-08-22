Ext.define('MyApp.controller.Sections', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'sections',
            selector: '#sections'
        },
        {
            ref: 'customersTable',
            selector: '#customersTable'
        },
        {
            ref: 'customerItemsTable',
            selector: '#customerItemsTable'
        },
        {
            ref: 'managerOrdersTable',
            selector: '#managerOrdersTable'
        },
        {
            ref: 'basketTable',
            selector: '#basketTable'
        },
        {
            ref: 'guestItemsTable',
            selector: '#guestItemsTable'
        },
        {
            ref: 'customerItemsFilters',
            selector: '#customerItemsFilters'
        },
        {
            ref: 'guestItemsFilters',
            selector: '#guestItemsFilters'
        },
        {
            ref: 'basketFilters',
            selector: '#basketFilters'
        },
        {
            ref: 'customersFilters',
            selector: '#customersFilters'
        },
        {
            ref: 'managerItemsFilters',
            selector: '#managerItemsFilters'
        },
        {
            ref: 'managerOrdersFilters',
            selector: '#managerOrdersFilters'
        },
        {
            ref: 'managerItemsTable',
            selector: '#managerItemsTable'
        },
        {
            ref: 'customerOrdersTable',
            selector: '#customerOrdersTable'
        }
    ],

    onSectionsTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var me = this;
        var customersTable = me.getCustomersTable();
        //var itemsTableNew = me.getItemsTableNew();
        var managerItemsTable = me.getManagerItemsTable();
        var customerItemsTable = me.getCustomerItemsTable();
        var managerOrdersTable = me.getManagerOrdersTable();
        var basketTable = me.getBasketTable();
        var guestItemsTable = me.getGuestItemsTable();
        var customerOrdersTable = me.getCustomerOrdersTable();

        // Фильтры
        var customerItemsFilters = me.getCustomerItemsFilters();
        var basketFilters = me.getBasketFilters();
        var guestItemsFilters = me.getGuestItemsFilters();
        var customersFilters = me.getCustomersFilters();
        var managerItemsFilters = me.getManagerItemsFilters();
        var managerOrdersFilters = me.getManagerOrdersFilters();

        switch (newCard.itemId)
            {
                case "customerOrdersTab": // Мои заказы - customer
                    customersTable.hide();
                    managerItemsTable.hide();
                    customerItemsTable.hide();
                    managerOrdersTable.hide();
                    basketTable.hide();
                    guestItemsTable.hide();
                    customerOrdersTable.show();

                    customerItemsFilters.hide();
                    basketFilters.hide();
                    guestItemsFilters.hide();
                    customersFilters.hide();
                    managerItemsFilters.hide();
                    managerOrdersFilters.hide();

                    Ext.getStore('CustomerOrders').reload();
                    break;
                case "customersTab": // Редактирование пользователей - manager
                    customersTable.show();
                    managerItemsTable.hide();
                    customerItemsTable.hide();
                    managerOrdersTable.hide();
                    basketTable.hide();
                    guestItemsTable.hide();
                    customerOrdersTable.hide();

                    customerItemsFilters.hide();
                    basketFilters.hide();
                    guestItemsFilters.hide();
                    customersFilters.show();
                    managerItemsFilters.hide();
                    managerOrdersFilters.hide();

                    Ext.getStore('Customers').reload();
                    break;
                case "managerItemsTab": // Редактирование товаров - manager
                    customersTable.hide();
                    managerItemsTable.show();
                    customerItemsTable.hide();
                    managerOrdersTable.hide();
                    basketTable.hide();
                    guestItemsTable.hide();
                    customerOrdersTable.hide();

                    customerItemsFilters.hide();
                    basketFilters.hide();
                    guestItemsFilters.hide();
                    customersFilters.hide();
                    managerItemsFilters.show();
                    managerOrdersFilters.hide();

                    Ext.getStore('ManagerItems').reload();
                    break;
                case "customerItemsTab": // Выбор товаров - customer
                    customersTable.hide();
                    managerItemsTable.hide();
                    customerItemsTable.show();
                    managerOrdersTable.hide();
                    basketTable.hide();
                    guestItemsTable.hide();
                    customerOrdersTable.hide();

                    customerItemsFilters.show();
                    basketFilters.hide();
                    guestItemsFilters.hide();
                    customersFilters.hide();
                    managerItemsFilters.hide();
                    managerOrdersFilters.hide();

                    Ext.getStore('CustomerItems').reload();
                    //MyApp.app.getController('AdditionalInformation').updateCustomerItems();

                    customerItemsFilters.show();
                    guestItemsFilters.hide();
                    console.log('section customer');

                    break;
                case "managerOrdersTab": // Заказы - manager
                    customersTable.hide();
                    managerItemsTable.hide();
                    customerItemsTable.hide();
                    managerOrdersTable.show();
                    basketTable.hide();
                    guestItemsTable.hide();
                    customerOrdersTable.hide();

                    customerItemsFilters.hide();
                    basketFilters.hide();
                    guestItemsFilters.hide();
                    customersFilters.hide();
                    managerItemsFilters.hide();
                    managerOrdersFilters.show();

                    Ext.getStore('ManagerOrders').reload();
                    break;
                case "basketTab": // Корзина - customer
                    customersTable.hide();
                    managerItemsTable.hide();
                    customerItemsTable.hide();
                    managerOrdersTable.hide();
                    basketTable.show();
                    guestItemsTable.hide();
                    customerOrdersTable.hide();

                    customerItemsFilters.hide();
                    basketFilters.show();
                    guestItemsFilters.hide();
                    customersFilters.hide();
                    managerItemsFilters.hide();
                    managerOrdersFilters.hide();

                    Ext.getStore('Positions').reload();
                    //MyApp.app.getController('AdditionalInformation').updateBasket();

                    console.log('section basket');

                    break;
                default: // Каталог товаров - guest
                    customersTable.hide();
                    managerItemsTable.hide();
                    customerItemsTable.hide();
                    managerOrdersTable.hide();
                    basketTable.hide();
                    guestItemsTable.show();
                    customerOrdersTable.hide();

                    customerItemsFilters.hide();
                    basketFilters.hide();
                    guestItemsFilters.show();
                    customersFilters.hide();
                    managerItemsFilters.hide();
                    managerOrdersFilters.hide();

                    MyApp.app.getController('AdditionalInformation').updateGuestItems();

                    console.log('section guest');
            }

    },

    init: function(application) {
        this.control({
            "#sections": {
                tabchange: this.onSectionsTabChange
            }
        });
    }

});
