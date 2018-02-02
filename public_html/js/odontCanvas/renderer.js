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


var context;
var width;
var height;

/**
 * Method to initialize the renderer for drawing the odontograma
 * @param {type} canvas the canvas to draw on
 * @returns {undefined}
 */
function init(canvas) {
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
}


/**
 * Method to draw a damage on a tooth
 * @param {type} tooth
 * @param {type} context
 * @returns {undefined}
 */
function drawDamage(tooth, context)
{
    renderDamage(tooth, context);
}

/**
 * Method to render odontograma
 * @param {type} mouth
 * @returns {undefined}
 */
function render(mouth)
{

    // draw the teeth
    for (var i = 0; i < mouth.length; i++) {

        drawTooth(mouth[i], context);
    }

    // draw all damages
    for (var i = 0; i < mouth.length; i++) {

        // only draw those which have damages
        if (mouth[i].damages.length > 0) {
            drawDamage(mouth[i], context);
        }

        if (mouth[i].highlight)
        {
            drawHighlight(mouth[i], context);
        }
    }

}


/**
 * Method to redraw / update the canvas
 * this method should be called when there are updates in 
 * the odontograma
 * @returns {undefined}
 */
function redraw()
{

    console.log("Redrawing");

    context.clearRect(0, 0, width, height);
    draw();
}