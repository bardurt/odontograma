

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
    this.highlightColor = "";
    this.checkBoxes = Array();
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


    this.textBox.render(context, settings.COLOR_BLUE);

    if (this.active) {
        this.rect.highlight(context, settings)
    } else {
        this.rect.outline(context, "#000000");
    }

};
