Ext.define('MyApp.store.CustomerItems', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.CustomerItem',
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
            model: 'MyApp.model.CustomerItem',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'CustomerItems',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                actionMethods: '{read: "POST"}',
                api: {
                    read: '/orders/GetCustomerItems'
                },
                noCache: false,
                url: '/orders/GetCustomerItems',
                reader: {
                    type: 'json',
                    idProperty: 'ItemId',
                    root: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                datachanged: {
                    fn: me.onJsonstoreDataChangeD,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonstoreDataChangeD: function(store, eOpts) {
        MyApp.app.getController('AdditionalInformation').updateCustomerItems();
    }

});