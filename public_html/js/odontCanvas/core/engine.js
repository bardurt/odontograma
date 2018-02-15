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

document.writeln("<script type='text/javascript' src='js/odontCanvas/util/constants.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/util/settings.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/rect.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/damage.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/textBox.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/tooth.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/renderer.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/odontogramaGenerator.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/collisionHandler.js'></script>");

function Engine() {
    "use strict";
    // canvas which is used by the engine
    this.canvas = null;

    this.adultShowing = true;

    // array which contains all the teeth for an odontograma
    this.mouth = [];

    // array which holds all the spaces between teeth
    this.spaces = [];

    // array for an adult odontograma
    this.odontAdult = [];

    // spaces for a adult odontograma
    this.odontSpacesAdult = [];

    // array for a child odontograma
    this.odontChild = [];

    // spaces for a child odontograma
    this.odontSpacesChild = [];

    // renderer which will render everything on a canvas
    this.renderer = new Renderer();

    // helper to create odontograma
    this.odontogramaGenerator = new OdontogramaGenerator();

    // helper for handeling collision
    this.collisionHandler = new CollisionHandler();

    this.settings = new Settings();

    this.constants = new Constants();

    // value of the selected damage which should be added or removed
    this.selectedHallazgo = 0;

    // x position of the mouse pointer
    this.cursorX = 0;

    // y position of the mouse pointer
    this.corsorY = 0;

    this.multiSelect = false;
    this.multiSelection =  new Array();
}

/**
 * Method to set the canvas for the engine.
 * @param {type} canvas the canvas which will be used for drawing
 * @returns {undefined}
 */
Engine.prototype.setCanvas = function (canvas) {
    "use strict";
    console.log("Engine, setting canvas: " + canvas);
    this.canvas = canvas;
    this.renderer.init(this.canvas);
};

/**
 * Helper method to get the real x position of mouse
 * @param {type} event mouse event containing mouse position
 * @returns {Number} the x position of the mouse
 */
Engine.prototype.getXpos = function (event) {
    "use strict";
    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientX - (boundingRect.left));
};

/**
 * Helper method to get the real y position of mouse
 * @param {type} event mouse event containing mouse position
 * @returns {Number} the y position of the mouse
 */
Engine.prototype.getYpos = function (event) {
    "use strict";
    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientY - (boundingRect.top));
};

/**
 * Method to prepare the engine
 * @returns {undefined}
 */
Engine.prototype.init = function () {
    "use strict";
    this.collisionHandler.setConstants(this.constants);

    // set up the odontograma
    this.odontogramaGenerator.setEngine(this);

    this.odontogramaGenerator.setSettings(this.settings);

    this.odontogramaGenerator.setConstants(this.constants);

    this.odontogramaGenerator.prepareOdontogramaAdult(this.odontAdult,
            this.odontSpacesAdult, this.canvas);

    this.odontogramaGenerator.prepareOdontogramaChild(this.odontChild,
            this.odontSpacesChild, this.canvas);


    this.mouth = this.odontAdult;

    this.spaces = this.odontSpacesAdult;
};

/**
 * Method for updating the engine
 * @returns {undefined}
 */
Engine.prototype.update = function () {
    "use strict";
    // reset the canvas
    this.renderer.clear(this.settings);

    // render the teeth
    this.renderer.render(this.mouth, this.settings, this.constants);

    // render spaces
    this.renderer.render(this.spaces, this.settings, this.constants);

    if (this.settings.DEBUG) {

        this.renderer.renderText("DEBUG MODE", 2, 15, "#000000");

        this.renderer.renderText("X: " + this.cursorX + ", Y: " + this.cursorY,
                128, 15, "#000000");
    }
};

/**
 * Method to remove all the highlight from all the teeth
 * @returns {undefined}
 */
Engine.prototype.removeHighlight = function () {
    "use strict";
    for (var i = 0; i < this.mouth.length; i++) {
        this.mouth[i].highlight = false;
    }

};

