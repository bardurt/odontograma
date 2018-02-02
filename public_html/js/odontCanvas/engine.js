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


document.writeln("<script type='text/javascript' src='js/odontCanvas/models/tooth.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/renderer.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/odontogramaGenerator.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/const.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/collisionHandler.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/colors.js'></script>");

var selectedHallazgo = "0";

var mouth = new Array();

function setCanvas(canvas) {
    init(canvas);
    
    load(canvas);
}

function prepare() {

    prepareOdontogramaAdult(mouth);
}

/**
 * Method to draw odontograma
 * @returns {undefined}
 */
function draw()
{
    render(mouth);
}

/**
 * Method to check for a collision between mouse cursor
 * and a tooth. Bounding box collision.
 * @param {type} obj the tooth 
 * @param {type} event mouse event containing x and y coords.
 * @returns {Boolean} true if there is a collision
 */
function checkCollision(obj, event)
{
    var x = event.clientX;
    var y = event.clientY;
    var width = obj.x + obj.width;
    var height = obj.y + obj.height;

    var collision = false;

    if (x >= obj.x) {
        if (y >= obj.y) {
            if (x <= width) {
                if (y <= height) {
                    collision = true;
                    console.log("Tooth surfaces " + obj.surfaces);
                }
            }
        }
    }

    return collision;

}

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
function onMouseClick(event)
{

    shouldUpdate = false;

    for (var i = 0; i < mouth.length; i++)
    {
        mouth[i].highlight = false;
        
        if(checkCollision(mouth[i], event)){
            
            handleCollision(mouth[i], selectedHallazgo);
            shouldUpdate = true;
        }
    }

    if (shouldUpdate) {
        draw();
    }

    console.log("X " + event.clientX);
    console.log("Y " + event.clientX);

}

/*'
 * Method to reset the odontograma
 * @returns {undefined}
 */
function reset()
{
    
    for(var i = 0; i < mouth.length; i++)
    {
        mouth[i].damages.length = 0;
    }
    
    draw();
}

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
function onButtonClick(event)
{
    console.log("key " + event.key);

    if (event.key === "f")
    {
        selectedHallazgo = "1";
    }
    
    if (event.key === "a")
    {
        selectedHallazgo = "2";
    } 
    
    if (event.key === "p")
    {
        selectedHallazgo = "3";
    } 
    
    if (event.key === "m")
    {
        selectedHallazgo = "4";
    } 
    
    if(event.key === "r")
    {
        selectedHallazgo = "5";
    }
    
    if(event.key === "e")
    {
        selectedHallazgo = "6";
    }
    
    if(event.key === "i")
    {
        selectedHallazgo = "7";
    }
    
    if(event.key === "t")
    {
        selectedHallazgo = "8";
    }
    
    if(event.key === "r")
    {
        selectedHallazgo = "9";
    }
    
    if(event.key === "g")
    {
        selectedHallazgo = "10";
    }
    
    if(event.key === "q")
    {
        selectedHallazgo = "11";
    }
    
    if (event.key === "h")
    {
        selectedHallazgo = "0";
    } 
    
    if (event.key === "z")
    {
        selectedHallazgo = "0";
        reset();
    } 
    
    if(event.key === "d"){
        
        DEBUG = !DEBUG;
        
        console.log("DEBUG: " + DEBUG);
        
        draw();
    }
}



Callback = function(val){
    if(val){
        draw();
        
        console.log("Will draw mouoth");
    }
}