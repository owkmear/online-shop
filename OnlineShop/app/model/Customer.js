Ext.define('MyApp.model.Customer', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'CustomerId',
            type: 'string'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'Code',
            type: 'string'
        },
        {
            name: 'Address',
            type: 'string'
        },
        {
            name: 'Discount',
            type: 'int'
        },
        {
            name: 'Login',
            type: 'string'
        }
    ]
});