Ext.define('MyApp.view.MainViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Action',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox'
    ],

    id: 'MainViewport',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 150,
                    itemId: 'headerPanel',
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            flex: 7,
                            frame: true,
                            id: 'sections',
                            itemId: 'sections',
                            items: [
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'guestItemsTab',
                                    title: 'Каталог товаров'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'customerOrdersTab',
                                    title: 'Мои заказы'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'accountsTab',
                                    title: 'Аккаунты'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'ordersTab',
                                    title: 'Заказы :D'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'itemsTab2',
                                    title: 'Товары 2'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'customersTab',
                                    title: 'Редактирование пользователей'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'managerItemsTab',
                                    title: 'Редактирование товаров'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'customerItemsTab',
                                    title: 'Выбор товаров'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'managerOrdersTab',
                                    title: 'Заказы'
                                },
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'basketTab',
                                    title: 'Корзина',
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'createOrder',
                                            margin: '20 0 0 20',
                                            scale: 'medium',
                                            text: 'Оформить заказ'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 3,
                            frame: true,
                            id: 'loginPanel',
                            itemId: 'loginPanel',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'loginButton',
                                    itemId: 'loginButton',
                                    margin: 6,
                                    text: 'Войти'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'registerButton',
                                    margin: 5,
                                    text: 'Регистрация'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 3,
                            frame: true,
                            hidden: true,
                            id: 'logoutPanel',
                            itemId: 'logoutPanel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: 'DisplayUsername',
                                    text: 'None username'
                                },
                                {
                                    xtype: 'label',
                                    id: 'DisplayRoles',
                                    width: 150,
                                    text: 'None roles'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'logoutButton',
                                    margin: 6,
                                    width: 150,
                                    text: 'Выйти'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 5,
                    region: 'center',
                    frame: true,
                    itemId: 'contentPanel',
                    layout: 'fit',
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'managerItemsTable',
                            width: 192,
                            title: 'Редактирование товаров',
                            store: 'ManagerItems',
                            viewConfig: {
                                height: 200
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    dataIndex: 'ItemId',
                                    text: 'Item Id'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    sortable: false,
                                    dataIndex: 'Code',
                                    menuDisabled: true,
                                    text: 'Код'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    sortable: false,
                                    dataIndex: 'Name',
                                    menuDisabled: true,
                                    text: 'Наименование'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return MyApp.app.getController('Utilities').kopToRub(value);
                                    },
                                    width: 130,
                                    sortable: false,
                                    dataIndex: 'Price',
                                    menuDisabled: true,
                                    text: 'Цена'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'Category',
                                    menuDisabled: true,
                                    text: 'Категория'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    menuDisabled: true,
                                    icon: '',
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var code = record.data.Code;
                                                var name = record.data.Name;
                                                var price = record.data.Price;
                                                var category = record.data.Category;

                                                //TODO: отредактировать окно в редакторе

                                                Ext.create("Ext.Window", {
                                                    title: "Удаление",
                                                    modal: true,
                                                    bodyStyle: "padding:10px",
                                                    html: "Точно желаете удалить товар?<br><br>" +
                                                    "Код: " + code + "<br>" +
                                                    "Наименование: " + name + "<br>" +
                                                    "Цена: " + price + "<br>" +
                                                    "Категория: " + category,

                                                    buttons: [
                                                    { text: "Да", handler: function(button)
                                                        {
                                                            view.store.remove(record);
                                                            this.up('window').destroy();
                                                            Ext.getStore('Item').reload();
                                                        }
                                                    },
                                                    { text: "Нет", handler: function()
                                                        {
                                                            this.up('window').destroy();
                                                        }
                                                    }
                                                    ]
                                                }).show();
                                            },
                                            icon: '/Content/images/delete.gif',
                                            tooltip: 'Удалить'
                                        }
                                    ]
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    afterPageText: 'из {0}',
                                    beforePageText: 'Страница',
                                    displayInfo: true,
                                    displayMsg: 'Показано {0} - {1} из {2}',
                                    emptyMsg: 'Нет данных для отображения',
                                    firstText: 'Первая страница',
                                    inputItemWidth: 100,
                                    lastText: 'Последняя страница',
                                    nextText: 'Следующая страница',
                                    prevText: 'Предыдущая страница',
                                    refreshText: 'Обновить',
                                    store: 'ManagerItems'
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'addItemButton',
                                            text: 'Добавить'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'deleteItemButton',
                                            text: 'Удалить'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'editItemButton',
                                            text: 'Редактировать'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                selectionchange: {
                                    fn: me.onItemsTableNewSelectionChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'customerItemsTable',
                            width: 192,
                            title: 'Выбор товаров',
                            store: 'CustomerItems',
                            viewConfig: {
                                height: 200
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    dataIndex: 'ItemId',
                                    text: 'Item Id'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    width: 150,
                                    sortable: false,
                                    dataIndex: 'Code',
                                    menuDisabled: true,
                                    text: 'Код'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    sortable: false,
                                    dataIndex: 'Name',
                                    menuDisabled: true,
                                    text: 'Наименование'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'Category',
                                    menuDisabled: true,
                                    text: 'Категория'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return MyApp.app.getController('Utilities').kopToRub(value);
                                    },
                                    width: 130,
                                    sortable: false,
                                    dataIndex: 'Price',
                                    menuDisabled: true,
                                    text: 'Цена'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (value !== 0)
                                        {
                                            var plusId = Ext.id();
                                            setTimeout(function() {
                                                var plusButton = Ext.create('Ext.button.Button', {
                                                    glyph: 0x002b,
                                                    //text: '+',
                                                    handler: function(grid, rowIndex, colIndex) {
                                                        MyApp.app.getController('CustomerItems').addItemToBasket(record.raw.ItemId);
                                                        Ext.getStore('CustomerItems').reload();
                                                    }
                                                });
                                                if (Ext.get(plusId)) {
                                                    plusButton.render(Ext.get(plusId));
                                                }
                                            }, 1);
                                            var minusId = Ext.id();
                                            setTimeout(function() {
                                                var minusButton = Ext.create('Ext.button.Button', {
                                                    glyph: 0x002d,
                                                    //text: '-',
                                                    handler: function(grid, rowIndex, colIndex) {
                                                        MyApp.app.getController('CustomerItems').deleteItemFromBasket(record.raw.ItemId);
                                                        Ext.getStore('CustomerItems').reload();
                                                    }
                                                });
                                                if (Ext.get(minusId)) {
                                                    minusButton.render(Ext.get(minusId));
                                                }
                                            }, 1);
                                            return '<span id="' + plusId + '"></span><span>&nbsp;&nbsp;&nbsp;' + value + '&nbsp;&nbsp;&nbsp;</span><span id="' + minusId + '"></span>';
                                        }
                                        else
                                        {
                                            var basketId = Ext.id();
                                            setTimeout(function() {
                                                var plusButton = Ext.create('Ext.button.Button', {
                                                    //glyph: 0x002b,
                                                    text: 'Добавить',
                                                    handler: function(grid, rowIndex, colIndex) {
                                                        MyApp.app.getController('CustomerItems').addItemToBasket(record.raw.ItemId);
                                                        Ext.getStore('CustomerItems').reload();
                                                    }
                                                });
                                                if (Ext.get(basketId)) {
                                                    plusButton.render(Ext.get(basketId));
                                                }
                                            }, 1);
                                            return '<span id="' + basketId + '"></span>';
                                        }
                                    },
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'Count',
                                    menuDisabled: true
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    afterPageText: 'из {0}',
                                    beforePageText: 'Страница',
                                    displayInfo: true,
                                    displayMsg: 'Показано {0} - {1} из {2}',
                                    emptyMsg: 'Нет данных для отображения',
                                    firstText: 'Первая страница',
                                    inputItemWidth: 100,
                                    lastText: 'Последняя страница',
                                    nextText: 'Следующая страница',
                                    prevText: 'Предыдущая страница',
                                    refreshText: 'Обновить',
                                    store: 'CustomerItems'
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'guestItemsTable',
                            width: 192,
                            title: 'Каталог товаров',
                            store: 'GuestItems',
                            viewConfig: {
                                height: 200
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    dataIndex: 'ItemId',
                                    text: 'Item Id'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    width: 150,
                                    sortable: false,
                                    dataIndex: 'Code',
                                    menuDisabled: true,
                                    text: 'Код'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    sortable: true,
                                    dataIndex: 'Name',
                                    menuDisabled: true,
                                    text: 'Наименование'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return MyApp.app.getController('Utilities').kopToRub(value);
                                    },
                                    width: 130,
                                    sortable: true,
                                    dataIndex: 'Price',
                                    menuDisabled: true,
                                    text: 'Цена'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: true,
                                    dataIndex: 'Category',
                                    menuDisabled: true,
                                    text: 'Категория'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    afterPageText: 'из {0}',
                                    beforePageText: 'Страница',
                                    displayInfo: true,
                                    displayMsg: 'Показано {0} - {1} из {2}',
                                    emptyMsg: 'Нет данных для отображения',
                                    firstText: 'Первая страница',
                                    inputItemWidth: 100,
                                    lastText: 'Последняя страница',
                                    nextText: 'Следующая страница',
                                    prevText: 'Предыдущая страница',
                                    refreshText: 'Обновить',
                                    store: 'GuestItems'
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'basketTable',
                            width: 192,
                            title: 'Товары в корзине',
                            store: 'Positions',
                            viewConfig: {
                                height: 200
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'PositionId',
                                    text: 'Position Id'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    sortable: false,
                                    dataIndex: 'Code',
                                    menuDisabled: true,
                                    text: 'Код'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    sortable: false,
                                    dataIndex: 'Name',
                                    menuDisabled: true,
                                    text: 'Наименование'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'Count',
                                    menuDisabled: true,
                                    text: 'Количество'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return MyApp.app.getController('Utilities').kopToRub(value);
                                    },
                                    width: 130,
                                    sortable: false,
                                    dataIndex: 'Price',
                                    menuDisabled: true,
                                    text: 'Цена'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var sum = record.raw.Price * record.raw.Count;
                                        //console.log(value);

                                        //console.log(record);

                                        return MyApp.app.getController('Utilities').kopToRub(sum);
                                        //return MyApp.app.getController('Utilities').kopToRub(value);
                                    },
                                    width: 130,
                                    sortable: false,
                                    dataIndex: 'Sum',
                                    menuDisabled: true,
                                    text: 'Сумма'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    itemId: 'myactioncolumn',
                                    align: 'center',
                                    menuDisabled: true,
                                    icon: '',
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                MyApp.app.getController('CustomerItems').deleteAllItemFromBasket(record.raw.PositionId);
                                            },
                                            icon: '/Content/images2/trash.png',
                                            tooltip: 'Удалить товар из корзины'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'managerOrdersTable',
                            width: 192,
                            title: 'Заказы',
                            store: 'ManagerOrders',
                            viewConfig: {
                                height: 200
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'OrderId',
                                    text: 'OrderId'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    sortable: false,
                                    dataIndex: 'Login',
                                    menuDisabled: true,
                                    text: 'Заказчик'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.OrderDate);
                                    },
                                    width: 200,
                                    sortable: false,
                                    dataIndex: 'OrderDate',
                                    menuDisabled: true,
                                    text: 'Дата заказа'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (null === record.raw.ShipmentDate)
                                        return "Не указана";
                                        else
                                        return MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.ShipmentDate);
                                    },
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'ShipmentDate',
                                    menuDisabled: true,
                                    text: 'Дата доставки'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'OrderNumber',
                                    menuDisabled: true,
                                    text: 'Номер заказа'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'Status',
                                    menuDisabled: true,
                                    text: 'Статус'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    afterPageText: 'из {0}',
                                    beforePageText: 'Страница',
                                    displayInfo: true,
                                    displayMsg: 'Показано {0} - {1} из {2}',
                                    emptyMsg: 'Нет данных для отображения',
                                    firstText: 'Первая страница',
                                    inputItemWidth: 100,
                                    lastText: 'Последняя страница',
                                    nextText: 'Следующая страница',
                                    prevText: 'Предыдущая страница',
                                    refreshText: 'Обновить',
                                    store: 'ManagerOrders'
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'confirmOrderButton',
                                            text: 'Подтвердить заказ'
                                        },
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'closeOrderButton',
                                            text: 'Закрыть заказ'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                selectionchange: {
                                    fn: me.onManagerOrdersTableSelectionChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'customerOrdersTable',
                            width: 192,
                            title: 'Мои заказы',
                            store: 'CustomerOrders',
                            viewConfig: {
                                height: 200
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    sortable: false,
                                    dataIndex: 'OrderId',
                                    menuDisabled: true,
                                    text: 'OrderId'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'OrderNumber',
                                    menuDisabled: true,
                                    text: 'Номер заказа'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.OrderDate);
                                    },
                                    width: 200,
                                    sortable: false,
                                    dataIndex: 'OrderDate',
                                    menuDisabled: true,
                                    text: 'Дата заказа'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (null === record.raw.ShipmentDate)
                                        return "Не указана";
                                        else
                                        return MyApp.app.getController('Utilities').toJavaScriptDate(record.raw.ShipmentDate);
                                    },
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'ShipmentDate',
                                    menuDisabled: true,
                                    text: 'Дата доставки'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    sortable: false,
                                    dataIndex: 'Status',
                                    menuDisabled: true,
                                    text: 'Статус'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    afterPageText: 'из {0}',
                                    beforePageText: 'Страница',
                                    displayInfo: true,
                                    displayMsg: 'Показано {0} - {1} из {2}',
                                    emptyMsg: 'Нет данных для отображения',
                                    firstText: 'Первая страница',
                                    inputItemWidth: 100,
                                    lastText: 'Последняя страница',
                                    nextText: 'Следующая страница',
                                    prevText: 'Предыдущая страница',
                                    refreshText: 'Обновить',
                                    store: 'CustomerOrders'
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            disabled: true,
                                            id: 'cancelOrder',
                                            text: 'Отменить заказ'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                selectionchange: {
                                    fn: me.onManagerOrdersTableSelectionChange1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            height: 325,
                            hidden: true,
                            id: 'customersTable',
                            title: 'Редактирование пользователей',
                            store: 'Customers',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'addCustomerButton',
                                            text: 'Добавить'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'Customers'
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    width: 300,
                                    sortable: false,
                                    dataIndex: 'CustomerId',
                                    menuDisabled: true,
                                    text: 'Customer Id'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    sortable: false,
                                    dataIndex: 'Login',
                                    menuDisabled: true,
                                    text: 'Логин'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 300,
                                    sortable: false,
                                    dataIndex: 'Name',
                                    menuDisabled: true,
                                    text: 'Контактное лицо'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    sortable: false,
                                    dataIndex: 'Code',
                                    menuDisabled: true,
                                    text: 'Код'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 300,
                                    sortable: false,
                                    dataIndex: 'Address',
                                    menuDisabled: true,
                                    text: 'Адрес'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    sortable: false,
                                    dataIndex: 'Discount',
                                    menuDisabled: true,
                                    text: 'Скидка'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    menuDisabled: true,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var name = record.data.Name;
                                                var code = record.data.Code;
                                                var address = record.data.Address;
                                                var discount = record.data.Discount;

                                                //TODO: отредактировать окно в редакторе

                                                Ext.create("Ext.Window", {
                                                    title: "Удаление",
                                                    modal: true,
                                                    bodyStyle: "padding:10px",
                                                    html: "Точно желаете удалить заказчика?<br><br>" +
                                                    "Имя: " + name + "<br>" +
                                                    "Код: " + code + "<br>" +
                                                    "Адрес: " + address + "<br>" +
                                                    "Скидка: " + discount + "%",
                                                    buttons: [
                                                    { text: "Да", handler: function(button)
                                                        {
                                                            view.store.remove(record);
                                                            this.up('window').destroy();
                                                            //Ext.getStore('Customer').reload();
                                                        }
                                                    },
                                                    { text: "Нет", handler: function()
                                                        {
                                                            this.up('window').destroy();
                                                        }
                                                    }
                                                    ]
                                                }).show();
                                            },
                                            icon: '/Content/images/delete.gif',
                                            tooltip: 'Удалить'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                beforeitemdblclick: {
                                    fn: me.onCustomersTableBeforeItemDblClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'west',
                    frame: true,
                    itemId: 'filtrationPanel',
                    width: 150,
                    title: 'Сортировка',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'guestItemsFilters',
                            itemId: '',
                            dockedItems: [
                                {
                                    xtype: 'combobox',
                                    dock: 'top',
                                    itemId: 'sortByCategory',
                                    editable: false,
                                    displayField: 'Category',
                                    store: 'SortByCategory',
                                    valueField: 'Category',
                                    listeners: {
                                        change: {
                                            fn: me.onSortByCategoryChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    dock: 'top',
                                    itemId: 'sortByPageSize',
                                    value: 5,
                                    editable: false,
                                    displayField: 'PageSize',
                                    queryMode: 'local',
                                    store: 'GuestItemsSortByPageSize',
                                    valueField: 'PageSize',
                                    listeners: {
                                        change: {
                                            fn: me.onSortByPageSizeChange,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Каталог товаров'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            hidden: true,
                            id: 'customerItemsFilters',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Выбор товаров'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'combobox',
                                    dock: 'top',
                                    itemId: 'sortByCategory',
                                    editable: false,
                                    displayField: 'Category',
                                    store: 'SortByCategory',
                                    valueField: 'Category',
                                    listeners: {
                                        change: {
                                            fn: me.onSortByCategoryChange1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    dock: 'top',
                                    itemId: 'sortByPageSize',
                                    value: 5,
                                    editable: false,
                                    displayField: 'PageSize',
                                    queryMode: 'local',
                                    store: 'GuestItemsSortByPageSize',
                                    valueField: 'PageSize',
                                    listeners: {
                                        change: {
                                            fn: me.onSortByPageSizeChange1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            hidden: true,
                            id: 'basketFilters',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Товары в корзине'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            hidden: true,
                            id: 'customersFilters',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Редактирование пользователей'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            hidden: true,
                            id: 'managerItemsFilters',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Редактирование товаров'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            hidden: true,
                            id: 'managerOrdersFilters',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Заказы'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'east',
                    frame: true,
                    itemId: 'informationPanel',
                    style: 'border: \'5px\'',
                    width: 150,
                    layout: 'fit',
                    title: 'Информация',
                    items: [
                        {
                            xtype: 'label',
                            id: 'additionalInformation',
                            text: 'Дополнительная информация'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'south',
                    frame: true,
                    height: 150,
                    itemId: 'footerPanel',
                    items: [
                        {
                            xtype: 'label',
                            id: 'information',
                            text: 'Информация'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'AnonimouseButton',
                            margin: 30,
                            text: 'Anonimous'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'ManagerButton',
                            margin: 30,
                            text: 'Manager'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'CustomerButton',
                            text: 'Customer'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'mybutton6',
                            margin: 30,
                            width: 50,
                            text: '1'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'mybutton7',
                            margin: 30,
                            width: 50,
                            text: '2'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'mybutton8',
                            margin: 10,
                            width: 50,
                            text: '3'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'mybutton9',
                            margin: 10,
                            text: 'Получить cookie'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'mybutton10',
                            margin: 10,
                            text: 'CSRF метод'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'mybutton11',
                            margin: 10,
                            text: 'Кнопка'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onItemsTableNewSelectionChange: function(model, selected, eOpts) {
        if (selected[0] === undefined)
        {
            Ext.getCmp('deleteItemButton').setDisabled(true);
            Ext.getCmp('editItemButton').setDisabled(true);
        }
        else
        {
            Ext.getCmp('deleteItemButton').setDisabled(false);
            Ext.getCmp('editItemButton').setDisabled(false);
        }
    },

    onManagerOrdersTableSelectionChange: function(model, selected, eOpts) {
        if (selected[0] === undefined)
        {
            Ext.getCmp('confirmOrderButton').setDisabled(true);
            Ext.getCmp('closeOrderButton').setDisabled(true);
        }
        else
        {
            if (selected[0].raw.Status === "Новый")
            {
                Ext.getCmp('confirmOrderButton').setDisabled(false);
                Ext.getCmp('closeOrderButton').setDisabled(true);
            }
            else if (selected[0].raw.Status === "Выполняется")
            {
                Ext.getCmp('confirmOrderButton').setDisabled(true);
                Ext.getCmp('closeOrderButton').setDisabled(false);
            }
            else
            {
                Ext.getCmp('confirmOrderButton').setDisabled(true);
                Ext.getCmp('closeOrderButton').setDisabled(true);
            }
        }
    },

    onManagerOrdersTableSelectionChange1: function(model, selected, eOpts) {
        if (selected[0] === undefined)
        {
            Ext.getCmp('cancelOrder').setDisabled(true);
        }
        else
        {
            if (selected[0].raw.Status === "Новый")
            {
                Ext.getCmp('cancelOrder').setDisabled(false);
            }
            else
            {
                Ext.getCmp('cancelOrder').setDisabled(true);
            }
        }
    },

    onCustomersTableBeforeItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var editCustomersForm = Ext.create("widget.editAccountForm");
        editCustomersForm.down('form').loadRecord(record);
        editCustomersForm.show();
    },

    onSortByCategoryChange: function(field, newValue, oldValue, eOpts) {
        var sortByCategory = Ext.getCmp('guestItemsFilters').child("#sortByCategory");
        var sortByPageSize = Ext.getCmp('guestItemsFilters').child("#sortByPageSize");

        var store = Ext.getStore('GuestItems');
        store.pageSize = sortByPageSize.getValue();
        store.clearFilter(true);
        store.filter('SortByCategory', sortByCategory.getValue());


        //console.log('debug');
        //var form = button.up('form');
        //console.log(eOpts);
        //console.log(field);
        //var form = field.up('GuestItemsSortByCategoryComboBox');
        //var form = field.up('#GuestItemsSortByCategoryComboBox');
        //console.log(form);


        //store.load();
        //console.log('new value = ' + newValue);
        //console.log('old value = ' + oldValue);
        //if (oldValue !== undefined)
        //{
            //var store = Ext.getStore('GuestItems');
            //store.clearFilter(true);
            //store.filter('SortByCategory', newValue);
        //}
        //console.log(Ext.getStore('GuestItems').getProxy().headers);
        //Ext.getStore('GuestItems').getProxy().headers.SortByCategory = newValue;
        //console.log(Ext.getStore('GuestItems').getProxy().headers);
        //Ext.getStore('GuestItems').getProxy().headers = { 'SortByCategory': newValue };
    },

    onSortByPageSizeChange: function(field, newValue, oldValue, eOpts) {
        var sortByCategory = Ext.getCmp('guestItemsFilters').child("#sortByCategory");
        var sortByPageSize = Ext.getCmp('guestItemsFilters').child("#sortByPageSize");

        //var GuestItemsSortByCategoryComboBox = Ext.getCmp('GuestItemsSortByCategoryComboBox');
        //var GuestItemsSortByPageSizeComboBox = Ext.getCmp('GuestItemsSortByPageSizeComboBox');
        var store = Ext.getStore('GuestItems');
        store.pageSize = sortByPageSize.getValue();
        store.clearFilter(true);
        store.filter('SortByCategory', sortByCategory.getValue());
        /*var store = Ext.getStore('GuestItems');
        store.pageSize = newValue;
        store.load();*/
    },

    onSortByCategoryChange1: function(field, newValue, oldValue, eOpts) {
        var sortByCategory = Ext.getCmp('customerItemsFilters').child('#sortByCategory');
        //var CustomerItemsSortByCategoryComboBox = Ext.getCmp('CustomerItemsSortByCategoryComboBox');
        //var CustomerItemsSortByPageSizeComboBox = Ext.getCmp('CustomerItemsSortByPageSizeComboBox');
        var sortByPageSize = Ext.getCmp('customerItemsFilters').child('#sortByPageSize');

        var store = Ext.getStore('CustomerItems');
        store.pageSize = sortByPageSize.getValue();
        store.clearFilter(true);
        store.filter('SortByCategory', sortByCategory.getValue());
    },

    onSortByPageSizeChange1: function(field, newValue, oldValue, eOpts) {
        var sortByCategory = Ext.getCmp('customerItemsFilters').child('#sortByCategory');
        //var CustomerItemsSortByCategoryComboBox = Ext.getCmp('CustomerItemsSortByCategoryComboBox');
        //var CustomerItemsSortByPageSizeComboBox = Ext.getCmp('CustomerItemsSortByPageSizeComboBox');
        var sortByPageSize = Ext.getCmp('customerItemsFilters').child('#sortByPageSize');
        var store = Ext.getStore('CustomerItems');
        store.pageSize = sortByPageSize.getValue();
        store.clearFilter(true);
        store.filter('SortByCategory', sortByCategory.getValue());
    }

});