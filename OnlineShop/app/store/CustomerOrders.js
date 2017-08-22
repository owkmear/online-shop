Ext.define('MyApp.store.CustomerOrders', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.CustomerOrder',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            autoSync: true,
            model: 'MyApp.model.CustomerOrder',
            storeId: 'CustomerOrders',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                actionMethods: '{read: "POST"}',
                api: {
                    read: '/orders/GetCustomerOrders'
                },
                noCache: false,
                url: '/orders/GetCustomerOrders',
                reader: {
                    type: 'json',
                    idProperty: 'OrderId',
                    root: 'data'
                },
                writer: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});