Ext.define('MyApp.view.CustomersTableAddForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.customersTableAddForm',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    autoShow: true,
    height: 400,
    width: 500,
    title: 'Добавление заказчика',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 20 0',
                            fieldLabel: 'Контактное лицо',
                            msgTarget: 'title',
                            name: 'Name',
                            allowBlank: false,
                            blankText: 'Введите контактное лицо'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Код',
                            msgTarget: 'title',
                            name: 'Code',
                            allowBlank: false,
                            blankText: 'Введите код'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Адрес',
                            msgTarget: 'title',
                            name: 'Address',
                            allowBlank: false,
                            blankText: 'Введите адрес'
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Скидка',
                            msgTarget: 'title',
                            name: 'Discount',
                            allowBlank: false,
                            blankText: 'Введите скидку'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'sendButton',
                            margin: '0 0 15 0',
                            scale: 'medium',
                            text: 'Добавить'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});