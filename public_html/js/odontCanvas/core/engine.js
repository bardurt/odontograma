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
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/constants.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/settings.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/rect.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/damage.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/textBox.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/models/tooth.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/renderer.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/odontogramaGenerator.js'></script>");
document.writeln("<script type='text/javascript' src='js/odontCanvas/core/collisionHandler.js'></script>");

function Engine()
{
    // canvas which is used by the engine
    this.canvas = null;

    this.adultShowing = true;

    // array which contains all the teeth for an odontograma
    this.mouth = new Array();

    // array which holds all the spaces between teeth
    this.spaces = new Array();

    // array for an adult odontograma
    this.odontAdult = new Array();

    // spaces for a adult odontograma
    this.odontSpacesAdult = new Array();

    // array for a child odontograma
    this.odontChild = new Array();

    // spaces for a child odontograma
    this.odontSpacesChild = new Array();

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
    this.multiSelection = Array();
    
    var currentTextBox = null;

}

/**
 * Method to set the canvas for the engine.
 * @param {type} canvas the canvas which will be used for drawing
 * @returns {undefined}
 */
Engine.prototype.setCanvas = function (canvas)
{
    console.log("Engine, setting canvas: " + canvas);
    this.canvas = canvas;
    this.renderer.init(this.canvas);
};

/**
 * Helper method to get the real x position of mouse
 * @param {type} event mouse event containing mouse position
 * @returns {Number} the x position of the mouse
 */
Engine.prototype.getXpos = function (event)
{

    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientX - (boundingRect.left));
};

/**
 * Helper method to get the real y position of mouse
 * @param {type} event mouse event containing mouse position
 * @returns {Number} the y position of the mouse
 */
Engine.prototype.getYpos = function (event)
{

    var boundingRect = this.canvas.getBoundingClientRect();

    return Math.round(event.clientY - (boundingRect.top));
};

/**
 * Method to prepare the engine
 * @returns {undefined}
 */
