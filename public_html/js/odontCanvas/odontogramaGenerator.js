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


var base = 20;
var seperator = 250;

/**
 * Method to prepare the layout for an odontograma
 * for adult person
 * @returns {Array|mouth} list of teeth for odontograma
 */
function prepareOdontogramaAdult() {

    mouth = new Array();

    var count = 0;

    // start of first tooth
    var x = 6;

    for (var i = 18; i > 10; i--) {

        var tooth;
                
        if(i > 13 )
        {
           tooth = Tooth5();
        } 
        else
        {
           tooth = Tooth4();
        }

        var image = new Image();
        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base;
        tooth.width = image.naturalWidth;
        tooth.height = image.naturalHeight;
        tooth.type = TYPE_UPPER;
        tooth.fractura = false;
        tooth.da = false;

        x += tooth.width + TOOTH_PADDING;

        mouth[count] = tooth;

        count++;

    }

    for (var i = 21; i < 29; i++) {

        var tooth;
        
        if(i > 23)
        {
            tooth = Tooth4();
        }
        else
        {
            tooth = Tooth5();
        }

        var image = new Image();
        image.src = "images/dentadura-sup-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base;
        tooth.width = image.naturalWidth;
        tooth.height = image.naturalHeight;
        tooth.type = TYPE_UPPER;
        tooth.fractura = false;
        tooth.da = false;

        x += tooth.width + TOOTH_PADDING;

        mouth[count] = tooth;
        count++;

    }

    // start position of first 
    var x = 0;

    for (var i = 48; i > 40; i--) {
        
        var tooth;
        
        if(i < 43)
        {
            tooth = Tooth4();
            
        } 
        else
        {
            tooth = Tooth5();
        }
      

        var image = new Image();
        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base + seperator;
        tooth.width = image.naturalWidth;
        tooth.height = image.naturalHeight;
        tooth.type = TYPE_LOWER;
        tooth.fractura = false;
        tooth.da = false;

        x += tooth.width + TOOTH_PADDING;

        mouth[count] = tooth;

        count++;

    }

    for (var i = 31; i < 39; i++) {

        var tooth;
        
        if(i < 34)
        {
            tooth = Tooth4();
        }
        else
        {
            tooth = Tooth5();
        }

        var image = new Image();
        image.src = "images/dentadura-inf-" + i + ".png";

        tooth.id = i;
        tooth.image = image;
        tooth.x = x;
        tooth.y = base + seperator;
        tooth.width = image.naturalWidth;
        tooth.height = image.naturalHeight;
        tooth.type = TYPE_LOWER;
        tooth.fractura = false;
        tooth.da = false;

        x += tooth.width + TOOTH_PADDING;

        mouth[count] = tooth;

        count++;

    }

    return mouth;
}
