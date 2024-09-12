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

/*
 * Class for a rectangle
 * @returns {Rect}
 */
function Rect() {
    "use strict";
    this.id = "";
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.state = 0;
    this.touching = false;

}

Rect.prototype.cavity = function () {
    "use strict";
    this.state = 1;
};

Rect.prototype.restoration = function () {
    "use strict";
    this.state = 11;
};

Rect.prototype.uncheck = function () {
    "use strict";
    this.state = 0;
};

/**
 * Method to if a point is inside the rectangle
 * @param {type} cursX x coordinate of point
 * @param {type} cursY y coordinate of point
 * @returns {Boolean} true if collision, false else
 */
Rect.prototype.checkCollision = function (cursX, cursY) {
    "use strict";
    var collision = false;

    if (cursX > this.x) {
        if (cursY > this.y) {
            if (cursX < this.x + this.width) {
                if (cursY < this.y + this.height) {
                    collision = true;
                    
                    console.log("Collision cb: " + this.id);
                }
            }
        }
    }

    return collision;

};

/**
 * Method to highlight a the checkbox
 * @param {type} context canvas to draw on
 * @param {type} settings global highlight color of checkbox
 * @returns {undefined}
 */
Rect.prototype.highlight = function (context, settings) {
    "use strict";
    context.beginPath();
    context.globalAlpha = 0.4;
    context.fillStyle = settings.COLOR_ON_TOUCH;

    context.fillRect(this.x, this.y, this.width, this.height);

    context.globalAlpha = 1;
    context.restore();

};

/**
 * Method to higlight the checkbox with a specific color
 * @param {type} context canvas to draw on
 * @param {type} color the color of the highlight
 * @param {type} alpha alpha valu of the color
 * @returns {undefined}
 */
Rect.prototype.highlightWithColor = function (context, color, alpha) {
    "use strict";
    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;

    context.fillRect(this.x, this.y, this.width, this.height);

    context.globalAlpha = 1;
    context.restore();

};

/**
 * Method to outline the rectangle with a specific color
 * @param {type} context canvas to draw on
 * @param {type} color the color for the outline
 * @returns {undefined}
 */
Rect.prototype.outline = function (context, color) {
    "use strict";
    context.beginPath();
    context.lineWidth = 1;
    context.globalAlpha = 1;
    context.strokeStyle = color;
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.restore();

};

/**
 * Method to draw an ellipse with center of rectangle center
 * @param {type} context the canvas to draw on
 * @param {type} color the color of the ellipses
 * @param {type} alpha the alpha value of the color
 * @param {type} padding padding for the ellipses default is 0;
 * @returns {undefined}
 */
Rect.prototype.highlightEllipse = function (context, color, alpha, padding) {
    "use strict";
    if (padding === undefined){
        padding = 0;
    }

    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;
    
    context.ellipse(this.x + this.width / 2, 
                    this.y + this.height / 2, 
                    (this.width - padding) / 2, 
                    (this.height - padding) / 2, 
                    0,
                    0,
                    2 * Math.PI);
                    
    context.fill();
    context.globalAlpha = 1;
    context.restore();

};


/**
 * Method to fill rectangle with color
 * @param {type} context the canvas to draw on
 * @param {type} color the color of the ellipses
 * @returns {undefined}
 */
Rect.prototype.fillColor = function (context, color) {
    "use strict";
    context.beginPath();
    context.fillStyle = color;

    context.fillRect(this.x,
            this.y,
            this.width,
            this.height);

    context.restore();

    context.stroke();
    context.restore();

};
