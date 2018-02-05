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

var TYPE_UPPER = 0;
var TYPE_LOWER = 1;

/**
 * Base class for tooth
 * @returns {Tooth}
 */
function Tooth()
{

    this.id = '';
    this.surfaces = 0;
    this.highlight = false;
    this.damages = Array();
    this.checkBoxes = Array();
    this.rect = new Rect();
    this.spacer = 20; // spacer to seperate tooth from surfaces
    this.touching = false;

}

/**
 * Method to set up position and dimension of the Tooth
 * @param {type} x position
 * @param {type} y position
 * @param {type} width 
 * @param {type} height
 * @returns {undefined}
 */
Tooth.prototype.setDimens = function (x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;

};

/**
 * Method to set the type of the tooth
 * @param {type} type of the tooth, upper or lower
 * @returns {undefined}
 */
Tooth.prototype.setType = function (type)
{
    this.type = type;
};

/**
 * Method to check for collision
 * @param {type} eX 
 * @param {type} eY
 * @returns {unresolved}
 */
Tooth.prototype.checkCollision = function (eX, eY)
{
    return this.rect.checkCollision(eX, eY);
};

/**
 * Method to set surfaces for the tooth, 4 or 5
 * @param {type} surfaces
 * @returns {undefined}
 */
Tooth.prototype.setSurfaces = function (surfaces)
{
    this.surfaces = surfaces;
};

Tooth.prototype.toggleSelected = function(selected)
{
    this.highlight = selected;
};

/**
 * Method to create 4 surfaces for the tooth, 4 checkboxes
 * @returns {undefined}
 */
Tooth.prototype.create4Surfaces = function ()
{
    var width = RECT_DIMEN;

    var startX = this.x + 10;

    if (this.type === TYPE_UPPER) {

        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y + this.height + this.spacer + width;

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y + this.height + this.spacer + width;

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + 5;
        rect3.y = this.y + this.height + this.spacer;

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + 5;
        rect4.y = this.y + this.height + this.spacer + width * 2;

        this.checkBoxes.push(rect4);

    } else
    {
        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y - this.spacer - width * 2;

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y - this.spacer - width * 2;

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + 5;
        rect3.y = this.y - this.spacer - width;

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + 5;
        rect4.y = this.y - this.spacer - width * 3;

        this.checkBoxes.push(rect4);

    }

};

/**
 * Method to create 5 surfaces for the tooth, 5 checkboxes
 * @returns {undefined}
 */
Tooth.prototype.create5Surfaces = function ()
{
    var width = RECT_DIMEN;

    var startX = this.x + 5;

    console.log("Start X " + startX);

    if (this.type === TYPE_UPPER) {

        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y + this.height + this.spacer + width;

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y + this.height + this.spacer + width;

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + width * 2;
        rect3.y = this.y + this.height + this.spacer + width;

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + width;
        rect4.y = this.y + this.height + this.spacer;

        this.checkBoxes.push(rect4);

        var rect5 = new Rect();

        rect5.width = width;
        rect5.height = width;
        rect5.x = startX + width;
        rect5.y = this.y + this.height + this.spacer + width * 2;

        this.checkBoxes.push(rect5);
    } else
    {
        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y - this.spacer - width * 2;

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y - this.spacer - width * 2;

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + width * 2;
        rect3.y = this.y - this.spacer - width * 2;

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + width;
        rect4.y = this.y - this.spacer - width;

        this.checkBoxes.push(rect4);

        var rect5 = new Rect();

        rect5.width = width;
        rect5.height = width;
        rect5.x = startX + width;
        rect5.y = this.y - this.spacer - width * 3;

        this.checkBoxes.push(rect5);

    }

};

/**
 * Base method for setting the surfaces for a tooth
 * @returns {undefined}
 */
Tooth.prototype.createSurfaces = function ()
{
    if (this.surfaces === 4)
    {
        this.create4Surfaces();
    } else
    {
        this.create5Surfaces();
    }
};



Tooth.prototype.drawId = function (context)
{
    context.beginPath();
    context.fillStyle = "#000000";
    context.font = "15px Arial Bold";

    var space = 40 + this.spacer;

    if (this.type === TYPE_UPPER)
    {
        // draw id
        context.fillText("" + this.id, this.x + 12, this.y + this.height + space + 10);

        // draw id border
        context.moveTo(this.x, this.y + this.height + space + 20);
        context.lineTo(this.x + this.width, this.y + this.height + space + 20);

        context.moveTo(this.x + this.width, this.y + this.height + space + 20);
        context.lineTo(this.x + this.width, this.y + this.height + space);
    } else
    {
        // draw id
        context.fillText("" + this.id, this.x + 12, this.y - space - 5);

        // draw id border
        context.moveTo(this.x, this.y - space - 20);
        context.lineTo(this.x + this.width, this.y - space - 20);

        context.moveTo(this.x + this.width, this.y - space - 20);
        context.lineTo(this.x + this.width, this.y - space);
    }

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = '#000000';
    context.stroke();
    context.restore();


};