/**
 * Method to highlight all the teeth which are marked when multiselected
 * @param {type} tooth the tooth which should be highlighted
 * @returns {undefined}
 */
Engine.prototype.highlightMultiSelection = function (tooth) {
    "use strict";
    console.log("Highlighting multiselection");
    try {

        // only highlight if we the selection is at least 1
        if (this.multiSelection.length > 0) {

            // reset the highlighting
            for (var i = 0; i < this.mouth.length; i++) {
                this.mouth[i].highlight = false;
                this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT;
            }

            var tooth1 = this.multiSelection[0];

            // check if these teeth are same types
            if (tooth1.type === tooth.type) {

                // get indices for both teeth
                var index1 = this.getIndexForTooth(tooth1);
                var index2 = this.getIndexForTooth(tooth);

                var begin = Math.min(index1, index2);
                var end = Math.max(index1, index2);

                // highlight the teeth between begin and end
                for (var i = begin; i <= end; i++) {

                    this.mouth[i].highlight = true;
                }

                // some damages can only have 2 items in multiselection
                if (this.selectedHallazgo === this.constants.TRANSPOSICION_LEFT) {

                    // if count of selection for this damage (max 2) then
                    // change the highlight color, to show that this selection
                    // is not allowed
                    if ((end - begin) > 1) {

                        for (var i = begin; i <= end; i++) {

                            this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT_BAD;
                        }
                    }

                }

            }

            // repaint
            this.update();
        }

    } catch (error) {
        console.log("Engine highlightMultiSelection e: " + error.message);
    }

};

/** 
 * Helper method to print the ids of the mutliselection to the console
 * @returns {undefined}
 */
Engine.prototype.printMultiSelection = function () {
    "use strict";
    console.log("Multi Select count: " + this.multiSelection.length);
    for (var i = 0; i < this.multiSelection.length; i++) {

        console.log("multiSelection[" + i + "]: " + this.multiSelection[i].id);

    }

};

/**
 * Method to reset the multiselection - deactivate multiselection
 * @returns {undefined}
 */
Engine.prototype.resetMultiSelect = function () {
    "use strict";
    this.selectedHallazgo = "0";
    this.multiSelect = false;
    this.multiSelection.length = 0;
    this.removeHighlight();
    this.update();
};


/**
 * Method to get the index for a tooth
 * @param {type} tooth the tooth to find the index of
 * @returns {Number} index of the tooth
 */
Engine.prototype.getIndexForTooth = function (tooth) {
    "use strict";
    var index = -1;

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].id === tooth.id) {
            index = i;
            break;
        }
    }

    return index;

};

/**
 * Method to handle multiselection. this method is called when multiselect contains
 * 2 items, start and end. This method will add or remove damages from the teeth
 * which have been selected.
 * @returns {void}
 */
