Ext.define('MyApp.view.EditItemForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.editItemForm',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    autoShow: true,
    height: 350,
    width: 400,
    title: 'Редактирование товара',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'form',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 20 0',
                            fieldLabel: 'Код товара',
                            msgTarget: 'title',
                            name: 'Code',
                            allowBlank: false,
                            blankText: 'Введите код товара'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Наименование товара',
                            msgTarget: 'title',
                            name: 'Name',
                            allowBlank: false,
                            blankText: 'Введите наименование товара'
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Цена товара',
                            msgTarget: 'title',
                            name: 'Price',
                            allowBlank: false,
                            blankText: 'Введите цену товара'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Категория',
                            msgTarget: 'title',
                            name: 'Category',
                            allowBlank: false,
                            blankText: 'Введите категорию'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'sendButton',
                            margin: '0 0 15 0',
                            scale: 'medium',
                            text: 'Редактировать'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});