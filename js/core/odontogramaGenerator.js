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
 * Helper class for creating a Odontograma
 * @returns {OdontogramaGenerator}
 */
function OdontogramaGenerator() {
    "use strict";
    // variable for how many images have been loaded
    this.currentLoad = 0;

    // variable for how many teeths are in array
    this.arrayCount = 0;
    this.seperator = 210;
    this.imgWidth = 40;
    this.imgHeight = 90;
    this.engine = null;
    this.settings = null;
    this.constants = null;

}

/**
 * Method to set reference to the engine which uses this 
 * odontograma
 * @param {type} engine
 * @returns {undefined}
 */
OdontogramaGenerator.prototype.setEngine = function (engine) {
    "use strict"; 
    this.engine = engine;
};

/** 
 * Method to set reference to settings
 * @param {type} settings application settings
 * @returns {undefined}
 */
OdontogramaGenerator.prototype.setSettings = function (settings) {
    "use strict";
    this.settings = settings;
};

OdontogramaGenerator.prototype.setConstants = function (constants) {
    "use strict";
    this.constants = constants;
};


/**
 * Method to update the count of images which have been loaded
 * @returns {void}
 */
OdontogramaGenerator.prototype.updateLoad = function () {
    "use strict";
    this.currentLoad = this.currentLoad + 1;

    // notify when all images have been loaded
    if (this.currentLoad >= this.arrayCount) {
        this.engine.start();
    }
};


/*'
 * Method to prepare an Odontograma for an adult, 32 teeth
 * @param {type} odontograma array which holds all 32 teeth
 * @param {type} spaces array to hold all the spaces between teeths
 * @param {type} canvas the canvas where the odontograma will be drawn
 * @returns {void}
 */
OdontogramaGenerator.prototype.prepareOdontogramaAdult = function (odontograma,
        spaces, canvas) {

    "use strict";
    var self = this;
    this.arrayCount = 0;

    // center the ondotograma horizontal
    var width = canvas.width;
    var odontWidth = 16 * this.imgWidth;
    var start = (width - odontWidth) / 2;
    
    // start of first tooth
    var x = start;

    // center vertial
    var height = canvas.height;
    var odontHeight = 2 * 150;
    var base = (height - odontHeight) / 2;
    

    // create the 1st group of upper teeth
    for (var i = 18; i > 10; i--) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i > 13)
        {
            tooth.setSurfaces(5);

        } else
        {
            tooth.setSurfaces(4);
        }

        var image = new Image();

        image.onload = function () {
            self.updateLoad();
        };

        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        
        tooth.setDimens(x,
                        base, 
                        this.imgWidth,
                        this.imgHeight);
                        
        tooth.setType(0);

        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        odontograma[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;

        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        var space = new Tooth();
        space.setConstants(this.constants);
        
        space.setSurfaces(5);

        if (i !== 11) {
            var tmpid = (i) + "" + (i - 1);
            space.id = Number(tmpid);

        } else {

            var tmpid = (i) + "" + (21);
            space.id = Number(tmpid);

        }

        space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                        tooth.rect.y,
                        tooth.rect.width,
                        tooth.rect.height);

        space.type = tooth.type;
        space.tooth = false;

        spaces.push(space);

    }

    // create the 2nd group of upper teeth
    for (var i = 21; i < 29; i++) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i < 24)
        {
            tooth.setSurfaces(4);
        } else
        {
            tooth.setSurfaces(5);
        }

        var image = new Image;

        image.onload = function () {
            self.updateLoad();
        };

        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        
        tooth.setDimens(x, 
                        base,
                        this.imgWidth, 
                        this.imgHeight);
                        
        tooth.setType(0);

        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        odontograma[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;

        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        if (i < 28) {

            var space = new Tooth();
            space.setConstants(this.constants);
            space.setSurfaces(5);
            var tmpid = (i) + "" + (i + 1);
            space.id = Number(tmpid);

            space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                            tooth.rect.y,
                            tooth.rect.width,
                            tooth.rect.height);

            space.type = tooth.type;
            space.tooth = false;

            spaces.push(space);
        }
    }

    // start position of first 
    var x = start;

    // create the 1st group of lower teeth
    for (var i = 48; i > 40; i--) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i < 44)
        {
            tooth.setSurfaces(4);

        } else
        {
            tooth.setSurfaces(5);
        }

        var image = new Image();

        image.onload = function () {
            self.updateLoad();
        };

        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;

        tooth.setDimens(x,
                        base + this.seperator,
                        this.imgWidth,
                        this.imgHeight);

        tooth.setType(1);

        x += tooth.rect.width+ this.settings.TOOTH_PADDING;

        odontograma[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;

        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        var space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);

        if (i !== 41) {
            var tmpid = (i) + "" + (i - 1);
            space.id = Number(tmpid);

        } else {

            var tmpid = (i) + "" + (31);
            space.id = Number(tmpid);

        }

        space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                        tooth.rect.y,
                        tooth.rect.width,
                        tooth.rect.height);

        space.type = tooth.type;
        space.tooth = false;

        spaces.push(space);

    }

    // create the 2nd group of lower teeth
    for (var i = 31; i < 39; i++) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);
        
        if (i < 34)
        {
            tooth.setSurfaces(4);
        } else
        {
            tooth.setSurfaces(5);
        }

        var image = new Image();

        image.onload = function () {
            self.updateLoad();
        };

        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.setDimens(x,
                        base + this.seperator,
                        this.imgWidth,
                        this.imgHeight);

        tooth.setType(1);

        odontograma[this.arrayCount] = tooth;
        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        tooth.address = this.arrayCount;
        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        if (i < 38) {

            var space = new Tooth();
            space.setConstants(this.constants);
            space.setSurfaces(5);
            var tmpid = (i) + "" + (i + 1);
            space.id = Number(tmpid);

            space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                            tooth.rect.y,
                            tooth.rect.width,
                            tooth.rect.height);

            space.type = tooth.type;
            space.tooth = false;

            spaces.push(space);
        }

    }

};