Engine.prototype.handleMultiSelection = function () {
    "use strict";
    // only handle multiselect when 2 teeth have been selected
    // start and end
    if (this.multiSelection.length === 2) {

        // get the indices for the teeth which have been selected
        var index1 = this.getIndexForTooth(this.multiSelection[0]);
        var index2 = this.getIndexForTooth(this.multiSelection[1]);


        var start = Math.min(index1, index2);
        var end = Math.max(index1, index2);

        // check which damage should be added or removed from the selected
        // teeth
        if (this.selectedHallazgo === this.constants.ORTODONTICO_FIJO_END) {

            this.mouth[start].toggleDamage(this.constants.ORTODONTICO_FIJO_END,
                    this.constants);

            this.mouth[end].toggleDamage(this.constants.ORTODONTICO_FIJO_END,
                    this.constants);

            for (var i = start + 1; i <= end - 1; i++) {

                this.mouth[i].toggleDamage(this.constants.ORTODONTICO_FIJO_CENTER,
                        this.constants);

            }

        } else if (this.selectedHallazgo === this.constants.PROTESIS_FIJA_LEFT) {

            this.mouth[start].toggleDamage(this.constants.PROTESIS_FIJA_RIGHT,
                    this.constants);

            this.mouth[end].toggleDamage(this.constants.PROTESIS_FIJA_LEFT,
                    this.constants);

            for (var i = start + 1; i <= end - 1; i++) {

                this.mouth[i].toggleDamage(this.constants.PROTESIS_FIJA_CENTER,
                        this.constants);

            }

        } else if (this.selectedHallazgo === this.constants.TRANSPOSICION_LEFT) {

            if (end - start === 1) {

                this.mouth[start].toggleDamage(this.constants.TRANSPOSICION_LEFT,
                        this.constants);

                this.mouth[end].toggleDamage(this.constants.TRANSPOSICION_RIGHT,
                        this.constants);
            }

        }

        // reset multiselection when multiselect is finished
        this.multiSelection.length = 0;

        this.removeHighlight();

        this.update();
    }

};

/**
 * Method to add items to a list of selected items
 * @param {type} tooth the tooth to add to the list
 * @returns {undefined}
 */
Engine.prototype.addToMultiSelection = function (tooth) {
    "use strict";
    this.multiSelection.push(tooth);

    this.printMultiSelection();

    if (this.multiSelection.length === 2) {
        this.handleMultiSelection();
    }

};

/**
 * Method to check if a string is alphabetic, only contains letters A-Z or a-z
 * @param {type} input the text to check
 * @returns {Boolean} true if letters only, else false
 */
Engine.prototype.isAlphabetic = function (input) {
    "use strict";
    var valid = false;

    var letters = /^[a-zA-Z]+$/;
    
    if (input.match(letters))
    {
        valid = true;

    }

    return valid;
};

Engine.prototype.setTextToTextBox = function (textBox, text) {
    "use strict";
    if (text !== null) {
        if (text.length < 4) {

            if (this.isAlphabetic(text)) {
                textBox.setNote(text);
            }
        }
    }
};

/**
 * Method to handle when there is a mouse click on a textbox
 * the method prompts the user to input a text.
 * @param {type} textBox the textbox which has been clicked
 * @returns {void}
 */
Engine.prototype.onTextBoxClicked = function (textBox) {
    "use strict";
    var message = "Escribe C\u00F3digo Dental. Max. 3 letras.";

    var text = prompt(message, "");

    this.setTextToTextBox(textBox, text);

};

/**
 * Method to handle mouse click event, when the spaces between the teeth 
 * are in the forground.
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseClickSpaces = function (event) {
    "use strict";
    var shouldUpdate = false;

    for (var i = 0; i < this.spaces.length; i++)
    {
        // check collision for current space
        if (this.spaces[i].checkCollision(
                this.getXpos(event),
                this.getYpos(event))) {

            this.collisionHandler.handleCollision(
                    this.spaces[i],
                    this.selectedHallazgo);

            shouldUpdate = true;
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};

/**
 * Method to handle mouse click event when the teeth are in the foreground
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.mouseClickTeeth = function (event) {
    "use strict";
    var shouldUpdate = false;

    // loop through all teeth
    for (var i = 0; i < this.mouth.length; i++)
    {

        // check if there is a collision with the textBox
        if (this.mouth[i].textBox.rect.checkCollision(this.getXpos(event),
                this.getYpos(event))) {

            this.onTextBoxClicked(this.mouth[i].textBox);
        }


        // check collision for current tooth
        if (this.mouth[i].rect.checkCollision(
                this.getXpos(event),
                this.getYpos(event))) {

            // if we are in multi select mode
            // add this tooth to multi select list
            if (this.multiSelect) {

                this.addToMultiSelection(this.mouth[i]);

            } else {

                // handle collision with tooth
                this.collisionHandler.handleCollision(
                        this.mouth[i],
                        this.selectedHallazgo);
            }

            shouldUpdate = true;
        }

        // check if there is a collision with one of the tooth surfaces
        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++) {

            if (this.mouth[i].checkBoxes[j].checkCollision(
                    this.getXpos(event),
                    this.getYpos(event))) {

                // handle collision with surface    
                this.collisionHandler.handleCollisionCheckBox(
                        this.mouth[i].checkBoxes[j],
                        this.selectedHallazgo);

                shouldUpdate = true;
            }
        }
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.onMouseClick = function (event) {
    "use strict";
    // check what is in foreground
    if (this.settings.HIHGLIGHT_SPACES) {

        this.mouseClickSpaces(event);

    } else {

        this.mouseClickTeeth(event);

    }

};

/**
 * Method to get the x and y coordinates of the mouse cursor
 * @param {type} event mouse move event
 * @returns {undefined}
 */
