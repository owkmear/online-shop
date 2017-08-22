Ext.define('MyApp.model.ManagerOrder', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'OrderId',
            type: 'string'
        },
        {
            name: 'Login',
            type: 'string'
        },
        {
            name: 'OrderDate',
            type: 'date'
        },
        {
            name: 'ShipmentDate',
            type: 'date'
        },
        {
            name: 'OrderNumber',
            type: 'int'
        },
        {
            name: 'Status',
            type: 'string'
        }
    ]
});