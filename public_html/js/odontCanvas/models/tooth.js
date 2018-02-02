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
}

/**
 * Method to create a tooth with 4 surfaces
 * @returns {Tooth4.t|Tooth}
 */
function Tooth4() {

    var t = new Tooth();
    t.surfaces = 4;


    return t;

}

/**
 * Method to create a tooth with 5 surfaces
 * @returns {Tooth4.t|Tooth}
 */
function Tooth5() {

    var t = new Tooth();
    t.surfaces = 5;


    return t;
}

/**
 * Method to draw a tooth on canvas
 * @param {type} tooth to draw
 * @param {type} context of canvas to draw on
 * @returns {undefined}
 */
function drawTooth(tooth, context)
{
    context.drawImage(tooth.image, tooth.x, tooth.y);
    drawId(tooth, context);


    if (DEBUG) {
        context.beginPath();
        context.strokeStyle = '#000000';
        context.rect(tooth.x, tooth.y, tooth.width, tooth.height);
        context.stroke();
        context.restore();
    }

}

/**
 * Method to draw id of a tooth
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
function drawId(tooth, context)
{
    context.beginPath();
    context.fillStyle = "#000000";
    context.font = "15px Arial Bold";

    var space = 40;

    if (tooth.type === TYPE_UPPER)
    {
        // draw id
        context.fillText("" + tooth.id, tooth.x + 5, tooth.y + tooth.height + space + 10);

        // draw id border
        context.moveTo(tooth.x, tooth.y + tooth.height + space + 20);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height + space + 20);

        context.moveTo(tooth.x + tooth.width, tooth.y + tooth.height + space + 20);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height + space);
    } else
    {
        // draw id
        context.fillText("" + tooth.id, tooth.x + 5, tooth.y - space - 5);

        // draw id border
        context.moveTo(tooth.x, tooth.y - space - 20);
        context.lineTo(tooth.x + tooth.width, tooth.y - space - 20);

        context.moveTo(tooth.x + tooth.width, tooth.y - space - 20);
        context.lineTo(tooth.x + tooth.width, tooth.y - space);
    }

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = '#000000';
    context.stroke();
    context.restore();

}

/**
 * Method to toggle damage on a tooth on off
 * @param {type} tooth for damage
 * @param {type} damage to add or remove
 * @returns {undefined}
 */
function toggleDamage(tooth, damage) {

    console.log("Toggle damage for " + tooth.id + ", damage " + damage);

    if (tooth.damages.length < 1)
    {
        tooth.damages.push(damage);
    } else
    {
        var exists = false;
        var splicer = -1;

        for (var i = 0; i < tooth.damages.length; i++)
        {
            if (tooth.damages[i] === damage)
            {
                console.log("Splicing array for tooth " + tooth.id);

                splicer = i;
                exists = true;
                break;
            }
        }

        if (!exists)
        {
            tooth.damages.push(damage);
        } else
        {
            tooth.damages.splice(splicer, 1);
        }
    }
}

/**
 * Method to draw a damage on a tooth
 * @param {type} tooth the tooth to draw on
 * @param {type} context the canvas to draw
 * @returns {undefined}
 */
function renderDamage(tooth, context)
{

    for (var i = 0; i < tooth.damages.length; i++)
    {
        if (tooth.damages[i] === "1") {
            drawFractura(tooth, context);
        }

        if (tooth.damages[i] === "2")
        {
            drawDienteAusente(tooth, context);
        }

        if (tooth.damages[i] === "3")
        {
            drawPulpar(tooth, context);
        }

        if (tooth.damages[i] === "4")
        {
            drawMigracion(tooth, context);
        }

        if (tooth.damages[i] === "5")
        {
            drawOrtondicoRemovible(tooth, context);
        }

        if (tooth.damages[i] === "6")
        {
            drawDienteExtruido(tooth, context);
        }

        if (tooth.damages[i] === "7")
        {
            drawDienteIntruido(tooth, context);
        }

        if (tooth.damages[i] === "8")
        {
            drawProtesisRemovible(tooth, context);
        }

        if (tooth.damages[i] === "9")
        {
            drawRemanenteRadicular(tooth, context);
        }

        if (tooth.damages[i] === "10") 
        {
            drawGiroversion(tooth, context);
        }
        
        if(tooth.damages[i] === "11")
        {
            drawPernoMunon(tooth, context);
        }

    }
}

/**
 * Method to draw a fractura on a particular tooth
 * @param {type} tooth to draw damage on
 * @param {type} context canvas
 * @returns {undefined}
 */
