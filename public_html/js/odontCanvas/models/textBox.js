/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TextBox() {

    this.text = "";
    this.rect = new Rect();
    this.touching = false;

}

TextBox.prototype.setDimens = function (x, y, width, height) {

    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;

};

TextBox.prototype.setText = function (text) {

    this.text = text;
};


TextBox.prototype.render = function (context, color) {

    context.beginPath();

    if (this.text !== "") {
        context.fillStyle = "#ffffff";

        context.fillRect(this.rect.x,
                this.rect.y,
                this.rect.x + this.rect.width,
                this.rect.y + this.rect.height);

    }

    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    this.rect.outline(context, "#00000");

    context.textAlign = "center";
    context.fillStyle = color;

    context.fillText(this.text, this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 3);

    context.stroke();

};