/**
 * Method to prepare an odontograma for a child
 * @param {type} odontograma container for the odontograma, teeths
 * @param {type} spaces container for the spaces between teeth
 * @param {type} canvas the canvas where the odontograma will be drawn on
 * @returns {void}
 */
OdontogramaGenerator.prototype.prepareOdontogramaChild = function (odontograma,
spaces, canvas) {
    "use strict"; 
    this.arrayCount = 0;

    // center odontograma horizontal
    var width = canvas.width;
    var odontWidth = 10 * this.imgWidth;
    var start = (width - odontWidth) / 2;

    // start of first tooth
    var x = start;

    // center odontograma vertical
    var height = canvas.height;
    var odontHeight = 2 * 150;
    var base = (height - odontHeight) / 2;

    for (var i = 55; i > 50; i--) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i > 53)
        {
            tooth.setSurfaces(5);

        } else
        {
            tooth.setSurfaces(4);
        }

        var image = new Image();

        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;

        tooth.setDimens(x,
                        base,
                        this.imgWidth,
                        this.imgHeight);

        tooth.setType(0);

        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        odontograma[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;

        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        var space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);

        if (i !== 51) {
            var tmpid = (i) + "" + (i - 1);
            space.id = Number(tmpid);

        } else {

            var tmpid = (i) + "" + (61);
            space.id = Number(tmpid);

        }

        space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                        tooth.rect.y,
                        tooth.rect.width,
                        tooth.rect.height);

        space.type = tooth.type;
        space.tooth = false;

        spaces.push(space);

    }

    for (var i = 61; i < 66; i++) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i < 64)
        {
            tooth.setSurfaces(4);
        } else
        {
            tooth.setSurfaces(5);
        }

        var image = new Image;

        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;

        tooth.setDimens(x,
                        base,
                        this.imgWidth,
                        this.imgHeight);

        tooth.setType(0);

        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        tooth.address = this.arrayCount;

        odontograma[this.arrayCount] = tooth;

        this.arrayCount++;

        tooth.createSurfaces(this.settings);


        if (i < 65) {

            var space = new Tooth();
            space.setConstants(this.constants);
            
            space.setSurfaces(5);
            var tmpid = (i) + "" + (i + 1);
            space.id = Number(tmpid);

            space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                            tooth.rect.y,
                            tooth.rect.width,
                            tooth.rect.height);

            space.type = tooth.type;
            space.tooth = false;

            spaces.push(space);
        }

    }

    // start position of first 
    var x = start;

    for (var i = 85; i > 80; i--) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i < 84)
        {
            tooth.setSurfaces(4);

        } else
        {
            tooth.setSurfaces(5);
        }


        var image = new Image();

        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;

        tooth.setDimens(x,
                        base + this.seperator,
                        this.imgWidth,
                        this.imgHeight);

        tooth.setType(1);

        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        odontograma[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;

        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        var space = new Tooth();
        space.setConstants(this.constants);
        space.setSurfaces(5);

        if (i !== 81) {
            var tmpid = (i) + "" + (i - 1);
            space.id = Number(tmpid);

        } else {

            var tmpid = (i) + "" + (71);
            space.id = Number(tmpid);

        }

        space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                        tooth.rect.y,
                        tooth.rect.width,
                        tooth.rect.height);

        space.type = tooth.type;
        space.tooth = false;

        spaces.push(space);

    }

    for (var i = 71; i < 76; i++) {

        var tooth = new Tooth();
        tooth.setConstants(this.constants);

        if (i < 74)
        {
            tooth.setSurfaces(4);
        } else
        {
            tooth.setSurfaces(5);
        }

        var image = new Image();

        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.setDimens(x,
                        base + this.seperator,
                        this.imgWidth,
                        this.imgHeight);

        tooth.setType(1);

        odontograma[this.arrayCount] = tooth;
        x += tooth.rect.width + this.settings.TOOTH_PADDING;

        tooth.address = this.arrayCount;
        this.arrayCount++;

        tooth.createSurfaces(this.settings);

        if (i < 75) {

            var space = new Tooth();
            space.setConstants(this.constants);
             
            space.setSurfaces(5);
            var tmpid = (i) + "" + (i + 1);
            space.id = Number(tmpid);

            space.setDimens(tooth.rect.x + tooth.rect.width / 2,
                            tooth.rect.y,
                            tooth.rect.width,
                            tooth.rect.height);

            space.type = tooth.type;
            space.tooth = false;

            spaces.push(space);
        }

    }

};