function drawFractura(tooth, context)
{
    context.beginPath();

    if (tooth.type === TYPE_UPPER) {
        context.moveTo(tooth.x, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height / 2);

    } else {

        context.moveTo(tooth.x, tooth.y);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height / 2);
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
function drawDienteAusente(tooth, context)
{

    context.beginPath();

    console.log("Drawing upper");

    if (tooth.type === TYPE_UPPER) {

        context.moveTo(tooth.x, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height / 2);

        context.lineWidth = 2;

        // set line color
        context.strokeStyle = COLOR_BLUE;
        context.stroke();
        context.restore();

        context.moveTo(tooth.x + tooth.width, tooth.y + tooth.height);
        context.lineTo(tooth.x, tooth.y + tooth.height / 2);

        context.strokeStyle = COLOR_BLUE;
        context.stroke();


    } else {

        console.log("Drawing lower");

        context.moveTo(tooth.x, tooth.y);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height / 2);

        context.lineWidth = 2;

        // set line color
        context.strokeStyle = COLOR_BLUE;
        context.stroke();
        context.restore();

        context.moveTo(tooth.x + tooth.width, tooth.y);
        context.lineTo(tooth.x, tooth.y + tooth.height / 2);

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
function drawPulpar(tooth, context)
{
    console.log("Drawing pulpar");

    context.beginPath();

    if (tooth.type === TYPE_UPPER) {


        context.moveTo(tooth.x + tooth.width / 2, tooth.y + tooth.height - 10);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y + tooth.height / 2);

    } else {

        context.moveTo(tooth.x + tooth.width / 2, tooth.y + 10);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y + tooth.height / 2);

    }

    context.lineWidth = 2;

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
function drawMigracion(tooth, context)
{
    console.log("Drawing Migracion");

    context.beginPath();

    var spacer = 5;

    if (tooth.type === TYPE_UPPER) {

        // draw line
        context.moveTo(tooth.x + spacer, tooth.y + tooth.height + 5);
        context.lineTo(tooth.x + tooth.width - spacer, tooth.y + tooth.height + 5);

        // upper point
        context.moveTo(tooth.x + spacer, tooth.y + tooth.height + 5);
        context.lineTo(tooth.x + spacer + 4, tooth.y + tooth.height + 10);

        // lower point
        context.moveTo(tooth.x + spacer, tooth.y + tooth.height + 5);
        context.lineTo(tooth.x + spacer + 4, tooth.y + tooth.height);




    } else {

        // draw line
        context.moveTo(tooth.x + spacer, tooth.y - 5);
        context.lineTo(tooth.x + tooth.width - spacer, tooth.y - 5);

        // upper point
        context.moveTo(tooth.x + tooth.width - spacer, tooth.y - 5);
        context.lineTo(tooth.x + tooth.width - spacer - 4, tooth.y - 10);

        // upper point
        context.moveTo(tooth.x + tooth.width - spacer, tooth.y - 5);
        context.lineTo(tooth.x + tooth.width - spacer - 4, tooth.y);

    }

    context.lineWidth = 2;


    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

}

function drawOrtondicoRemovible(tooth, context)
{
    console.log("Drawing Ortondico Removible");

    context.beginPath();

    var spacer = 5;

    if (tooth.type === TYPE_UPPER) {

        // draw ZigZag
        context.moveTo(tooth.x, tooth.y);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y - 10);
        context.lineTo(tooth.x + tooth.width, tooth.y);

    } else {

        // draw ZigZag
        context.moveTo(tooth.x, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y + tooth.height + 10);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height);

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
function drawDienteExtruido(tooth, context)
{
    console.log("Drawing Diente Extruido");

    context.beginPath();

    if (tooth.type === TYPE_UPPER) {

        // draw arrow head
        context.moveTo(tooth.x + 5, tooth.y + tooth.height + 10);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y + tooth.height + 15);
        context.lineTo(tooth.x + tooth.width - 5, tooth.y + tooth.height + 10);

        // draw arrow line
        context.moveTo(tooth.x + tooth.width / 2 - 1, tooth.y + tooth.height + 10);
        context.lineTo(tooth.x + tooth.width / 2 - 1, tooth.y + tooth.height);


    } else {

        // draw arrow head
        context.moveTo(tooth.x + 5, tooth.y - 10);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y - 15);
        context.lineTo(tooth.x + tooth.width - 5, tooth.y - 10);

        // draw arrow line
        context.moveTo(tooth.x + tooth.width / 2 - 1, tooth.y - 10);
        context.lineTo(tooth.x + tooth.width / 2 - 1, tooth.y);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.fillStyle = COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

}

