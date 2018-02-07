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


function Rect()
{
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.state = 0;
    this.touching = false;

}

Rect.prototype.cavity = function () {
    this.state = 1;
};

Rect.prototype.restoration = function () {
    this.state = 2;
};

Rect.prototype.uncheck = function () {
    this.state = 0;
};

Rect.prototype.checkCollision = function (cursX, cursY) {

    var collision = false;

    if (cursX > this.x) {
        if (cursY > this.y) {
            if (cursX < this.x + this.width) {
                if (cursY < this.y + this.height) {
                    collision = true;
                    console.log("Collision");
                }
            }
        }
    }

    return collision;

};

Rect.prototype.highlight = function (context) {

    context.beginPath();
    context.globalAlpha = 0.4;
    context.fillStyle = COLOR_ON_TOUCH;

    context.fillRect(this.x, this.y, this.width, this.height);

    context.globalAlpha = 1;
    context.restore();

};

Rect.prototype.highlightWithColor = function (context, color, alpha) {

    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;

    context.fillRect(this.x, this.y, this.width, this.height);

    context.globalAlpha = 1;
    context.restore();

};

Rect.prototype.outline = function (context, color) {

    context.beginPath();
    context.strokeStyle = color;
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.restore();

};

Rect.prototype.highlightEllipse = function (context, color, alpha) {

    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.ellipse(this.x + this.width/2, 
                    this.y + this.height/2, 
                    this.width/2, 
                    this.height/2, 
                    0,
                    0,
                    2 * Math.PI);
    context.fill();
    context.globalAlpha = 1;
    context.restore();

};
