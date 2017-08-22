Ext.define('MyApp.store.SortByCategory1', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.GuestItemsSortByCategory',
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
            model: 'MyApp.model.GuestItemsSortByCategory',
            storeId: 'SortByCategory1',
            proxy: {
                type: 'ajax',
                actionMethods: '{read: "POST"}',
                api: {
                    read: '/orders/GetAllCategories'
                },
                noCache: false,
                url: '/orders/GetAllCategories',
                reader: {
                    type: 'json',
                    root: 'data'
                },
                writer: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});