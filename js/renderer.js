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
function Renderer() {
    "use strict";
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.settings = null;
}

/**
 * Method to render a splash screen
 * @returns {undefined}
 */
Renderer.prototype.drawSplash = function () {
    "use strict";

    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.context.textAlign = 'center';
    this.context.fillStyle = "#000000";
    this.context.font = "32px Arial Bold";
    this.context.fillText("OdontoGraph 1.0.0", this.width / 2,
            this.height / 2 - 16);

    this.context.font = "18px Arial Bold";
    this.context.fillStyle = "#000000";

    this.context.fillText("Bardur Thomsen - 2018", this.width / 2, this.height / 2 + 40);
};

/**
 * Method to initialize the renderer for drawing the odontograma
 * @param {type} canvas the canvas to draw on
 * @returns {undefined}
 */
Renderer.prototype.init = function (canvas) {
    "use strict";

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
Renderer.prototype.clear = function (settings) {
    "use strict";
    // clear the canvas
    if (settings.DEBUG) {
        this.context.fillStyle = "#e6fff3";
    } else {
        this.context.fillStyle = "#ffffff";
    }

    this.context.fillRect(0,
            0,
            this.context.canvas.width,
            this.context.canvas.height);

    this.context.restore();

};

/**
 * Method to render odontograma
 * @param {type} data list of teeth for odontograma
 * @param {type} settings for the canvas
 * @param {type} constants which are used for the engine
 * @returns {undefined}
 */
Renderer.prototype.render = function (data, settings, constants) {
    "use strict";
    // draw the teeth
    for (var i = 0; i < data.length; i++) {

        data[i].render(this.context, settings, constants);
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
Renderer.prototype.renderText = function (text, x, y, color) {
    "use strict";
    if (color === undefined) {
        color = "#000000"; // default color = black
    }

    this.context.textAlign = 'left';
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};

Renderer.prototype.renderText14 = function (text, x, y, color) {
    "use strict";
    if (color === undefined) {
        color = "#000000"; // default color = black
    }

    this.context.font = "14px Arial";

    this.context.textAlign = 'left';
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};


Renderer.prototype.renderNameValueTabbed = function (name, value, tab, x, y, color) {
    "use strict";

    this.context.font = "14px Arial";

    if (color === undefined) {
        color = "#000000"; // default color = black
    }

    var text = name;

    for (var i = 0; i < tab; i++) {
        text += "\t";
    }

    text += value;

    this.context.textAlign = 'left';
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};

Renderer.prototype.renderTextCenter = function (text, x, y, color) {
    "use strict";
    if (color === undefined) {
        color = "#000000"; // default color = black
    }



    this.context.textAlign = 'center';
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};

Renderer.prototype.renderTextCenter16 = function (text, x, y, color) {
    "use strict";
    if (color === undefined) {
        color = "#000000"; // default color = black
    }

    this.context.font = "16px Arial Bold";
    this.context.textAlign = 'center';
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};


/**
 * Method to set app settings to the renderer
 * @param {type} settings the settings for the application
 * @returns {undefined}
 */
Renderer.prototype.setSettings = function (settings) {
    "use strict";
    this.settings = settings;
};


/**
 * Method to change the size of the canvas
 * @param {type} width new width of the canvas
 * @param {type} height new height of the canvas
 * @returns {void} 
 */
Renderer.prototype.setCanvasSize = function (width, height) {

    this.context.canvas.width = width;
    this.context.canvas.height = height;

};


Renderer.prototype.wrapText = function (text, x, y, maxWidth, lineHeight, maxLines) {

    var input = text.toString();

    var words = input.split(" ");

    var line = "";

    var lineNumber = 1;

    for (var n = 0; n < words.length; n++) {

        var testLine = line + words[n] + " ";

        var metrics = this.context.measureText(testLine);

        var testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {

            this.renderText(line, x, y, "#000000");
            //this.context.fillText(line, x, y);

            line = words[n] + " ";

            y += lineHeight;

            lineNumber++;

        } else {

            line = testLine;

        }

        if (lineNumber > maxLines) {
            break;
        }
    }

    this.renderText(line, x, y, "#000000");
//    this.context.fillText(line, x, y);

};

Renderer.prototype.drawImage = function (src, x, y, width, height) {

    this.context.drawImage(src, x, y, width, height);

};
