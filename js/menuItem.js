

/**
 * Base class for tooth
 * @returns {MenuItem}
 */
function MenuItem() {
    "use strict";
    this.active = false;
    this.id = 0;
    this.tooth = true;
    this.surfaces = 0;
    this.highlight = false;
    this.rect = new Rect();
    this.textBox = new TextBox();
    this.spacer = 20; // spacer to seperate tooth from surfaces
    this.touching = false;
    this.address = 0;
    this.normalY = null;
    this.highY = null;
    this.blocked = false;
    this.constants = null;

}


MenuItem.prototype.setUp = function (x, y, width, height) {
    "use strict";

    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;

    this.textBox.rect.x = x;
    this.textBox.rect.y = y;
    this.textBox.rect.width = width;
    this.textBox.rect.height = height;

};


/**
 * Method to render a Tooth on the screen with all its states
 * @param {type} context the canvas to draw on
 * @param {type} settings app settings
 * @param {type} constants application constants
 * @returns {undefined}
 */
MenuItem.prototype.render = function (context, settings, constants) {
    "use strict";

    if (this.active) {
        this.renderStateActive(context);
    } else {
        this.renderStateNormal(context);
    }

    if(this.highlight) {
        this.renderStateFocus(context);
    } 

    this.renderLabel(context);
};


MenuItem.prototype.renderStateNormal = function (context) {
    "use strict";


    var portion = this.rect.height / 5;

    context.beginPath();
    context.globalAlpha = 1;
    context.fillStyle = "#ebf3f5";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

    context.fillStyle = "#f9fbfc";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, portion);

    context.fillStyle = "#f9f9f9";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, 1);

    context.fillStyle = "#e5eef1";
    context.fillRect(this.rect.x, this.rect.y + (portion * 4), this.rect.width, portion);

    context.fillStyle = "#e9eef0";
    context.fillRect(this.rect.x, this.rect.y + (this.rect.height -1), this.rect.width, 1);

    context.globalAlpha = 1;

    this.rect.outline(context ,"#35353f")

    context.restore();

};

MenuItem.prototype.renderStateActive = function (context) {
    "use strict";


    var portion = this.rect.height / 5;

    context.beginPath();
    context.globalAlpha = 1;
    context.fillStyle = "#ace8d1";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

    context.fillStyle = "#bef7e1";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, portion);

    context.fillStyle = "#dafff1";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, 1);

    context.fillStyle = "#8fd6bb";
    context.fillRect(this.rect.x, this.rect.y + (portion * 4), this.rect.width, portion);

    context.fillStyle = "#6db096";
    context.fillRect(this.rect.x, this.rect.y + (this.rect.height -1), this.rect.width, 1);

    context.globalAlpha = 1;

    this.rect.outline(context ,"#35353f")

    context.restore();

};


MenuItem.prototype.renderStateFocus = function (context) {
    "use strict";

    context.beginPath();
    context.globalAlpha = 0.5;
    context.fillStyle = "#b2dee7";
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    context.globalAlpha = 1.0;
    this.rect.outline(context ,"#35353f")
    context.restore();

};

MenuItem.prototype.renderLabel = function (context) {
    "use strict";

    context.globalAlpha = 1;

    context.textAlign = "center";
    context.fillStyle = "#35353f";
    context.font = "13px Arial";

    context.fillText(this.textBox.text,
            this.rect.x + this.rect.width / 2,
            this.rect.y + this.rect.height - 4);

    context.stroke();

    context.restore();
};