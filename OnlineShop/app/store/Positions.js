Ext.define('MyApp.store.Positions', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.Position',
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
            model: 'MyApp.model.Position',
            storeId: 'Positions',
            proxy: {
                type: 'ajax',
                actionMethods: '{read: "POST"}',
                api: {
                    read: '/orders/GetBasketPositions'
                },
                noCache: false,
                url: '/orders/GetBasketPositions',
                reader: {
                    type: 'json',
                    idProperty: 'PositionId',
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
        MyApp.app.getController('AdditionalInformation').updateBasket();
    }

});