Ext.define('MyApp.model.CustomerItem', {
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
            name: 'Count',
            type: 'int'
        },
        {
            name: 'Category',
            type: 'string'
        }
    ]
});