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
 * Settings class for the application.
 * This class contains all the values, which are not 
 * fixed in the engine.
 * @returns {Settings}
 */
function Settings() {
    "use strict";
    // app settings
    this.DEBUG = false;
    this.HIHGLIGHT_SPACES = false;
    this.TOOTH_PADDING = 0;
    this.RECT_DIMEN = 10;
    
    // colors
    this.COLOR_ON_TOUCH = "#FF8B00";
    this.COLOR_HIGHLIGHT = "#1CDE02";
    this.COLOR_RED = "#ff0000";
    this.COLOR_BLUE = "#0052ff";
    this.COLOR_BLACK = "#000000";
    this.COLOR_HIGHLIGHT = "#00AEFF";
    this.COLOR_HIGHLIGHT_BAD = "#FF0000";

}