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

/**
 * Helper class for drawing items on a canvas
 * @returns {Renderer}
 */
function Renderer()
{
    this.context;
    this.width = 0;
    this.height = 0;
    this.settings;
}

/**
 * Method to render a splash screen
 * @returns {undefined}
 */
Renderer.prototype.drawSplash = function()
{
    
    this.context.fillStyle ="#ffffff";
    this.context.fillRect(0, 0, this.width, this.height);
    
    this.context.beginPath();
    this.context.textAlign = 'center';
    this.context.fillStyle = "#000000";
    this.context.font = "32px Arial Bold";
    this.context.fillText("OdontoGraph 1.0.0", this.width/2, this.height/2 -16);
    this.context.font = "18px Arial Bold";
    this.context.fillStyle = "#000000";
    
    this.context.fillText("Bardur Thomsen - 2018", this.width/2, this.height/2 + 40);
};

/**
 * Method to initialize the renderer for drawing the odontograma
 * @param {type} canvas the canvas to draw on
 * @returns {undefined}
 */
Renderer.prototype.init = function(canvas) 
{
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    
    this.drawSplash();
};

/**
 * Method to clear the canvas
 * @param {type} settings for color, and debug state
 * @returns {undefined}
 */
Renderer.prototype.clear = function(settings)
{
    
    // clear the canvas
    if(settings.DEBUG) {
        this.context.fillStyle ="#e6fff3";
    } else {
        this.context.fillStyle ="#ffffff";
    }
    
    this.context.fillRect(0, 0, this.width, this.height);
    
    this.context.restore();
    
};

/**
 * Method to render odontograma
 * @param {type} data list of teeth for odontograma
 * @param {type} settings for the canvas
 * @param {type} constants which are used for the engine
 * @returns {undefined}
 */
Renderer.prototype.render = function(data, settings, constants)
{
    
    // draw the teeth
    for (var i = 0; i < data.length; i++) {

        data[i].render( this.context, settings, constants);
    }

};

/**
 * Method to render text on canvas
 * @param {type} text the text to render
 * @param {type} x position on canvas
 * @param {type} y position on canvas
 * @param {type} color the color which the text should be
 * @returns {undefined}
 */
Renderer.prototype.renderText = function(text, x, y, color)
{
    if(color === undefined){
        color = "#000000"; // default color = black
    }
    
    this.context.textAlign = 'left';
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};

/**
 * Method to set app settings to the renderer
 * @param {type} settings the settings for the application
 * @returns {undefined}
 */
Renderer.prototype.setSettings = function(settings){
    this.settings = settings;
};