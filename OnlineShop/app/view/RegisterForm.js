Ext.define('MyApp.view.RegisterForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.registerform',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    itemId: 'registerForm',
    title: 'Регистрация',
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
                            blankText: 'Введите Ваш логин'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'RegisterFormPasswordField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Пароль',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'Password',
                            inputType: 'password',
                            allowBlank: false,
                            blankText: 'Введите Ваш пароль'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'RegisterFormConfirmPasswordField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Пароль еще раз',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'ConfirmPassword',
                            inputType: 'password',
                            allowBlank: false,
                            blankText: 'Введите Ваш пароль еще раз'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'registerButton',
                            scale: 'medium',
                            text: 'Регистрация'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});