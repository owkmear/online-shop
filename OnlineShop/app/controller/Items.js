Ext.define('MyApp.controller.Items', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'deleteItemButton',
            selector: '#deleteItemButton'
        },
        {
            ref: 'editItemButton',
            selector: '#editItemButton'
        },
        {
            ref: 'managerItemsTable',
            selector: '#managerItemsTable'
        }
    ],

    onAddItemButtonClick: function(button, e, eOpts) {
        var additemform = Ext.create("widget.addItemForm");
        additemform.show();
    },

    onDeleteItemButtonClick: function(button, e, eOpts) {
        var store = Ext.getStore('ManagerItems');

        var record = this.getManagerItemsTable().getSelectionModel().getSelection()[0];

        var code = record.data.Code;
        var name = record.data.Name;
        var price = record.data.Price;
        var category = record.data.Category;

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
                     store.remove(record);
                     this.up('window').destroy();
                     store.reload();
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

    onAddSendButtonClick: function(button, e, eOpts) {
        var form = button.up('form'), // Форма добавления товара
            formWindow = button.up('window'), // Окно добавления товара
            values = form.getValues(); // Данные с формы
        var store = Ext.data.StoreManager.get("ManagerItems");

        var newCode = values.code;
        var newName = values.name;
        var newPrice = values.price;
        var newCategory = values.category;

        store.add({Code : newCode, Name : newName, Price : newPrice, Category : newCategory});

        Ext.getStore('ManagerItems').reload(); // Обновление таблицы

        formWindow.destroy(); // Закрыть окно
    },

    onEditSendButtonClick: function(button, e, eOpts) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        record.set(values);
        win.close();
    },

    onEditItemButtonClick: function(button, e, eOpts) {
        var store = Ext.getStore('ManagerItems');

        var record = this.getManagerItemsTable().getSelectionModel().getSelection()[0];

        var edititemform = Ext.create("widget.editItemForm");
        edititemform.down('form').loadRecord(record);
        edititemform.show();
    },

    init: function(application) {
        this.control({
            "#addItemButton": {
                click: this.onAddItemButtonClick
            },
            "#deleteItemButton": {
                click: this.onDeleteItemButtonClick
            },
            "addItemForm #sendButton": {
                click: this.onAddSendButtonClick
            },
            "editItemForm #sendButton": {
                click: this.onEditSendButtonClick
            },
            "#editItemButton": {
                click: this.onEditItemButtonClick
            }
        });
    }

});
