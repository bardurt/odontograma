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

function Renderer()
{
    this.context;
    this.width = 0;
    this.height = 0;
}

/**
 * Method to show display a loading screen
 * @returns {undefined}
 */
Renderer.prototype.load = function()
{
    this.context.fillText("Loading...", this.width/2, this.height/2);
};

/**
 * Method to initialize the renderer for drawing the odontograma
 * @param {type} canvas the canvas to draw on
 * @returns {undefined}
 */
Renderer.prototype.init = function(canvas) {
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    console.log("Renderer init, context = " + this.context);
    
    this.load();
};


/**
 * Method to render odontograma
 * @param {type} mouth
 * @returns {undefined}
 */
Renderer.prototype.render = function(mouth)
{
    console.log("Renderer render, context = " +  this.context);
    
    // clear
    this.context.fillStyle ="#ffffff";
    this.context.fillRect(0, 0, this.width, this.height);
    
    this.context.restore();
    
    // draw the teeth
    for (var i = 0; i < mouth.length; i++) {

        mouth[i].render( this.context);
    }

};

/**
 * Method to render a point
 * @param {type} x 
 * @param {type} y
 * @param {type} width
 * @param {type} heigt
 * @returns {undefined}
 */
Renderer.prototype.renderRect = function(x, y, width, height, fill, center)
{
    this.context.beginPath();
    this.context.globalAlpha=0.2;
    if(fill)
    {
        this.context.fillStyle = COLOR_HIGHLIGHT;
        
        if(!center)
        {
            this.context.fillRect(x, y, width, height);  
        } 
        else
        {
            this.context.fillRect(x-width/2, y-height/2, width, height);   
        }
    }
    else
    {
        this.context.strokeStyle = COLOR_HIGHLIGHT;
        this.context.lineWidth = 1;
        
        if(!center)
        {
            this.context.rect(x, y, width, height);  
        } 
        else
        {
            this.context.rect(x-width/2, y-height/2, width, height);   
        }
        
        this.context.stroke();
    }
    
    this.context.globalAlpha=1;
    this.context.restore();
  
};

/**
 * Method to render text on canvas
 * @param {type} text the text to render
 * @param {type} x position on canvas
 * @param {type} y posiont on canvas
 * @returns {undefined}
 */
Renderer.prototype.renderText = function(text, x, y)
{
    this.context.fillStyle = '#000000';
    this.context.fillText(text, x, y);
    this.context.restore();
};