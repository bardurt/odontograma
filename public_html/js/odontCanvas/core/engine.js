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
document.writeln("<script type='text/javascript' src='js/odontCanvas/util/const.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/util/colors.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/rect.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/damage.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/tooth.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/renderer.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/odontogramaGenerator.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/collisionHandler.js'></script>");

function Engine()
{
    this.adultShowing = true;

    this.mouth = new Array();
    this.spaces = new Array();

    this.odontAdult = new Array();
    this.odontChild = new Array();

    this.odontSpaceAdult = new Array();

    this.renderer = new Renderer();
    this.odontogramaGenerator = new OdontogramaGenerator();
    this.collisionHandler = new CollisionHandler();
    this.selectedHallazgo = "0";

    this.canvas = null;

    this.cursorX = 0;
    this.corsorY = 0;

    this.multiSelect = false;
    this.multiSelection = Array();

}

/**
 * Method to set the canvas for the engine.
 * @param {type} canvas the canvas which will be used for drawing
 * @returns {undefined}
 */
Engine.prototype.setCanvas = function (canvas)
{
    console.log("Engine, setting canvas: " + canvas);
    this.canvas = canvas;
    this.renderer.init(this.canvas);
};


Engine.prototype.getXpos = function (event)
{

    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientX - (boundingRect.left));
};

Engine.prototype.getYpos = function (event)
{

    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientY - (boundingRect.top));
};

/**
 * Method to prepare the engine
 * @returns {undefined}
 */
Engine.prototype.init = function () {

    // set up the odontograma
    this.odontogramaGenerator.setEngine(this);
    this.odontogramaGenerator.prepareOdontogramaAdult(this.odontAdult, this.canvas);
    this.odontogramaGenerator.prepareOdontogramaChild(this.odontChild, this.canvas);

    this.mouth = this.odontAdult;
};

/**
 * Method for updating
 * @returns {undefined}
 */
Engine.prototype.update = function ()
{
    this.renderer.render(this.mouth);

    if (DEBUG) {

        this.renderer.renderText("DEBUG MODE", 2, 15, "#000000");
        this.renderer.renderText("X: " + this.cursorX + ", Y: " + this.cursorY, 128, 15, "#000000");
    }
};

/**
 * Method to check for a collision between mouse cursor
 * and a tooth. Bounding box collision.
 * @param {type} obj the tooth 
 * @param {type} event mouse event containing x and y coords.
 * @returns {Boolean} true if there is a collision
 */
Engine.prototype.checkCollision = function (obj, event)
{
    var x = event.clientX;
    var y = event.clientY;
    var width = obj.x + obj.width;
    var height = obj.y + obj.height;

    var collision = false;

    if (x > obj.x) {
        if (y > obj.y) {
            if (x < width) {
                if (y < height) {
                    collision = true;
                }
            }
        }
    }

    return collision;
};

Engine.prototype.printMultiSelection = function () {

    console.log("Multi Select count: " + this.multiSelection.length);
    for (var i = 0; i < this.multiSelection.length; i++) {

        console.log("multiSelection[" + i + "]: " + this.multiSelection[i].id);

    }

};


Engine.prototype.openMouth = function () {
    console.log("Opening mouth");
    for (var i = 0; i < this.mouth.length; i++) {

        this.mouth[i].open();
    }
};

Engine.prototype.resetMultiSelect = function () {

    this.multiSelect = false;
    this.multiSelection.length = 0;

    this.openMouth();

    this.update();
};

Engine.prototype.createDiastema = function (tooth1, tooth2)
{
    console.log("Engine: creating diastema");

    if (tooth1.address < tooth2.address)
    {
        damage1 = tooth1.createDamage("21");

        damage1.direction = 0;

        tooth1.damages.push(damage1);

        damage2 = tooth2.createDamage("21");

        damage2.direction = 1;

        tooth2.damages.push(damage2);

        this.resetMultiSelect();

    } else {

        damage1 = tooth1.createDamage("21");

        damage1.direction = 1;

        tooth1.damages.push(damage1);

        damage2 = tooth2.createDamage("21");

        damage2.direction = 0;

        tooth2.damages.push(damage2);

        this.resetMultiSelect();

    }

};

Engine.prototype.handleMultiSelection = function ()
{

    console.log("handleMultiSelection called");

    if (this.multiSelection.length === 2) {

        item1 = this.multiSelection[0];
        item2 = this.multiSelection[1];

        if (item1.type === item2.type) {
            console.log("Multi select same type");

            var result = Math.abs(item1.address - item2.address);

            console.log("Math.abs = " + result);

            if (result === 1) {
                console.log("Multi select Neighbours");
                this.createDiastema(item1, item2);
            } else {
                console.log("Multi select NOT Neighbours");
            }

        } else {
            console.log("Multi select NOT same type");

        }

    } else {

    }

};

