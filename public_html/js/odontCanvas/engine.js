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
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/rect.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/tooth.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/renderer.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/odontogramaGenerator.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/const.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/collisionHandler.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/colors.js'></script>");

function Engine()
{
    this.renderer = new Renderer();
    this.odontogramaGenerator = new OdontogramaGenerator();
    this.collisionHandler = new CollisionHandler();
    this.selectedHallazgo = "0";
    this.mouth = new Array();
    this.canvas = null;

    this.cursorX = 0;
    this.corsorY = 0;

}

Engine.prototype.setCanvas = function (canvas)
{
    console.log("Engine, setting canvas: " + canvas);
    this.canvas = canvas;
    this.renderer.init(this.canvas);
};


Engine.prototype.init = function () {

    this.odontogramaGenerator.setEngine(this);
    this.odontogramaGenerator.prepareOdontogramaAdult(this.mouth);
};

/**
 * Method to draw odontograma
 * @returns {undefined}
 */
Engine.prototype.draw = function ()
{
    this.renderer.render(this.mouth);

    if (DEBUG) {
       
       this.renderer.renderText("X: " + this.cursorX + ", Y: "  + this.cursorY, 2, 15);
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
                    console.log("Tooth surfaces " + obj.surfaces);
                }
            }
        }
    }

    return collision;
};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseClick = function (event)
{

    shouldUpdate = false;

    for (var i = 0; i < this.mouth.length; i++)
    {
        this.mouth[i].highlight = false;

        if (this.checkCollision(this.mouth[i], event)) {

            this.collisionHandler.handleCollision(this.mouth[i], this.selectedHallazgo);
            shouldUpdate = true;
        }

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
        {
            if (this.mouth[i].checkBoxes[j].checkCollision(event.clientX, event.clientY))
            {
                this.collisionHandler.handleCollisionCheckBox(this.mouth[i].checkBoxes[j], this.selectedHallazgo);
                shouldUpdate = true;
            }
        }
    }

    if (shouldUpdate) {
        this.draw();
    }

    console.log("X " + event.clientX);
    console.log("Y " + event.clientX);

};

Engine.prototype.followMouse = function (event)
{

    this.cursorX = event.clientX;
    this.cursorY = event.clientY;

    this.draw();

    console.log("On mouse move called");
};

/**
 * Event handler for when the mouse is moved
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseMove = function (event)
{
    if (DEBUG)
    {
        this.followMouse(event);
        
        
        for(var i = 0; i < this.mouth.length; i++){
            
            if(this.mouth[i].checkCollision(event.clientX, event.clientY))
            {
                this.mouth[i].onTouch(true);
            }
            else
            {
                this.mouth[i].onTouch(false);
            }
            
            for(var j = 0; j < this.mouth[i].checkBoxes.length; j++ )
            {
                if(this.mouth[i].checkBoxes[j].checkCollision(event.clientX, event.clientY))
                {
                    this.mouth[i].checkBoxes[j].touching = true;
                }
                else
                {
                    this.mouth[i].checkBoxes[j].touching = false;
                }
            }
        }
    }
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

    this.draw();
};


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

        this.draw();
    }
};
