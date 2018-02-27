/* 
 * Copyright (c) 2018 Bardur Thomsen <https://github.com/bardurt>.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bardur Thomsen <https://github.com/bardurt> - initial API and implementation and/or initial documentation
 */

/*
 * Class which represents a simple textbox 
 */

function TextBox() {
    "use strict";
    this.text = "";
    this.rect = new Rect();
    this.touching = false;
}

/**
 * Set the dimension of the rectangle
 * @param {type} x position in canvas
 * @param {type} y position in canvas
 * @param {type} width of rectangle
 * @param {type} height of rectangle
 * @returns {undefined}
 */
TextBox.prototype.setDimens = function (x, y, width, height) {
    "use strict";
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;
    this.text = "";
    this.label = "";
};

/**
 * Method to set the text which should be displayed in the textbox
 * @param {type} text string to draw
 * @returns {undefined}
 */
TextBox.prototype.setText = function (text) {
    "use strict";
    this.text = text;
};

TextBox.prototype.setLabel = function (label) {
    "use strict";
    this.label = label;
};

/**
 * Draw a text lable on the textbox
 * @param {type} context
 * @returns {undefined}
 */
TextBox.prototype.drawLabel = function (context) {
    "use strict";
    this.rect.outline(context, "#000000");

    context.beginPath();

    context.textAlign = "center";
    context.fillStyle = "#9a9a9a";
    context.font = "11px Arial";

    context.fillText(this.label,
            this.rect.x + this.rect.width / 2,
            this.rect.y + this.rect.height - 4);

    context.stroke();

    context.restore();

};

/**
 * Draw a text on textbox
 * @param {type} context cavnas to draw on
 * @param {type} color color of the text to draw
 * @returns {void}
 */
TextBox.prototype.drawText = function (context, color) {
    "use strict";
    context.beginPath();

    // if there is text, create a white background
    // to clear the area of the text box
    if (this.text !== "") {
        context.fillStyle = "#ffffff";

        context.fillRect(this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height);

    }

    this.rect.outline(context, "#000000");
    
    context.textAlign = "center";
    context.fillStyle = color;
    context.font = "13px Arial";

    context.fillText(this.text,
            this.rect.x + this.rect.width / 2,
            this.rect.y + this.rect.height - 4);

    context.stroke();

    context.restore();
    
};

/**
 * Method to draw the textbox onto a canvas
 * @param {type} context the canvas to draw on
 * @param {type} color the color of the text
 * @returns {undefined}
 */
TextBox.prototype.render = function (context, color) {
    "use strict";
    this.drawText(context, color);
};

TextBox.prototype.setNote = function (note) {
    "use strict";
    this.text = note.toUpperCase();
};
