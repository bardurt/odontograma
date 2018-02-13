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

function TextBox() 
{
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
TextBox.prototype.setDimens = function (x, y, width, height)
{

    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;

};

/**
 * Method to set the text which should be displayed in the textbox
 * @param {type} text string to draw
 * @returns {undefined}
 */
TextBox.prototype.setText = function (text) 
{

    this.text = text;
};

/**
 * Method to draw the textbox onto a canvas
 * @param {type} context the canvas to draw on
 * @param {type} color the color of the text
 * @returns {undefined}
 */
TextBox.prototype.render = function (context, color) 
{

    context.beginPath();

    // if there is text, create a white background
    // to clear the area of the text box
    if (this.text !== "") {
        context.fillStyle = "#ffffff";

        context.fillRect(this.rect.x,
                this.rect.y,
                this.rect.x + this.rect.width,
                this.rect.y + this.rect.height);

    }

    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    this.rect.outline(context, "#00000");

    context.textAlign = "center";
    context.fillStyle = color;

    context.fillText(this.text, 
                     this.rect.x + this.rect.width / 2,
                     this.rect.y + this.rect.height - 3);

    context.stroke();

};
