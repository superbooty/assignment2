$(document).ready(function() {
    Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue!=rvalue ) {
            //if the values do not match return the {{else}} section
            return options.inverse(this);
        } else {
            //if the values match return the section inside the helper call {{#equal ..}}
            return options.fn(this);
        }
    });
});

$(document).ready(function() {
    Handlebars.registerHelper('crr', function(crrVal, options) {
        return (crrVal * 20)+"px";
    });
});

$(document).ready(function() {
    Handlebars.registerHelper('rawText', function(text, options) {
        var regex = /(<([^>]+)>)/ig;
        var result = text.replace(regex, "");
        return result.substring(0, 300);

    });
});


/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
    if (context > options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

/**
 * If Less Than
 * if_lt this compare=that
 */
Handlebars.registerHelper('if_lt', function(context, options) {
    if (context < options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

