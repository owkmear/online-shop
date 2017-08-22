Ext.define('MyApp.model.CustomerOrder', {
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
            name: 'OrderNumber',
            type: 'int'
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
            name: 'Status',
            type: 'string'
        }
    ]
});