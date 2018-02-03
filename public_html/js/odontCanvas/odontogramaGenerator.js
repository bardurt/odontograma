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

// variable for how many images have been loaded
var currentLoad = 0;

// variable for how many teeths are in array
var arrayCount = 0;

var ADULT = 32;

var base = 20;
var seperator = 210;
var imgWidth = 40;
var imgHeight = 90;

var Callback;


/**
 * Method to prepare the layout for an odontograma
 * for adult person
 * @returns {Array|mouth} list of teeth for odontograma
 */
function prepareOdontogramaAdult(array) {


    arrayCount = 0;

    // start of first tooth
    var x = 0;

    for (var i = 18; i > 10; i--) {

        var tooth;

        if (i > 13)
        {
            tooth = Tooth5();
        } else
        {
            tooth = Tooth4();
        }

        var image = new Image();

        image.onload = function () {
            updateLoad();
        };

        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base;
        tooth.width = imgWidth;
        tooth.height = imgHeight;
        tooth.type = TYPE_UPPER;

        x += tooth.width + TOOTH_PADDING;



        array[arrayCount] = tooth;

        arrayCount++;
        
        createSurfaces(tooth);

    }

    for (var i = 21; i < 29; i++) {

        var tooth;

        if (i < 24)
        {
            tooth = Tooth4();
        } else
        {
            tooth = Tooth5();
        }

        var image = new Image;

        image.onload = function () {
            updateLoad();
        };

        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base;
        tooth.width = imgWidth;
        tooth.height = imgHeight;
        tooth.type = TYPE_UPPER;

        x += tooth.width + TOOTH_PADDING;

        array[arrayCount] = tooth;
        
        arrayCount++;
        
        createSurfaces(tooth);

    }

    // start position of first 
    var x = 0;

    for (var i = 48; i > 40; i--) {

        var tooth;

        if (i < 44)
        {
            tooth = Tooth4();

        } else
        {
            tooth = Tooth5();
        }


        var image = new Image();

        image.onload = function () {
            updateLoad();
        };

        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base + seperator;
        tooth.width = imgWidth;
        tooth.height = imgHeight;
        tooth.type = TYPE_LOWER;

        x += tooth.width + TOOTH_PADDING;

        array[arrayCount] = tooth;

        arrayCount++;
        
        createSurfaces(tooth);

    }

    for (var i = 31; i < 39; i++) {

        var tooth;

        if (i < 34)
        {
            tooth = Tooth4();
        } else
        {
            tooth = Tooth5();
        }


        var image = new Image();

        image.onload = function () {
            updateLoad();
        };

        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base + seperator;
        tooth.width = imgWidth;
        tooth.height = imgHeight;
        tooth.type = TYPE_LOWER;

        array[arrayCount] = tooth;
        x += tooth.width + TOOTH_PADDING;

        arrayCount++;
        
        createSurfaces(tooth);

    }

}

function updateLoad() {

    currentLoad++;

    console.log("Images " + currentLoad + " loaded");
    
    // notify when all images have been loaded
    if(currentLoad >= arrayCount){
        Callback(true);
    }
}
