Ext.define('MyApp.store.CustomerItemsSortByPageSize', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CustomerItemsSortByPageSize',
            data: [
                {
                    PageSize: '1'
                },
                {
                    PageSize: '2'
                },
                {
                    PageSize: '3'
                },
                {
                    PageSize: '4'
                },
                {
                    PageSize: '5'
                }
            ],
            fields: [
                {
                    name: 'PageSize'
                }
            ]
        }, cfg)]);
    }
});