Engine.prototype.init = function () {

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
Engine.prototype.update = function ()
{
    this.renderer.clear(this.settings);
    this.renderer.render(this.mouth, this.settings, this.constants);
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
Engine.prototype.removeHighlight = function ()
{
    for (var i = 0; i < this.mouth.length; i++) {
        this.mouth[i].highlight = false;
    }

};

/**
 * Method to highlight all the teeth which are marked when multiselected
 * @param {type} tooth the tooth which should be highlighted
 * @returns {undefined}
 */
Engine.prototype.highlightMultiSelection = function (tooth)
{
    try {

        if (this.multiSelection.length > 0) {

            for (var i = 0; i < this.mouth.length; i++) {
                this.mouth[i].highlight = false;
                this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT;
            }

            var tooth1 = this.multiSelection[0];

            // check if these are same types
            if (tooth1.type === tooth.type) {

                var index1 = this.getIndexForTooth(tooth1);
                var index2 = this.getIndexForTooth(tooth);

                var begin = Math.min(index1, index2);
                var end = Math.max(index1, index2);

                for (var i = begin; i <= end; i++) {

                    this.mouth[i].highlight = true;
                }

                if (this.selectedHallazgo === this.constants.TRANSPOSICION_LEFT) {

                    if ((end - begin) > 1) {

                        for (var i = begin; i <= end; i++) {

                            this.mouth[i].highlightColor = this.settings.COLOR_HIGHLIGHT_BAD;
                        }
                    }

                }

            }

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

    console.log("Reseting multiselect");
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

    var index = -1;

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].id === tooth.id) {
            index = i;
            break;
        }
    }

    return index;

};

Engine.prototype.handleMultiSelection = function ()
{

    console.log("handleMultiSelection called");

    if (this.multiSelection.length === 2) {

        var index1 = this.getIndexForTooth(this.multiSelection[0]);
        var index2 = this.getIndexForTooth(this.multiSelection[1]);

        var start = Math.min(index1, index2);
        var end = Math.max(index1, index2);

        console.log("Start " + start);
        console.log("End " + end);

        if (this.selectedHallazgo === this.constants.ORTODONTICO_FIJO_END) {

            this.mouth[start].toggleDamage(this.constants.ORTODONTICO_FIJO_END, this.constants);
            this.mouth[end].toggleDamage(this.constants.ORTODONTICO_FIJO_END, this.constants);

            for (var i = start + 1; i <= end - 1; i++) {

                this.mouth[i].toggleDamage(this.constants.ORTODONTICO_FIJO_CENTER, this.constants);

            }
        } else if (this.selectedHallazgo === this.constants.PROTESIS_FIJA_LEFT) {

            this.mouth[start].toggleDamage(this.constants.PROTESIS_FIJA_RIGHT, this.constants);
            this.mouth[end].toggleDamage(this.constants.PROTESIS_FIJA_LEFT, this.constants);

            for (var i = start + 1; i <= end - 1; i++) {

                this.mouth[i].toggleDamage(this.constants.PROTESIS_FIJA_CENTER, this.constants);

            }

        } else if (this.selectedHallazgo === this.constants.TRANSPOSICION_LEFT) {

            if (end - start === 1) {
                this.mouth[start].toggleDamage(this.constants.TRANSPOSICION_LEFT, this.constants);
                this.mouth[end].toggleDamage(this.constants.TRANSPOSICION_RIGHT, this.constants);
            }

        }

        // reset multiselection when multiselect is finished
        this.resetMultiSelect();
    }

};

/**
 * Method to add items to a list of selected items
 * @param {type} tooth the tooth to add to the list
 * @returns {undefined}
 */
Engine.prototype.addToMultiSelection = function (tooth)
{
    this.multiSelection.push(tooth);

    this.printMultiSelection();

    if (this.multiSelection.length === 2) {
        this.handleMultiSelection();
    }

};

Engine.prototype.onTextBoxClicked = function(textBox)
{
    var message = "Escribe C\u00F3digo Dental. Max. 3 letras.";
    
    var text = prompt(message, "");

    if(text.length < 4){
        textBox.text = text.toUpperCase();
    }
    
};


/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseClick = function (event)
{

    shouldUpdate = false;

    if (!this.settings.HIHGLIGHT_SPACES) {
        // loop through all teeth
        for (var i = 0; i < this.mouth.length; i++)
        {
            this.mouth[i].toggleSelected(false);

            if(this.mouth[i].textBox.rect.checkCollision(this.getXpos(event), this.getYpos(event))){
                this.onTextBoxClicked(this.mouth[i].textBox);
            }


            // check collision for current tooth
            if (this.mouth[i].rect.checkCollision(
                    this.getXpos(event),
                    this.getYpos(event))) {

                if (this.multiSelect) {

                    this.addToMultiSelection(this.mouth[i]);

                } else {
                    this.collisionHandler.handleCollision(this.mouth[i],
                            this.selectedHallazgo);
                }

                shouldUpdate = true;
            }

            // check if there is a collision with one of the tooth surfaces
            for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
            {
                if (this.mouth[i].checkBoxes[j].checkCollision(this.getXpos(event),
                        this.getYpos(event)))
                {
                    this.collisionHandler.handleCollisionCheckBox(
                            this.mouth[i].checkBoxes[j],
                            this.selectedHallazgo);

                    shouldUpdate = true;
                }
            }
        }
    } else {

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
    }

    // only update if something new has occurred
    if (shouldUpdate) {
        this.update();
    }

};

/**
 * Method to get the x and y coordinates of the mouse cursor
 * @param {type} event mouse move event
 * @returns {undefined}
 */
Engine.prototype.followMouse = function (event)
{

    this.cursorX = this.getXpos(event);
    this.cursorY = this.getYpos(event);

    this.update();
};

/**
 * Event handler for when the mouse is moved
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onMouseMove = function (event)
{

    if (this.settings.HIHGLIGHT_SPACES)
    {
        for (var i = 0; i < this.spaces.length; i++) {

            var update = false;

            if (this.spaces[i].checkCollision(this.getXpos(event),
                    this.getYpos(event)))
            {
                this.spaces[i].onTouch(true);
                update = true;
            } else
            {
                this.spaces[i].onTouch(false);
            }
        }

        if (update) {
            this.update();
        }
    } else {

        for (var i = 0; i < this.mouth.length; i++) {

            if(this.mouth[i].textBox.rect.checkCollision(this.getXpos(event), this.getYpos(event))){
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

            } else
            {
                this.mouth[i].onTouch(false);
            }

            for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
            {
                if (this.mouth[i].checkBoxes[j].checkCollision(
                        this.getXpos(event), this.getYpos(event)))
                {
                    this.mouth[i].checkBoxes[j].touching = true;
                } else
                {
                    this.mouth[i].checkBoxes[j].touching = false;
                }
            }
        }

    }

    this.followMouse(event);

};

/*'
 * Method to reset the odontograma
 * @returns {undefined}
 */
Engine.prototype.reset = function ()
{

    for (var i = 0; i < this.mouth.length; i++)
    {
        this.mouth[i].damages.length = 0;
        
        this.mouth[i].textBox.text = "";

        for (var j = 0; j < this.mouth[i].checkBoxes.length; j++)
        {
            this.mouth[i].checkBoxes[j].state = 0;
        }
    }

    for (var i = 0; i < this.spaces.length; i++)
    {
        this.spaces[i].damages.length = 0;
    }

    this.update();
};

/**
 * Method to get all the data from the engine
 * @returns {undefined} list of all the damages which exists in the odontograma
 */
Engine.prototype.getData = function ()
{
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
        if(t1.textBox.text !== ""){
            
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
 * @returns {undefined}
 */
Engine.prototype.save = function ()
{

    // save image as png
    var link = document.createElement('a');
    
    var name = Date.now() + ".png";
    
    link.download = name;
    link.href = this.canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

    link.click();

};

/**
 * Event handler for when the mouse is clicked
 * @param {type} event mouse click event
 * @returns {undefined}
 */
Engine.prototype.onButtonClick = function (event)
{
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
    
    if(event.key === "x"){
        this.selectedHallazgo = 50;
    }
    
    if(event.key === "c"){
        this.selectedHallazgo = 52;
    }
    
    if(event.key === ","){
        this.selectedHallazgo = 51;
    }
    
    if(event.key === "."){
        this.selectedHallazgo = 53;
    }
    
    if(event.key === "-"){
        this.selectedHallazgo = 54;
    }
    
    if(event.key === "'"){
        this.selectedHallazgo = 55;
    }
    
    if(event.key === "+"){
        this.selectedHallazgo = 56;
    }
    
    if(event.key === "/"){
        this.selectedHallazgo = 57;
    }

    if (event.key === "a") {

        this.selectedHallazgo = 21;
        this.settings.HIHGLIGHT_SPACES = true;
        this.update();

    }

    if (event.key === "s") {

        this.selectedHallazgo = this.constants.DIASTEMA;
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

    if (event.key === "m")
    {
        this.selectedHallazgo = 0;
        this.save();
    }

    if (event.key === "d") {

        this.settings.DEBUG = !this.settings.DEBUG;

        this.update();
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

            console.log("Data[" + i + "]: " + data[i].tooth + ", " + data[i].damage + ", " + data[i].surface +
                    ", " + data[i].note);

        }
    }
};

Engine.prototype.setDamage = function (damage) {

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
 * @returns {undefined}
 */
Engine.prototype.changeView = function (which)
{


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
 * Method for displaying a splash screen
 * @returns {undefined}
 */
Engine.prototype.splash = function () {

    this.renderer.drawSplash();

    var self = this;

    // show splash screen for 3 seconds 
    // then continue
    setTimeout(function () {
        self.update();
    }, 3000);

};

Engine.prototype.getToothById = function (id)
{
    var tooth;

    for (var i = 0; i < this.mouth.length; i++) {

        if (this.mouth[i].id === id) {

            tooth = this.mouth[i];
            break;

        }
    }

    return tooth;

};

Engine.prototype.getSpaceById = function (id)
{
    var space;

    for (var i = 0; i < this.spaces.length; i++) {

        if (this.spaces[i].id === id) {

            space = this.spaces[i];
            break;

        }
    }

    return space;

};




Engine.prototype.load = function (tooth, damage, surface) {

    if (surface === "0") {

        // if id is less than 1000 then we have to find a tooth
        if (tooth < 1000) {
            this.collisionHandler.handleCollision(this.getToothById(tooth), damage);
        } else {
            // if the id is greater than 1000
            // then we have to find a space
            this.collisionHandler.handleCollision(this.getSpaceById(tooth), damage);
        }

    } else {

        var surfaceId = tooth + "_" + surface;

        var tooth = this.getToothById(tooth);
        var surface = tooth.getSurfaceById(surfaceId);

        this.collisionHandler.handleCollisionCheckBox(surface, damage);

    }

};

Engine.prototype.LoadData = function (dataArray) {

    var res = dataArray.split(",");
    
    var i = 0;
    while (i < res.length) {

        this.load(Number(res[i]), Number(res[i + 1]), res[i + 2]);

        i = i+3;
    }

};