Engine.prototype.followMouse = function (event) {
    "use strict";
    this.cursorX = this.getXpos(event);
    this.cursorY = this.getYpos(event);

    this.update();
};

/**
 * Method to handle mouse move event when spaces between teeth are in foreground
 * @param {type} event mouse move envent
 * @returns {void}
 */
Engine.prototype.mouseMoveSpaces = function (event) {
    "use strict";
    for (var i = 0; i < this.spaces.length; i++) {

        var update = false;

        if (this.spaces[i].checkCollision(this.getXpos(event),
                this.getYpos(event)))
        {

            this.spaces[i].onTouch(true);

            update = true;

        } else {

            this.spaces[i].onTouch(false);
        }
    }

    if (update) {
        this.update();
    }
};

/**
 * Method to handle mouse move event, when teeth are in forground
 * @param {type} event mouse move event
 * @returns {void}
 */
Engine.prototype.mouseMoveTeeth = function (event) {
    "use strict";
    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].textBox.rect.checkCollision(this.getXpos(event),
                this.getYpos(event))) {

            this.mouth[i].textBox.touching = true;

        } else {

            this.mouth[i].textBox.touching = false;

        }

        if (this.mouth[i].checkCollision(this.getXpos(event),
                this.getYpos(event)))
        {
            this.mouth[i].onTouch(true);

            if (this.multiSelect) {

                if (this.multiSelection.length > 0) {
                    this.highlightMultiSelection(this.mouth[i]);
                }
            }

        } else {
            this.mouth[i].onTouch(false);
        }

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++) {

            if (this.mouth[i].checkBoxes[j].checkCollision(
                    this.getXpos(event), this.getYpos(event)))
            {
                this.mouth[i].checkBoxes[j].touching = true;

            } else {
                this.mouth[i].checkBoxes[j].touching = false;
            }
        }
    }
};

/**
 * Event handler for when the mouse is moved
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseMove = function (event) {
    "use strict";
    // are the spaces in forground
    if (this.settings.HIHGLIGHT_SPACES) {

        this.mouseMoveSpaces(event);

    } else {

        this.mouseMoveTeeth(event);

    }

    // update mouse cooridnates
    this.followMouse(event);

};

/*'
 * Method to reset the odontograma
 * @returns {undefined}
 */
Engine.prototype.reset = function () {
    "use strict";
    // reset all teeth
    for (var i = 0; i < this.mouth.length; i++)
    {
        this.mouth[i].damages.length = 0;

        this.mouth[i].textBox.text = "";

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
        {
            this.mouth[i].checkBoxes[j].state = 0;
        }
    }

    // reset all spaces
    for (var i = 0; i < this.spaces.length; i++)
    {
        this.spaces[i].damages.length = 0;
    }

    // repaint
    this.update();
};

/**
 * Method to get all the data from the engine.
 * Struct for a damage is the following
 * 
 * struct damage{
 *      tooth: int;
 *      damage: int;
 *      surface: String;
 *      note: String;
 * }
 * @returns {array} list of all the damages which exists in the odontograma
 */