Tooth.prototype.drawCheckBoxOutLine = function (checkBox, context)
{
    context.beginPath();

    context.rect(checkBox.x,
            checkBox.y,
            checkBox.width,
            checkBox.height);

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = COLOR_BLACK;
    context.stroke();
    context.restore();
};

Tooth.prototype.drawCheckBoxRed = function (checkBox, context)
{

    context.beginPath();
    context.fillStyle = COLOR_RED;

    context.fillRect(checkBox.x,
            checkBox.y,
            checkBox.width,
            checkBox.height);

    context.restore();

    context.rect(checkBox.x,
            checkBox.y,
            checkBox.width,
            checkBox.height);

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = COLOR_BLACK;
    context.stroke();
    context.restore();
}

Tooth.prototype.drawCheckBoxBlue = function (checkBox, context) {

    context.beginPath();
    context.fillStyle = COLOR_BLUE;

    context.fillRect(checkBox.x,
            checkBox.y,
            checkBox.width,
            checkBox.height);

    context.restore();

    context.rect(checkBox.x,
            checkBox.y,
            checkBox.width,
            checkBox.height);

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = COLOR_BLACK;
    context.stroke();
    context.restore();
};


Tooth.prototype.drawCheckBoxes = function (context)
{
    for (var i = 0; i < this.checkBoxes.length; i++)
    {

        if (this.checkBoxes[i].state === 1)
        {
            this.drawCheckBoxRed(this.checkBoxes[i], context);
        } else if (this.checkBoxes[i].state === 2)
        {
            this.drawCheckBoxBlue(this.checkBoxes[i], context);
        } else
        {
            this.drawCheckBoxOutLine(this.checkBoxes[i], context);
        }

    }
};

/**
 * Method to toggle Touchin on / off
 * @param {type} touch boolean value 
 * @returns {undefined}
 */
Tooth.prototype.onTouch = function(touch)
{
   this.rect.touching = touch;
};

/**
 * Method to toggle damage on a tooth on off
 * @param {type} tooth for damage
 * @param {type} damage to add or remove
 * @returns {undefined}
 */
Tooth.prototype.toggleDamage = function (damage) {

    console.log("Toggle damage for " + this.id + ", damage " + damage);

    if (this.damages.length < 1)
    {
        this.damages.push(damage);
    } else
    {
        var exists = false;
        var splicer = -1;

        for (var i = 0; i < this.damages.length; i++)
        {
            if (this.damages[i] === damage)
            {
                console.log("Splicing array for tooth " + this.id);

                splicer = i;
                exists = true;
                break;
            }
        }

        if (!exists)
        {
            this.damages.push(damage);
        } else
        {
            this.damages.splice(splicer, 1);
        }
    }
};


/**
 * Method to draw a fractura on a particular tooth
 * @param {type} tooth to draw damage on
 * @param {type} context canvas
 * @returns {undefined}
 */
Tooth.prototype.drawFractura = function (context)
{
    context.beginPath();

    if (this.type === TYPE_UPPER) {
        context.moveTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.height / 2);

    } else {

        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y + this.height / 2);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = COLOR_RED;
    context.stroke();
    context.restore();

}

/**
 * Method to draw Diente Ausente on a particular tooth 
 * @param {type} tooth to draw damage on
 * @param {type} context canvas to draw on
 * @returns {undefined}
 */
Tooth.prototype.drawDienteAusente = function (context)
{

    context.beginPath();

    console.log("Drawing upper");

    if (this.type === TYPE_UPPER) {

        context.moveTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.height / 2);

        context.lineWidth = 2;

        // set line color
        context.strokeStyle = COLOR_BLUE;
        context.stroke();
        context.restore();

        context.moveTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height / 2);

        context.strokeStyle = COLOR_BLUE;
        context.stroke();


    } else {

        console.log("Drawing lower");

        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y + this.height / 2);

        context.lineWidth = 2;

        // set line color
        context.strokeStyle = COLOR_BLUE;
        context.stroke();
        context.restore();

        context.moveTo(this.x + this.width, this.y);
        context.lineTo(this.x, this.y + this.height / 2);

        context.strokeStyle = COLOR_BLUE;
        context.stroke();

    }

    context.restore();

}

