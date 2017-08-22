Ext.define('MyApp.store.GuestItems', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.GuestItem',
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
            model: 'MyApp.model.GuestItem',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'GuestItems',
            pageSize: 5,
            remoteGroup: true,
            proxy: {
                type: 'ajax',
                actionMethods: '{read: "POST"}',
                api: {
                    read: '/items/index'
                },
                noCache: false,
                url: '/items/index',
                reader: {
                    type: 'json',
                    idProperty: 'ItemId',
                    root: 'data'
                },
                writer: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});