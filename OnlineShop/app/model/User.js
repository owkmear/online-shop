Ext.define('MyApp.model.User', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'Username',
            persist: false,
            type: 'string'
        },
        {
            name: 'Role',
            persist: false
        }
    ],

    inRole: function(RoleID) {
        var me = this;
        return Ext.Array.contains(me.get('Role'), RoleID);
    }

});