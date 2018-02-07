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
    this.tooth = true;
    this.surfaces = 0;
    this.highlight = false;
    this.damages = Array();
    this.checkBoxes = Array();
    this.rect = new Rect();
    this.spacer = 20; // spacer to seperate tooth from surfaces
    this.touching = false;
    this.address = 0;
    this.normalY;
    this.highY;
    this.blocked = false;

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

    this.normalY = y;

};

/**
 * Method to set the type of the tooth
 * @param {type} type of the tooth, upper or lower
 * @returns {undefined}
 */
Tooth.prototype.setType = function (type)
{
    this.type = type;

    if (type === TYPE_UPPER) {
        this.highY = this.y - 10;
    } else {
        this.highY = this.y + 10;
    }
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

Tooth.prototype.toggleSelected = function (selected)
{
    this.highlight = selected;
};

/**
 * Method to create 4 surfaces for the tooth, 4 checkboxes
 * @returns {undefined}
 */
Tooth.prototype.create4Surfaces = function (settings)
{
    var width = settings.RECT_DIMEN;

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
Tooth.prototype.create5Surfaces = function (settings)
{
    var width = settings.RECT_DIMEN;

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
Tooth.prototype.createSurfaces = function (settings)
{
    if (this.surfaces === 4)
    {
        this.create4Surfaces(settings);
    } else
    {
        this.create5Surfaces(settings);
    }
};


Tooth.prototype.drawId = function (context)
{
    context.beginPath();
    context.textAlign = 'center';
    context.fillStyle = "#000000";
    context.font = "15px Arial Bold";

    var space = 40 + this.spacer;

    if (this.type === TYPE_UPPER)
    {
        // draw id
        context.fillText("" + this.id, this.rect.x + this.rect.width/2, this.rect.y + this.rect.height + space + 10);

        // draw id border
        context.moveTo(this.rect.x, this.rect.y + this.rect.height + space + 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + space + 20);

        context.moveTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + space + 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + space);
    } else
    {
        // draw id
        context.fillText("" + this.id, this.rect.x + this.rect.width/2, this.rect.y - space - 5);

        // draw id border
        context.moveTo(this.rect.x, this.rect.y - space - 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y - space - 20);

        context.moveTo(this.rect.x + this.rect.width, this.rect.y - space - 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y - space);
    }

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = '#000000';
    context.stroke();
    context.restore();


};

Tooth.prototype.drawCheckBoxOutLine = function (checkBox, context, settings)
{
    context.beginPath();

    context.rect(checkBox.x,
            checkBox.y,
            checkBox.width,
            checkBox.height);

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = settings.COLOR_BLACK;
    context.stroke();
    context.restore();
};

Tooth.prototype.drawCheckBoxRed = function (checkBox, context, settings)
{

    context.beginPath();
    context.fillStyle = settings.COLOR_RED;

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
    context.strokeStyle = settings.COLOR_BLACK;
    context.stroke();
    context.restore();
};

Tooth.prototype.drawCheckBoxBlue = function (checkBox, context, settings) {

    context.beginPath();
    context.fillStyle = settings.COLOR_BLUE;

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
    context.strokeStyle = settings.COLOR_BLACK;
    context.stroke();
    context.restore();
};


Tooth.prototype.drawCheckBoxes = function (context, settings)
{
    for (var i = 0; i < this.checkBoxes.length; i++)
    {

        if (this.checkBoxes[i].state === 1)
        {
            this.drawCheckBoxRed(this.checkBoxes[i], context, settings);
            
        } else if (this.checkBoxes[i].state === 2)
        {
            this.drawCheckBoxBlue(this.checkBoxes[i], context, settings);
            
        } else
        {
            this.drawCheckBoxOutLine(this.checkBoxes[i], context, settings);
        }

    }
};

/**
 * Method to toggle Touchin on / off
 * @param {type} touch boolean value 
 * @returns {undefined}
 */
Tooth.prototype.onTouch = function (touch)
{
    if (touch)
    {
        this.y = this.highY;

    } else {
        this.y = this.normalY;
    }

    this.rect.touching = touch;
};


Tooth.prototype.createDamage = function (damageId)
{
    var damage;

    if (damageId === "17" || damageId === "18" || damageId === "19" || damageId === "20") {


        if (this.type === TYPE_UPPER) {
            damage = new Damage(damageId,
                    this.rect.x,
                    this.rect.y + this.rect.height + this.spacer,
                    this.width,
                    60,
                    this.type);
        } else {
            damage = new Damage(damageId,
                    this.rect.x,
                    this.rect.y - this.spacer - 60,
                    this.width,
                    60,
                    this.type);
        }

    } else {

        damage = new Damage(damageId,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height,
                this.type);
    }

    //console.log("Create damage: " + damageId);

    return damage;
};

/**
 * Method to toggle damage on a tooth on off
 * @param {type} damageId to add or remove
 * @returns {undefined}
 */
Tooth.prototype.toggleDamage = function (damageId) {

    //console.log("Toggle damage for " + this.id + ", damage " + damageId);

    if (this.damages.length < 1) {

        var d = this.createDamage(damageId);

        if (d !== undefined) {
            this.damages.push(d);
        }

    } else {
        var exists = false;
        var splicer = -1;

        for (var i = 0; i < this.damages.length; i++) {
            if (this.damages[i].id === damageId)
            {
                console.log("Splicing array for tooth " + this.id);

                splicer = i;
                exists = true;
                break;
            }
        }

        if (!exists) {

            var d = this.createDamage(damageId);

            if (d !== undefined) {
                this.damages.push(d);
            }

        } else {

            this.damages.splice(splicer, 1);
        }
    }
};


/**
 * Method to render a Tooth on the screen with all its states
 * @param {type} context the canvas to draw on
 * @param {type} settings app settings
 * @returns {undefined}
 */
Tooth.prototype.render = function (context, settings)
{

    if (this.tooth) {
        if (this.image !== undefined) {

            // center of tooth
            var cx = (this.x + this.width / 2);

            // centerinng of the tooth in x axis
            var dx = cx - this.image.naturalWidth / 2;

            // draw tooth
            context.drawImage(this.image, dx, this.y);
        }

        this.drawId(context);

        this.drawCheckBoxes(context, settings);

    } else {
        
       if(settings.HIHGLIGHT_SPACES) {
        
            if (this.rect.touching) {
            
                this.rect.highlightEllipse(context, "#00AEFF", 0.5, -10);
            } else{
                this.rect.highlightEllipse(context, "#19B900", 0.2, 10);
            }
        }
    }

    // draw all damages
    for (var i = 0; i < this.damages.length; i++) {
        this.damages[i].render(context, settings);
    }

    if (settings.DEBUG) {

        if(this.tooth){
            this.rect.outline(context, "#000000");
        } else {
            this.rect.highlightEllipse(context, "#FFD100", 0.4, 2);
        }
    }

    for (var i = 0; i < this.checkBoxes.length; i++)
    {
        if (this.checkBoxes[i].touching)
        {
            this.checkBoxes[i].highlightWithColor(context, "#36BE1B", 0.6);
        }

    }

};