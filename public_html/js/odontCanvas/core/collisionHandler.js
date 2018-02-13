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
 * Helper class for handling collisions
 * @returns {CollisionHandler}
 */
function CollisionHandler()
{
    this.constants = null;
}

CollisionHandler.prototype.setConstants = function(constants){
    
    this.constants = constants;
};

/**
 * Method to handle a collision with a tooth
 * @param {type} tooth
 * @param {type} argument
 * @returns {undefined}
 */
CollisionHandler.prototype.handleCollision = function (tooth, argument)
{
    
    console.log("Collision argument " + argument);

    if (argument !== 0 && argument !== undefined && !isNaN(argument)) {
        console.log("Handle collision");

        if (argument !== this.constants.CARIES && 
            argument !== this.constants.CURACION) {
            
            tooth.toggleDamage(argument);
        }
    }

};


/**
 * Method to handle a collision with a checkbox
 * @param {type} checkBox
 * @param {type} argument
 * @returns {undefined}
 */
CollisionHandler.prototype.handleCollisionCheckBox = function (checkBox, argument)
{

    if (argument === this.constants.CARIES) {
        
        if (checkBox.state === 1){
            checkBox.state = 0;
        } else {
            checkBox.state = 1;
        }

    } else if (argument === this.constants.CURACION) {
        
        if (checkBox.state === 2) {
            checkBox.state = 0;
        } else {
            checkBox.state = 2;
        }
    }

};
