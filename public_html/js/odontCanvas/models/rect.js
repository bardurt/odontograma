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
    
}

Rect.prototype.cavity = function(){
    this.state = 1;
};

Rect.prototype.restoration = function(){
    this.state = 2;
};

Rect.prototype.uncheck = function(){
    this.state = 0;
};