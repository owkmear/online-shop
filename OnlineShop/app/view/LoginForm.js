Ext.define('MyApp.view.LoginForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginform',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    itemId: 'loginForm',
    shrinkWrap: 3,
    title: 'Вход',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'form',
                    padding: 20,
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: '0 0 20 0',
                            fieldLabel: 'Имя пользователя',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'identity',
                            allowBlank: false,
                            blankText: 'Введите имя пользователя',
                            regexText: 'Введите имя пользователя'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'LoginFormPasswordField',
                            margin: '0 0 10 0',
                            fieldLabel: 'Пароль',
                            labelAlign: 'right',
                            msgTarget: 'title',
                            name: 'password',
                            inputType: 'password',
                            allowBlank: false,
                            blankText: 'Введите пароль'
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            padding: '0 0 0 103',
                            name: 'rememberme',
                            boxLabel: 'Запомнить меня'
                        },
                        {
                            xtype: 'button',
                            formBind: true,
                            itemId: 'loginButton',
                            margin: '0 15 0 0',
                            scale: 'medium',
                            text: 'Войти'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});