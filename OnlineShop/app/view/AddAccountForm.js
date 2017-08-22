Ext.define('MyApp.view.AddAccountForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.addAccountForm',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    itemId: 'createForm',
    title: 'Создание нового аккаунта',
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
                            margin: '0 0 10 0',
                            fieldLabel: 'Логин',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'UserName',
                            allowBlank: false,
                            blankText: 'Введите логин'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'CreateAccountFormPasswordField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Пароль',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'Password',
                            inputType: 'password',
                            allowBlank: false,
                            blankText: 'Введите пароль'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'CreateAccountFormConfirmPasswordField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Пароль еще раз',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'ConfirmPassword',
                            inputType: 'password',
                            allowBlank: false,
                            blankText: 'Введите пароль еще раз'
                        },
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
                            itemId: 'createButton',
                            scale: 'medium',
                            text: 'Создать'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});