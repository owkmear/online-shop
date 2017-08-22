Ext.define('MyApp.model.GuestItemsSortByCategory', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'Category',
            type: 'string'
        }
    ]
});