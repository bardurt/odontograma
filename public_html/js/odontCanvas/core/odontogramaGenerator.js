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

//TODO : create a pre loader of the images



function OdontogramaGenerator()
{
    // variable for how many images have been loaded
    this.currentLoad = 0;

    // variable for how many teeths are in array
    this.arrayCount = 0;

    this.base = 20;
    this.seperator = 250;
    this.imgWidth = 40;
    this.imgHeight = 90;
    this.engine = null;

}

OdontogramaGenerator.prototype.setEngine = function(engine)
{
    this.engine = engine;
};

/**
 * Method to update the count of images which have been loaded
 * @returns {undefined}
 */
OdontogramaGenerator.prototype.updateLoad = function() {

    this.currentLoad++;

    // notify when all images have been loaded
    if (this.currentLoad >= this.arrayCount) {
        this.engine.update();
    }
};


/**
 * Method to prepare the layout for an odontograma
 * @param {type} array container for all the teeths
 * @returns {undefined}
 */
OdontogramaGenerator.prototype.prepareOdontogramaAdult = function(array, canvas) {

    var self = this;
    this.arrayCount = 0;

    
    var width = canvas.width;
    var odontWidth = 16 * this.imgWidth;
    var start = (width - odontWidth)/2;
    
    // start of first tooth
    var x = start;


    for (var i = 18; i > 10; i--) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base, this.imgWidth, this.imgHeight);
        tooth.setType(TYPE_UPPER);

        x += tooth.width + TOOTH_PADDING;

        array[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;
        
        this.arrayCount++;

        tooth.createSurfaces();

    }

    for (var i = 21; i < 29; i++) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base, this.imgWidth, this.imgHeight);
        tooth.setType(TYPE_UPPER);

        x += tooth.width + TOOTH_PADDING;

        array[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;
        
        this.arrayCount++;

        tooth.createSurfaces();

    }

    // start position of first 
    var x = start;

    for (var i = 48; i > 40; i--) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base + this.seperator, this.imgWidth, this.imgHeight);
        tooth.setType(TYPE_LOWER);

        x += tooth.width + TOOTH_PADDING;

        array[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;
        
        this.arrayCount++;

        tooth.createSurfaces();

    }

    for (var i = 31; i < 39; i++) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base + this.seperator, this.imgWidth, this.imgHeight);

        tooth.setType(TYPE_LOWER);

        array[this.arrayCount] = tooth;
        x += tooth.width + TOOTH_PADDING;

        tooth.address = this.arrayCount;
        this.arrayCount++;

        tooth.createSurfaces();

    }

};

/**
 * Method to prepare the layout for an odontograma
 * @param {type} array container for all the teeths
 * @returns {undefined}
 */
OdontogramaGenerator.prototype.prepareOdontogramaChild = function(array, canvas) {

    var self = this;
    this.arrayCount = 0;


    var width = canvas.width;
    var odontWidth = 10 * this.imgWidth;
    var start = (width - odontWidth)/2;
    // start of first tooth
    var x = start;

    for (var i = 55; i > 50; i--) {

        var tooth = new Tooth();

        if (i > 54)
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
        tooth.setDimens(x, this.base, this.imgWidth, this.imgHeight);
        tooth.setType(TYPE_UPPER);

        x += tooth.width + TOOTH_PADDING;

        array[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;
        
        this.arrayCount++;

        tooth.createSurfaces();

    }

    for (var i = 61; i < 66; i++) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base, this.imgWidth, this.imgHeight);
        tooth.setType(TYPE_UPPER);

        x += tooth.width + TOOTH_PADDING;
        
        tooth.address = this.arrayCount;
        
        array[this.arrayCount] = tooth;

        this.arrayCount++;

        tooth.createSurfaces();

    }

    // start position of first 
    var x = start;

    for (var i = 85; i > 80; i--) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base + this.seperator, this.imgWidth, this.imgHeight);
        tooth.setType(TYPE_LOWER);

        x += tooth.width + TOOTH_PADDING;

        array[this.arrayCount] = tooth;

        tooth.address = this.arrayCount;
        
        this.arrayCount++;

        tooth.createSurfaces();

    }

    for (var i = 71; i < 76; i++) {

        var tooth = new Tooth();

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
        tooth.setDimens(x, this.base + this.seperator, this.imgWidth, this.imgHeight);

        tooth.setType(TYPE_LOWER);

        array[this.arrayCount] = tooth;
        x += tooth.width + TOOTH_PADDING;


        tooth.address = this.arrayCount;
        this.arrayCount++;

        tooth.createSurfaces();

    }

};