/**
 * Method to draw damage Diente Intruido on the tooth
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
function drawDienteIntruido(tooth, context)
{
    console.log("Drawing Diente Intruido");

    context.beginPath();

    if (tooth.type === TYPE_UPPER) {

        // draw arrow head
        context.moveTo(tooth.x + 5, tooth.y + tooth.height + 5);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width - 5, tooth.y + tooth.height + 5);

        // draw arrow line
        context.moveTo(tooth.x + tooth.width / 2 - 1, tooth.y + tooth.height + 5);
        context.lineTo(tooth.x + tooth.width / 2 - 1, tooth.y + tooth.height + 15);


    } else {

        // draw arrow head
        context.moveTo(tooth.x + 5, tooth.y - 5);
        context.lineTo(tooth.x + tooth.width / 2, tooth.y);
        context.lineTo(tooth.x + tooth.width - 5, tooth.y - 5);

        // draw arrow line
        context.moveTo(tooth.x + tooth.width / 2 - 1, tooth.y - 5);
        context.lineTo(tooth.x + tooth.width / 2 - 1, tooth.y - 15);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.fillStyle = COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

}

function drawProtesisRemovible(tooth, context)
{
    console.log("Drawing Protesis Removible");

    context.beginPath();

    if (tooth.type === TYPE_UPPER) {

        // draw lower line
        context.moveTo(tooth.x, tooth.y);
        context.lineTo(tooth.x + tooth.width, tooth.y);

        // draw upper line
        context.moveTo(tooth.x, tooth.y - 10);
        context.lineTo(tooth.x + tooth.width, tooth.y - 10);

    } else {

        // draw lower line
        context.moveTo(tooth.x, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height);

        // draw upper line
        context.moveTo(tooth.x, tooth.y + tooth.height + 10);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height + 10);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = COLOR_BLUE;
    context.fillStyle = COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

}

function drawRemanenteRadicular(tooth, context)
{

    context.beginPath();

    context.fillStyle = COLOR_RED;

    context.font = "20px Arial Bold";

    if (tooth.type === TYPE_UPPER)
    {
        context.fillText("RR", tooth.x + 5, tooth.y + tooth.height / 2);
    } else
    {
        context.fillText("RR", tooth.x + 5, tooth.y + tooth.height / 2);
    }

    context.restore();

}

function drawGiroversion(tooth, context)
{

    context.beginPath();
    
    var cx = tooth.x + tooth.width / 2;
    var cy = tooth.y + tooth.height;
    var radius = (tooth.width - 10) / 2;

    if (tooth.type === TYPE_UPPER)
    {

        // draw lower line
        context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, true);
        
        context.moveTo(tooth.x + tooth.width - 3, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width - 11, tooth.y + tooth.height);
        
        context.moveTo(tooth.x + tooth.width - 3, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width - 3, tooth.y + tooth.height + 8);

    } 
    else
    {
        cy = tooth.y;
        // draw lower line
        context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, false);
        
          
        context.moveTo(tooth.x + 3, tooth.y);
        context.lineTo(tooth.x + 11, tooth.y);
        
        context.moveTo(tooth.x + 3, tooth.y);
        context.lineTo(tooth.x + 3, tooth.y - 8);
    }


    context.lineWidth = 2;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();

}

function drawPernoMunon(tooth, context)
{
    context.beginPath();
    
    var size = tooth.width - 16;

    if (tooth.type === TYPE_UPPER)
    {
       // draw rectangle
       context.rect(tooth.x + 8, tooth.y + tooth.height - 8 - size, size, size);
       
       // draw line
       context.moveTo(tooth.x + tooth.width / 2, tooth.y + tooth.height  - 8 - size);
       context.lineTo(tooth.x + tooth.width / 2, tooth.y + tooth.height - 8 - 30);

    } 
    else
    {
        // draw rectangle
       context.rect(tooth.x + 8, tooth.y + 8, size, size);
       
       // draw line
       context.moveTo(tooth.x + tooth.width / 2, tooth.y + 8 + size);
       context.lineTo(tooth.x + tooth.width / 2, tooth.y + 8 + 30);
    }


    context.lineWidth = 2;

    context.strokeStyle = COLOR_BLUE;

    context.stroke();
    context.restore();
    
}

/**
 * Method to draw a which tooth is highlighted
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
function drawHighlight(tooth, context)
{

    context.beginPath();

    if (tooth.type === TYPE_UPPER) {
        context.moveTo(tooth.x, tooth.y + tooth.height);
        context.lineTo(tooth.x + tooth.width, tooth.y + tooth.height);

    } else {

        context.moveTo(tooth.x, tooth.y);
        context.lineTo(tooth.x + tooth.width, tooth.y);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = COLOR_HIGHLIGHT;
    context.stroke();
    context.restore();

    console.log("Drawing highlight");
}