Engine.prototype.getData = function () {
    "use strict";
    var list = Array();

    // Get data for all the spaces in the odontograma
    for (var i = 0; i < this.spaces.length; i++) {

        var t1 = this.spaces[i];

        for (var j = 0; j < t1.damages.length; j++) {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = t1.damages[j].id;
            d.surface = "0";
            d.note = "";

            list.push(d);
        }

    }

    // get all data from the teeth in the odontograma
    for (var i = 0; i < this.mouth.length; i++) {

        var t1 = this.mouth[i];

        // get the notes from the text boxes
        if (t1.textBox.text !== "") {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = "";
            d.surface = "";
            d.note = t1.textBox.text;

            list.push(d);

        }

        // get the damages registered for the tooth
        for (var j = 0; j < t1.damages.length; j++) {

            var d = new Object();

            d.tooth = t1.id;
            d.damage = "" + t1.damages[j].id;
            d.surface = "0";
            d.note = "";

            list.push(d);
        }


        // get data for the checkboxes (surfaces) for current tooth
        for (var j = 0; j < t1.checkBoxes.length; j++) {

            if (t1.checkBoxes[j].state !== 0) {
                var d = new Object();


                d.tooth = t1.id;
                d.damage = t1.checkBoxes[j].state;
                d.surface = t1.checkBoxes[j].id;
                d.note = "";

                list.push(d);
            }
        }

    }

    return list;
};

/**
 * Method to save the odontograma as an image file
 * @returns {void}
 */
Engine.prototype.save = function () {
    "use strict";
    // save image as png
    var link = document.createElement('a');

    // create a unique name
    var name = Date.now() + ".png";

    link.download = name;

    link.href = this.canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

    link.click();

};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {void}
 */
