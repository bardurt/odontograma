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


function Constants() {
    "use strict";
    // Damages for drawing
    this.CARIES = 1;
    this.CORONA_DEFINITIVA = 2;
    this.CORONA_TEMPORAL = 3;
    this.DIENTE_AUSENTE = 4;
    this.FRACTURA = 5;
    this.DIASTEMA = 8;
    this.DIENTE_EXTRUIDO = 9;
    this.DIENTE_EN_CLAVIJA = 10;
    this.CURACION = 11;
    this.PROTESIS_REMOVIBLE = 12;
    this.MIGRACION = 13;
    this.GIROVERSION = 14;
    this.FUSION = 15;
    this.REMANENTE_RADICULAR = 16;
    this.DIENTE_INTRUIDO = 20;
    this.ORTONDICO_REMOVIBLE = 23;
    this.DIENTE_EN_ERUPCION = 24;
    this.TRANSPOSICION_LEFT = 25;
    this.TRANSPOSICION_RIGHT = 26;
    this.SUPER_NUMERARIO = 27;
    this.PULPAR = 28;
    this.PROTESIS_TOTAL = 29;
    this.PERNO_MUNON = 30;
    this.EDENTULOA_TOTAL = 31;
    this.ORTODONTICO_FIJO_END = 32;
    this.ORTODONTICO_FIJO_CENTER = 33;
    this.PROTESIS_FIJA_LEFT = 34;
    this.PROTESIS_FIJA_CENTER = 35;
    this.PROTESIS_FIJA_RIGHT = 36;

    // Damages for writing
    this.IMPLANTE = 6;
    this.MACRODONCIA = 17;
    this.MICRODONCIA = 18;
    this.IMPACTACION = 19;
    this.DIENTE_ECTOPICO = 21;
    this.DIENTE_DISCR0MICO = 22;
    this.SUPERFICIE_DESGASTADA = 37;
    this.SEMI_IMPACTACI0N = 38;
    
    /**
     * Method to check if a damage is writable, is text only
     * @param {type} arg id of the damage
     * @returns {Boolean} true if this damage is only text, else false
     */
    this.isWritable = function(arg) {
     
        var match = false;
        
        if (arg === this.DIENTE_DISCR0MICO) {
            match = true;
        } else if (arg === this.DIENTE_ECTOPICO) {
            match = true;
        } else if (arg === this.IMPACTACION) {
            match = true;
        } else if (arg === this.IMPLANTE) {
            match = true;
        } else if (arg === this.MACRODONCIA) {
            match = true;
        } else if (arg === this.MICRODONCIA) {
            match = true;
        } else if (arg === this.SEMI_IMPACTACI0N) {
            match = true;
        } else if (arg === this.SUPERFICIE_DESGASTADA) {
            match = true;
        }
        
        return match;
    };
};