Engine.prototype.addToMultiSelection = function (tooth)
{

    this.multiSelection.push(tooth);

    this.printMultiSelection();

    this.handleMultiSelection();

    for (var i = 0; i < this.mouth.length; i++) {

        if (i !== tooth.address) {
            this.mouth[i].lock();
        }

    }

};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseClick = function (event)
{

    shouldUpdate = false;

    // loop through all teeth
    for (var i = 0; i < this.mouth.length; i++)
    {
        this.mouth[i].toggleSelected(false);

        // check collision for current tooth
        if (this.mouth[i].checkCollision(
                this.getXpos(event),
                this.getYpos(event))) {

            if (!this.multiSelect) {

                this.collisionHandler.handleCollision(this.mouth[i], this.selectedHallazgo);

            } else {

                this.addToMultiSelection(this.mouth[i]);


            }
            shouldUpdate = true;
        }

        // check if there is a collision with one of the tooth surfaces
        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
        {
            if (this.mouth[i].checkBoxes[j].checkCollision(this.getXpos(event), this.getYpos(event)))
            {
                this.collisionHandler.handleCollisionCheckBox(this.mouth[i].checkBoxes[j], this.selectedHallazgo);
                shouldUpdate = true;
            }
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};

Engine.prototype.followMouse = function (event)
{

    this.cursorX = this.getXpos(event);
    this.cursorY = this.getYpos(event);

    this.update();
};

/**
 * Event handler for when the mouse is moved
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseMove = function (event)
{


    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].checkCollision(this.getXpos(event), this.getYpos(event)))
        {
            this.mouth[i].onTouch(true);
        } else
        {
            this.mouth[i].onTouch(false);
        }

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
        {
            if (this.mouth[i].checkBoxes[j].checkCollision(this.getXpos(event), this.getYpos(event)))
            {
                this.mouth[i].checkBoxes[j].touching = true;
            } else
            {
                this.mouth[i].checkBoxes[j].touching = false;
            }
        }
    }

    this.followMouse(event);

};

/*'
 * Method to reset the odontograma
 * @returns {undefined}
 */
Engine.prototype.reset = function ()
{

    for (var i = 0; i < this.mouth.length; i++)
    {
        this.mouth[i].damages.length = 0;

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
        {
            this.mouth[i].checkBoxes[j].state = 0;
        }
    }

    this.update();
};

/**
 * Method to save the odontograma as an image file
 * @returns {undefined}
 */
Engine.prototype.save = function ()
{

    // save image as png
    var link = document.createElement('a');
    link.download = "test.png";
    link.href = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    link.click();

};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onButtonClick = function (event)
{
    console.log("key " + event.key);

    if (event.key === "1")
    {
        this.selectedHallazgo = "1";
    }

    if (event.key === "2")
    {
        this.selectedHallazgo = "2";
    }

    if (event.key === "3")
    {
        this.selectedHallazgo = "3";
    }

    if (event.key === "4")
    {
        this.selectedHallazgo = "4";
    }

    if (event.key === "5")
    {
        this.selectedHallazgo = "5";
    }

    if (event.key === "6")
    {
        this.selectedHallazgo = "6";
    }

    if (event.key === "7")
    {
        this.selectedHallazgo = "7";
    }

    if (event.key === "8")
    {
        this.selectedHallazgo = "8";
    }

    if (event.key === "9")
    {
        this.selectedHallazgo = "9";
    }

    if (event.key === "0")
    {
        this.selectedHallazgo = "10";
    }

    if (event.key === "q")
    {
        this.selectedHallazgo = "11";
    }

    if (event.key === "w")
    {
        this.selectedHallazgo = "12";
    }

    if (event.key === "r")
    {
        this.selectedHallazgo = "13";
    }

    if (event.key === "b")
    {
        this.selectedHallazgo = "14";
    }

    if (event.key === "e")
    {
        this.selectedHallazgo = "15";
    }

    if (event.key === "t")
    {
        this.selectedHallazgo = "16";
    }

    if (event.key === "y")
    {
        this.selectedHallazgo = "17";
    }

    if (event.key === "u")
    {
        this.selectedHallazgo = "18";
    }

    if (event.key === "i")
    {
        this.selectedHallazgo = "19";
    }

    if (event.key === "o")
    {
        this.selectedHallazgo = "20";
    }

    if (event.key === "a") {

        this.selectedHallazgo = "21";

    }

    if (event.key === "h")
    {
        this.selectedHallazgo = "0";
    }

    if (event.key === "z")
    {
        this.selectedHallazgo = "0";
        this.reset();
    }

    if (event.key === "m")
    {
        this.selectedHallazgo = "0";
        this.save();
    }

    if (event.key === "d") {

        DEBUG = !DEBUG;

        console.log("DEBUG: " + DEBUG);

        this.update();
    }



    if (event.key === "Control") {

        this.multiSelect = !this.multiSelect;
        console.log("multiselect: " + this.multiSelect);
        if (!this.multiSelect) {
            this.multiSelection.length = 0;
            this.openMouth();
        }

    }

    if (event.key === "F1") {

        this.adultShowing = true;
        console.log("Setting odontograma to adult");
        this.mouth = this.odontAdult;
        this.update();

    }

    if (event.key === "F2") {

        this.adultShowing = false;
        console.log("Setting odontograma to child");
        this.mouth = this.odontChild;
        this.update();

    }

};

Engine.prototype.splash = function () {

    this.renderer.drawSplash();

    var self = this;

    setTimeout(function () {
        self.update();
    }, 3000);

};