Engine.prototype.onButtonClick = function (event) {
    "use strict";
    console.log("key " + event.key);

    if (event.key !== "d") {
        this.selectedHallazgo = 0;
    }

    if (event.key === "1")
    {
        this.selectedHallazgo = 1;
    }

    if (event.key === "2")
    {
        this.selectedHallazgo = 2;
    }

    if (event.key === "3")
    {
        this.selectedHallazgo = 3;
    }

    if (event.key === "4")
    {
        this.selectedHallazgo = 4;
    }

    if (event.key === "5")
    {
        this.selectedHallazgo = 5;
    }

    if (event.key === "6")
    {
        this.selectedHallazgo = 6;
    }

    if (event.key === "7")
    {
        this.selectedHallazgo = 7;
    }

    if (event.key === "8")
    {
        this.selectedHallazgo = 8;
    }

    if (event.key === "9")
    {
        this.selectedHallazgo = 9;
    }

    if (event.key === "0")
    {
        this.selectedHallazgo = 10;
    }

    if (event.key === "q")
    {
        this.selectedHallazgo = 11;
    }

    if (event.key === "w")
    {
        this.selectedHallazgo = 12;
    }

    if (event.key === "r")
    {
        this.selectedHallazgo = 13;
    }

    if (event.key === "b")
    {
        this.selectedHallazgo = 14;
    }

    if (event.key === "e")
    {
        this.selectedHallazgo = 15;
    }

    if (event.key === "t")
    {
        this.selectedHallazgo = 16;
    }

    if (event.key === "y")
    {
        this.selectedHallazgo = 17;
    }

    if (event.key === "u")
    {
        this.selectedHallazgo = 18;
    }

    if (event.key === "i")
    {
        this.selectedHallazgo = 19;
    }

    if (event.key === "o")
    {
        this.selectedHallazgo = 20;
    }

    if (event.key === "x") {
        this.selectedHallazgo = 50;
    }

    if (event.key === "c") {
        this.selectedHallazgo = 52;
    }

    if (event.key === ",") {
        this.selectedHallazgo = 51;
    }

    if (event.key === ".") {
        this.selectedHallazgo = 53;
    }

    if (event.key === "-") {
        this.selectedHallazgo = 54;
    }

    if (event.key === "'") {
        this.selectedHallazgo = 55;
    }

    if (event.key === "+") {
        this.selectedHallazgo = 56;
    }

    if (event.key === "/") {
        this.selectedHallazgo = 57;
    }

    if (event.key === "a") {

        this.selectedHallazgo = 21;
        this.settings.HIHGLIGHT_SPACES = true;
        this.update();

    }

    if (event.key !== "d") {
        if (event.key !== "a" && event.key !== "s")
        {
            this.settings.HIHGLIGHT_SPACES = false;
            this.update();
        }
    }

    if (event.key === "z")
    {
        this.selectedHallazgo = 0;
        this.reset();
    }


    // key combination Ctrl + Q to activate debug mode
    if ((event.which === 81 || event.keyCode === 81) && event.ctrlKey) {
        this.settings.DEBUG = !this.settings.DEBUG;

        this.update();
    }

    // key combination Ctrl + W to save the canvas as an image file
    if ((event.which === 81 || event.keyCode === 81) && event.shiftKey) {
        this.settings.DEBUG = !this.settings.DEBUG;

        this.save();
    }

    if (event.key === "j") {

        if (this.selectedHallazgo === 23)
        {
            this.resetMultiSelect();
            this.multiSelect = true;

        } else {

            this.selectedHallazgo = 23;
            this.multiSelect = true;
        }
    }

    if (event.key === "k") {

        if (this.selectedHallazgo === 25)
        {
            this.resetMultiSelect();
            this.multiSelect = true;

        } else {

            this.selectedHallazgo = 25;
            this.multiSelect = true;
        }
    }

    if (event.key === "l") {

        if (this.selectedHallazgo === 28)
        {
            this.resetMultiSelect();
            this.multiSelect = true;

        } else {

            this.selectedHallazgo = 28;
            this.multiSelect = true;
        }
    }

    if (event.key === "Control") {

        this.multiSelect = !this.multiSelect;
        console.log("multiselect: " + this.multiSelect);
        if (!this.multiSelect) {
            this.resetMultiSelect();
        }

    }

    if (event.key === "ArrowLeft") {

        this.adultShowing = true;
        console.log("Setting odontograma to adult");
        this.mouth = this.odontAdult;
        this.spaces = this.odontSpacesAdult;
        this.update();

    }

    if (event.key === "ArrowRight") {

        this.adultShowing = false;
        console.log("Setting odontograma to child");
        this.mouth = this.odontChild;
        this.spaces = this.odontSpacesChild;
        this.update();

    }

    if (event.key === "v") {

        var data = this.getData();

        console.log("Data length: " + data.length);

        for (var i = 0; i < data.length; i++) {

            console.log("Data[" + i + "]: " + data[i].tooth + ", "
                    + data[i].damage + ", " + data[i].surfac + ", "
                    + data[i].note);

        }
    }
};

/**
 * Method to set the damage which the engine should toggle on or off
 * @param {type} damage id of the damge
 * @returns {void}
 */
Engine.prototype.setDamage = function (damage) {
    "use strict";
    this.multiSelect = false;
    this.multiSelection.length = 0;

    console.log("Engine setting damage: " + damage);

    this.selectedHallazgo = parseInt(damage, 10) || 0;

    if (this.selectedHallazgo === this.constants.TRANSPOSICION_LEFT) {
        this.multiSelect = true;
        this.multiSelection.length = 0;

    }

    if (this.selectedHallazgo === this.constants.ORTODONTICO_FIJO_END) {
        this.multiSelect = true;
        this.multiSelection.length = 0;
    }

    if (this.selectedHallazgo === this.constants.PROTESIS_FIJA_LEFT) {
        this.multiSelect = true;
        this.multiSelection.length = 0;
    }

    if (this.selectedHallazgo === this.constants.SUPER_NUMERARIO) {

        this.settings.HIHGLIGHT_SPACES = true;
        this.update();

    }

    if (this.selectedHallazgo === this.constants.DIASTEMA) {

        this.settings.HIHGLIGHT_SPACES = true;
        this.update();

    }

    if (this.selectedHallazgo !== this.constants.DIASTEMA &&
            this.selectedHallazgo !== this.constants.SUPER_NUMERARIO) {

        this.settings.HIHGLIGHT_SPACES = false;
        this.update();
    }
};