/**
 * Method to draw damage 
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
Tooth.prototype.drawPulpar = function (context)
{
    console.log("Drawing pulpar");

    context.beginPath();

    if (this.type === TYPE_UPPER) {


        context.moveTo(this.x + this.width / 2, this.y + this.height - 10);
        context.lineTo(this.x + this.width / 2, this.y + this.height / 2);

    } else {

        context.moveTo(this.x + this.width / 2, this.y + 10);
        context.lineTo(this.x + this.width / 2, this.y + this.height / 2);

    }

    context.lineWidth = 3;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

}

/**
 * Method to draw damage Migracion on a tooth
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
Tooth.prototype.drawMigracion = function (context)
{
    console.log("Drawing Migracion");

    context.beginPath();

    var spacer = 5;

    if (this.type === TYPE_UPPER) {

        // draw line
        context.moveTo(this.x + spacer, this.y + this.height + 5);
        context.lineTo(this.x + this.width - spacer, this.y + this.height + 5);

        // upper point
        context.moveTo(this.x + spacer, this.y + this.height + 5);
        context.lineTo(this.x + spacer + 4, this.y + this.height + 10);

        // lower point
        context.moveTo(this.x + spacer, this.y + this.height + 5);
        context.lineTo(this.x + spacer + 4, this.y + this.height);

    } else {

        // draw line
        context.moveTo(this.x + spacer, this.y - 5);
        context.lineTo(this.x + this.width - spacer, this.y - 5);

        // upper point
        context.moveTo(this.x + this.width - spacer, this.y - 5);
        context.lineTo(this.x + this.width - spacer - 4, this.y - 10);

        // upper point
        context.moveTo(this.x + this.width - spacer, this.y - 5);
        context.lineTo(this.x + this.width - spacer - 4, this.y);

    }

    context.lineWidth = 2;


    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

};

Tooth.prototype.drawOrtondicoRemovible = function (context)
{
    console.log("Drawing Ortondico Removible");

    context.beginPath();

    var spacer = 5;

    if (this.type === TYPE_UPPER) {

        // draw ZigZag
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width / 2, this.y - 10);
        context.lineTo(this.x + this.width, this.y);

    } else {

        // draw ZigZag
        context.moveTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width / 2, this.y + this.height + 10);
        context.lineTo(this.x + this.width, this.y + this.height);

    }

    context.lineWidth = 2;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

}

/**
 * Method to draw damage Diente Extruido on tooth
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
Tooth.prototype.drawDienteExtruido = function (context)
{
    console.log("Drawing Diente Extruido");

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        // draw arrow head
        context.moveTo(this.x + 10, this.y + this.height + 10);
        context.lineTo(this.x + this.width / 2, this.y + this.height + 15);
        context.lineTo(this.x + this.width - 10, this.y + this.height + 10);

        // draw arrow line
        context.moveTo(this.x + this.width / 2 - 1, this.y + this.height + 10);
        context.lineTo(this.x + this.width / 2 - 1, this.y + this.height);


    } else {

        // draw arrow head
        context.moveTo(this.x + 10, this.y - 10);
        context.lineTo(this.x + this.width / 2, this.y - 15);
        context.lineTo(this.x + this.width - 10, this.y - 10);

        // draw arrow line
        context.moveTo(this.x + this.width / 2 - 1, this.y - 10);
        context.lineTo(this.x + this.width / 2 - 1, this.y);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.fillStyle = COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

};

/**
 * Method to draw damage Diente Intruido on the tooth
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
Tooth.prototype.drawDienteIntruido = function (context)
{
    console.log("Drawing Diente Intruido");

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        // draw arrow head
        context.moveTo(this.x + 10, this.y + this.height + 5);
        context.lineTo(this.x + this.width / 2, this.y + this.height);
        context.lineTo(this.x + this.width - 10, this.y + this.height + 5);

        // draw arrow line
        context.moveTo(this.x + this.width / 2 - 1, this.y + this.height + 5);
        context.lineTo(this.x + this.width / 2 - 1, this.y + this.height + 15);


    } else {

        // draw arrow head
        context.moveTo(this.x + 10, this.y - 5);
        context.lineTo(this.x + this.width / 2, this.y);
        context.lineTo(this.x + this.width - 10, this.y - 5);

        // draw arrow line
        context.moveTo(this.x + this.width / 2 - 1, this.y - 5);
        context.lineTo(this.x + this.width / 2 - 1, this.y - 15);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.fillStyle = COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

};

Tooth.prototype.drawProtesisRemovible = function (context)
{
    console.log("Drawing Protesis Removible");

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        // draw lower line
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);

        // draw upper line
        context.moveTo(this.x, this.y - 10);
        context.lineTo(this.x + this.width, this.y - 10);

    } else {

        // draw lower line
        context.moveTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.height);

        // draw upper line
        context.moveTo(this.x, this.y + this.height + 10);
        context.lineTo(this.x + this.width, this.y + this.height + 10);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.fillStyle = COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

};

Tooth.prototype.drawRemanenteRadicular = function (context)
{

    context.beginPath();

    context.fillStyle = COLOR_RED;

    context.font = "20px Arial Bold";

    if (this.type === TYPE_UPPER)
    {
        context.fillText("RR", this.x + 5, this.y + this.height / 2);
    } else
    {
        context.fillText("RR", this.x + 5, this.y + this.height / 2);
    }

    context.restore();

};

Tooth.prototype.drawGiroversion = function drawGiroversion(context)
{

    context.beginPath();

    var cx = this.x + this.width / 2;
    var cy = this.y + this.height;
    var radius = (this.width - 10) / 2;

    if (this.type === TYPE_UPPER)
    {

        // half circle
        context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, true);

        context.moveTo(this.x + this.width - 3, this.y + this.height);
        context.lineTo(this.x + this.width - 11, this.y + this.height);

        context.moveTo(this.x + this.width - 3, this.y + this.height);
        context.lineTo(this.x + this.width - 3, this.y + this.height + 8);

    } else
    {
        cy = this.y;
        // draw lower line
        context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, false);


        context.moveTo(this.x + 3, this.y);
        context.lineTo(this.x + 11, this.y);

        context.moveTo(this.x + 3, this.y);
        context.lineTo(this.x + 3, this.y - 8);
    }


    context.lineWidth = 2;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

}

Tooth.prototype.drawPernoMunon = function (context)
{
    context.beginPath();

    var size = this.width - 16;

    if (this.type === TYPE_UPPER)
    {
        // draw rectangle
        context.rect(this.x + 8, this.y + this.height - 8 - size, size, size);

        // draw line
        context.moveTo(this.x + this.width / 2, this.y + this.height - 8 - size);
        context.lineTo(this.x + this.width / 2, this.y + this.height - 8 - 50);

    } else
    {
        // draw rectangle
        context.rect(this.x + 8, this.y + 8, size, size);

        // draw line
        context.moveTo(this.x + this.width / 2, this.y + 8 + size);
        context.lineTo(this.x + this.width / 2, this.y + 8 + 50);
    }


    context.lineWidth = 2;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

};

Tooth.prototype.drawDienteEnErupcion = function (context)
{
    context.beginPath();

    var pad = 2;

    if (this.type === TYPE_UPPER)
    {
        // draw arrow head
        context.moveTo(this.x + pad, this.y + this.height - 6);
        context.lineTo(this.x + this.width / 2, this.y + this.height);
        context.lineTo(this.x + this.width - pad, this.y + this.height - 6);

        // draw zig zag
        context.moveTo(this.x + this.width / 2, this.y + this.height);
        context.lineTo(this.x + this.width / 2, this.y + this.height - 6);
        context.lineTo(this.x + pad * 3, this.y + this.height - 12);
        context.lineTo(this.x + this.width - pad * 3, this.y + this.height - 24);
        context.lineTo(this.x + pad * 3, this.y + this.height - 36);
        context.lineTo(this.x + this.width - pad * 3, this.y + this.height - 48);
        context.lineTo(this.x + pad * 3, this.y + this.height - 60);

    } else
    {
        // draw arrow head
        context.moveTo(this.x + pad, this.y + 6);
        context.lineTo(this.x + this.width / 2, this.y);
        context.lineTo(this.x + this.width - pad, this.y + 6);

        // draw zig zag
        context.moveTo(this.x + this.width / 2, this.y);
        context.lineTo(this.x + this.width / 2, this.y + 6);
        context.lineTo(this.x + this.width - pad * 3, this.y + 12);
        context.lineTo(this.x + pad * 3, this.y + 24);
        context.lineTo(this.x + this.width - pad * 3, this.y + 36);
        context.lineTo(this.x + pad * 3, this.y + 48);
        context.lineTo(this.x + this.width - pad * 3, this.y + 60);
    }

    context.lineWidth = 3;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();
};


Tooth.prototype.drawDienteEnClavija = function (context)
{
    context.beginPath();
    var space = 40 + this.spacer;

    context.lineWidth = 3;

    context.strokeStyle = COLOR_BLUE;

    if (this.type === TYPE_UPPER)
    {
        context.moveTo(this.x, this.y + this.height + space + 20);
        context.lineTo(this.x + this.width / 2, this.y + this.height + space - 10);
        context.lineTo(this.x + this.width, this.y + this.height + space + 20);

        context.closePath();
    } else
    {
        context.moveTo(this.x, this.y - space - 20);
        context.lineTo(this.x + this.width / 2, this.y - space + 10);
        context.lineTo(this.x + this.width, this.y - space - 20);

        context.closePath();

    }

    context.stroke();
    context.restore();

};

Tooth.prototype.drawProtesisTotal = function (context)
{

    context.beginPath();

    if (this.type === TYPE_UPPER) {
        context.moveTo(this.x, this.y + this.height - 10);
        context.lineTo(this.x + this.width, this.y + this.height - 10);
        
        context.moveTo(this.x, this.y + this.height - 15);
        context.lineTo(this.x + this.width, this.y + this.height - 15);

    } else {

        context.moveTo(this.x, this.y + 10);
        context.lineTo(this.x + this.width, this.y + 10);
        
        context.moveTo(this.x, this.y + 15);
        context.lineTo(this.x + this.width, this.y + 15);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.stroke();
    context.restore();

};

Tooth.prototype.drawFusion = function (context)
{
    var cx = this.x + this.width / 2;
  
    var radius = (this.width + 5) / 2;
  
    context.beginPath();

    if (this.type === TYPE_UPPER) {
       var cy = this.y + this.height + this.spacer + 45;
       context.ellipse(cx, cy, radius, radius - 15, 0, 0, 2 * Math.PI);

    } else {
        var cy = this.y - this.spacer - 50;
        context.ellipse(cx, cy, radius, radius - 15, 0, 0, 2 * Math.PI);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.stroke();
    context.restore();

}



/**
 * Method to draw a which tooth is highlighted
 * @param {type} context canvas for drawing
 * @returns {undefined}
 */
