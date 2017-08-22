Ext.define('MyApp.store.ManagerOrders', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.ManagerOrder',
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
            model: 'MyApp.model.ManagerOrder',
            storeId: 'ManagerOrders',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                actionMethods: '{read: "POST"}',
                api: {
                    read: '/orders/index'
                },
                noCache: false,
                url: '/orders/index',
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