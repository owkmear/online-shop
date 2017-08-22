Ext.define('MyApp.store.Customers', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.Customer',
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
            model: 'MyApp.model.Customer',
            storeId: 'Customers',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                actionMethods: '{create: "POST", read: "POST", update: "POST", destroy: "POST"}',
                api: {
                    create: '/customers/create',
                    read: '/customers/index',
                    update: '/customers/update',
                    destroy: '/customers/delete'
                },
                noCache: false,
                url: '/customers/index',
                reader: {
                    type: 'json',
                    idProperty: 'CustomerId',
                    root: 'data'
                },
                writer: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});