
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