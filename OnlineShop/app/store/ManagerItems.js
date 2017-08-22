Ext.define('MyApp.store.ManagerItems', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.ManagerItem',
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
            model: 'MyApp.model.ManagerItem',
            storeId: 'ManagerItems',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                actionMethods: '{create: "POST", read: "POST", update: "POST", destroy: "POST"}',
                api: {
                    create: '/items/create',
                    read: '/items/index',
                    update: '/items/update',
                    destroy: '/items/delete'
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