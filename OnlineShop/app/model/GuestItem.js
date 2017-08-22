Ext.define('MyApp.model.GuestItem', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'ItemId',
            type: 'string'
        },
        {
            name: 'Code',
            type: 'string'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'Price',
            type: 'int'
        },
        {
            name: 'Category',
            type: 'string'
        }
    ]
});