/**
 * Method to change odontograma view
 * @param {type} which type of odontograma "0" = adult
 * @returns {void}
 */
Engine.prototype.changeView = function (which) {
    "use strict";
    if (which === "1") {

        this.adultShowing = false;
        this.mouth = this.odontChild;
        this.spaces = this.odontSpacesChild;
        this.update();


    } else {

        this.adultShowing = true;
        this.mouth = this.odontAdult;
        this.spaces = this.odontSpacesAdult;
        this.update();

    }


};

/**
 * Method to start the engine. Methods gets called
 * when all assets have been loaded.
 * @returns {void}
 */
Engine.prototype.start = function () {
    "use strict";
    var self = this;

    // show splash screen for 3 seconds 
    // then continue
    setTimeout(function () {
        self.update();
    }, 1500);

};

/**
 * Method to get a tooth by its id
 * @param {type} id of the tooth
 * @returns {Tooth} tooth with the speciefied id. Undefined if the tooth does
 * not exist
 */
Engine.prototype.getToothById = function (id) {
    "use strict";
    var tooth;

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].id === id) {

            tooth = this.mouth[i];
            break;

        }
    }

    return tooth;

};

/**
 * Method to get a space, between 2 teeths, by id
 * @param {type} id of the space
 * @returns {Tooth} the space for the id
 */
Engine.prototype.getSpaceById = function (id) {
    "use strict";
    var space;

    for (var i = 0; i < this.spaces.length; i++) {

        if (this.spaces[i].id === id) {

            space = this.spaces[i];
            break;

        }
    }

    return space;

};

/**
 * Method to load damages to odontograma from external source
 * @param {type} tooth id of the tooth which has the damage
 * @param {type} damage id of the damage to add
 * @param {type} surface id of the surface to add damage, empty if no surface
 * @param {type} note text to add to textbox for tooth, empty if no note
 * @returns {undefined}
 */
Engine.prototype.load = function (tooth, damage, surface, note) {
    "use strict";
    // check if we should add damage to a tooth
    if (surface === "0") {

        // if id is less than 1000 then we have to find a tooth
        if (tooth < 1000) {

            var t = this.getToothById(tooth);

            this.collisionHandler.handleCollision(t, damage);

            this.setTextToTextBox(t.textBox, note);

        } else {
            // if the id is greater than 1000
            // then we have to find a space
            this.collisionHandler.handleCollision(this.getSpaceById(tooth), damage);
        }


    } else {

        // adding damage to surface

        var surfaceId = tooth + "_" + surface;

        var t = this.getToothById(tooth);
        var surface = t.getSurfaceById(surfaceId);

        this.collisionHandler.handleCollisionCheckBox(surface, damage);

        this.setTextToTextBox(t.textBox, note);

    }

};



/**
 * Method to pass a comma seperated string for loading data
 * fomat of string: toothId,damageId,surface,note,...toothId,damageId,surface,note
 * @param {type} dataArray commea seperated string
 * @returns {void}
 */
Engine.prototype.setDataSource = function (dataArray) {
    "use strict";
    var res = dataArray.split(",");

    var i = 0;
    while (i < res.length) {

        // loop through all and add damage
        this.load(Number(res[i]), Number(res[i + 1]), res[i + 2], res[i + 3]);

        i = i + 4;
    }

};