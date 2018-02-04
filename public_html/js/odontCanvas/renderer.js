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
    this.context.clearRect(0, 0, this.width, this.height);
    
    // draw the teeth
    for (var i = 0; i < mouth.length; i++) {

        mouth[i].render( this.context);
    }

};