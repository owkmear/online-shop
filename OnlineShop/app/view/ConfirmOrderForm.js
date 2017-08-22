Ext.define('MyApp.view.ConfirmOrderForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.confirmOrderForm',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.form.field.Date',
        'Ext.button.Button'
    ],

    title: 'Подтверждение заказа',
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
                            id: 'confirmOrderFormNameField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Заказчик',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'confirmOrderFormAddressField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Адрес',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'confirmOrderFormOrderDateField',
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
                            margin: '0 0 10 0',
                            fieldLabel: 'Статус',
                            labelAlign: 'right',
                            name: 'Status',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'confirmOrderFormSumField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Сумма заказа',
                            labelAlign: 'right',
                            name: 'Sum',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'positionInfoList',
                            margin: '0 0 10 0',
                            hideLabel: true,
                            labelAlign: 'right',
                            name: 'Positions',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'confirmOrderFormDiscountField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Скидка',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'confirmOrderFormDiscountSumField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Сумма заказа со скидкой',
                            labelAlign: 'right',
                            value: 'Нет данных'
                        },
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            margin: '0 0 10 0',
                            fieldLabel: 'Выберите дату доставки',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'ShipmentDate',
                            allowBlank: false,
                            blankText: 'Выберите дату доставки',
                            altFormats: 'd.m.y|d/m/Y|d/m/y|d-m-y|d-m-Y|d\m\Y|d\m\y',
                            format: 'd.m.Y'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'confirmButton',
                            scale: 'medium',
                            text: 'Подтвердить заказ'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});