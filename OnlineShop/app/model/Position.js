Ext.define('MyApp.model.Position', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'PositionId',
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
            name: 'Price',
            type: 'int'
        },
        {
            name: 'Count',
            type: 'int'
        }
    ]
});