Tooth.prototype.drawHighlight = function(context)
{
    context.beginPath();

    if (this.type === TYPE_UPPER) {
        context.moveTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.height);

    } else {

        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = COLOR_HIGHLIGHT;
    context.stroke();
    context.restore();

};

/**
 * Method to draw a damage on a tooth
 * @param {type} context the canvas to draw
 * @returns {undefined}
 */
Tooth.prototype.drawDamage = function (context)
{

    for (var i = 0; i < this.damages.length; i++)
    {
        if (this.damages[i] === "1") {
            this.drawFractura(context);
        }

        if (this.damages[i] === "2")
        {
            this.drawDienteAusente(context);
        }

        if (this.damages[i] === "3")
        {
            this.drawPulpar(context);
        }

        if (this.damages[i] === "4")
        {
            this.drawMigracion(context);
        }

        if (this.damages[i] === "5")
        {
            this.drawOrtondicoRemovible(context);
        }

        if (this.damages[i] === "6")
        {
            this.drawDienteExtruido(context);
        }

        if (this.damages[i] === "7")
        {
            this.drawDienteIntruido(context);
        }

        if (this.damages[i] === "8")
        {
            this.drawProtesisRemovible(context);
        }

        if (this.damages[i] === "9")
        {
            this.drawRemanenteRadicular(context);
        }

        if (this.damages[i] === "10")
        {
            this.drawGiroversion(context);
        }

        if (this.damages[i] === "11")
        {
            this.drawPernoMunon(context);
        }

        if (this.damages[i] === "12")
        {
            this.drawDienteEnErupcion(context);
        }

        if (this.damages[i] === "15")
        {
            this.drawDienteEnClavija(context);
        }
        
        if (this.damages[i] === "16")
        {
            this.drawProtesisTotal(context);
        }
        
        if (this.damages[i] === "17")
        {
            this.drawFusion(context);
        }
    }
};

/**
 * Method to render a Tooth on the screen with all its states
 * @param {type} context the canvas to draw on
 * @returns {undefined}
 */
Tooth.prototype.render = function (context)
{
    if (this.image !== undefined) {

        // center of tooth
        var cx = (this.x + this.width / 2);

        // centerinng of the tooth in x axis
        var dx = cx - this.image.naturalWidth / 2;

        // draw tooth
        context.drawImage(this.image, dx, this.y);
    }

    this.drawId(context);

    this.drawCheckBoxes(context);

    this.drawDamage(context);

    if (this.highlight)
    {
        this.drawHighlight(context);
    }

    if (DEBUG) {
        
        this.rect.outline(context);
        
        if (this.rect.touching) {
            this.rect.highlight(context);
        }
        
        for(var i = 0; i < this.checkBoxes.length; i++)
        {
            if(this.checkBoxes[i].touching)
            {
                this.checkBoxes[i].highlight(context);
            }
            
        }

    }
};