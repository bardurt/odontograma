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




function handleCollision(tooth, argument)
{

    console.log("HandleCollision("+ tooth.id +"," + argument +")");

    if (argument === "0")
    {
        
        tooth.highlight = true;
    }
    else
    {
        toggleDamage(tooth, argument);
    }

}

function handleCollisionCheckBox(checkBox, argument)
{
    console.log("handleCollisionCheckBox(" + checkBox +", " + argument+ ")");

    if(argument === "12")
    {
        if(checkBox.state === 1)
        {
            checkBox.state = 0;
        }
        else
        {
            checkBox.state = 1;
        }
      
    }
    else if(argument === "13")
    {
         if(checkBox.state === 2)
        {
            checkBox.state = 0;
        }
        else
        {
            checkBox.state = 2;
        }
    }

}
