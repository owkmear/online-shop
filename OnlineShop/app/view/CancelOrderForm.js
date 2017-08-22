Ext.define('MyApp.view.CancelOrderForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.cancelOrderForm',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.button.Button'
    ],

    title: 'Отмена заказа',
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
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormOrderDateField2',
                            margin: '0 0 10 0',
                            fieldLabel: 'Дата заказа',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Номер заказа',
                            labelAlign: 'right',
                            name: 'OrderNumber',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormSumField2',
                            margin: '0 0 10 0',
                            fieldLabel: 'Сумма заказа',
                            labelAlign: 'right',
                            name: 'Sum',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderPositionInfoList2',
                            margin: '0 0 10 0',
                            hideLabel: true,
                            labelAlign: 'right',
                            name: 'Positions',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormDiscountField2',
                            margin: '0 0 10 0',
                            fieldLabel: 'Скидка',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormDiscountSumField2',
                            margin: '0 0 10 0',
                            fieldLabel: 'Сумма заказа со скидкой',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'cancelButton',
                            scale: 'medium',
                            text: 'Отменить заказ'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});