/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Constants()
{
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
    
    this.DIENTE_DISCR0MICO = 50;
    this.DIENTE_ECTOPICO = 51;
    this.IMPACTACION = 52;
    this.IMPLANTE = 53;
    this.MACRODONCIA = 54;
    this.MICRODONCIA = 55;
    this.SEMI_IMPACTACI0N = 56;
    this.SUPERFICIE_DESGASTADA = 57;
    
    this.isWritable = function(arg){
        
        var match = false;
        
        if(arg === this.DIENTE_DISCR0MICO){
            match = true;
        } else if(arg === this.DIENTE_ECTOPICO){
            match = true;
        } else if(arg === this.IMPACTACION){
            match = true;
        } else if(arg === this.IMPLANTE){
            match = true;
        } else if(arg === this.MACRODONCIA){
            match = true;
        } else if(arg === this.MICRODONCIA){
            match = true;
        } else if(arg === this.SEMI_IMPACTACI0N){
            match = true;
        } else if(arg === this.SUPERFICIE_DESGASTADA){
            match = true;
        }
        
        return match;
    };
};
