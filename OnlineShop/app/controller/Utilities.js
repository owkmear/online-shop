Ext.define('MyApp.controller.Utilities', {
    extend: 'Ext.app.Controller',

    toJavaScriptDate: function(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        var date = dt.getDate();
        var month = (dt.getMonth() + 1);
        var year = dt.getFullYear();
        if (date <= 9)
            date = "0" + date;
        if (month <= 9)
            month = "0" + month;
        return date + "." + month + "." + year;
    },

    arrayToUnorderedList: function(array) {
        var result = "<ul>";
        array.forEach(function(entry){
                    result += "<li>" + entry + "</li>";
                });
        result += "</ul>";
        return result;
    },

    kopToRub: function(value) {
        value = value.toString();
        var formatValue = "";
        if (value.length > 2)
        {
            for (var i = 0; i < value.length - 2; i++)
                formatValue += value[i];
            formatValue += "," + value[value.length - 2] + value[value.length - 1] + " руб";
        }
        else if (value.length == 2)
        {
            formatValue = "0";
            formatValue += "," + value[value.length - 2] + value[value.length - 1] + " руб";
        }
        else if (value.length == 1)
        {
            formatValue = "0";
            formatValue += "," + "0" + value[value.length - 1] + " руб";
        }
        return formatValue;
    }

});
