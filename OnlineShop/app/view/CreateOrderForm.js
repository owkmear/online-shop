Ext.define('MyApp.view.CreateOrderForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.createOrderForm',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.button.Button'
    ],

    title: 'Оформить заказ',
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
                            margin: '0 0 10 0',
                            fieldLabel: 'Логин',
                            labelAlign: 'right',
                            name: 'Login',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormNameField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Заказчик',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormAddressField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Адрес',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormOrderDateField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Дата заказа',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormShipmentDateField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Дата доставки',
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
                            margin: '0 0 10 0',
                            fieldLabel: 'Статус',
                            labelAlign: 'right',
                            name: 'Status',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormSumField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Сумма заказа',
                            labelAlign: 'right',
                            name: 'Sum',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderPositionInfoList1',
                            margin: '0 0 10 0',
                            hideLabel: true,
                            labelAlign: 'right',
                            name: 'Positions',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormDiscountField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Скидка',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'closeOrderFormDiscountSumField1',
                            margin: '0 0 10 0',
                            fieldLabel: 'Сумма заказа со скидкой',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'confirmCreateOrderButton',
                            scale: 'medium',
                            text: 'Оформить заказ'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});