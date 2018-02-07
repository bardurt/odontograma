/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Damage(id, x, y, width, height, type)
{
    this.id = id;

    this.rect = new Rect();
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;
    this.neighbour = -1;
    this.direction = -1; // 0 left, 1 right

    this.type = type;

}

Damage.prototype.renderFractura = function (context, settings)
{
    context.beginPath();

    if (this.type === TYPE_UPPER) {
        context.moveTo(this.rect.x, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height / 2);

    } else {

        context.moveTo(this.rect.x, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height / 2);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = settings.COLOR_RED;
    context.stroke();
    context.restore();

};


Damage.prototype.renderDienteAusente = function (context, settings)
{
    context.beginPath();

    console.log("Drawing upper");

    if (this.type === TYPE_UPPER) {

        context.moveTo(this.rect.x, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height / 2);

        context.lineWidth = 2;

        // set line color
        context.strokeStyle = settings.COLOR_BLUE;
        context.stroke();
        context.restore();

        context.moveTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x, this.rect.y + this.rect.height / 2);

        context.strokeStyle = settings.COLOR_BLUE;
        context.stroke();


    } else {

        console.log("Drawing lower");

        context.moveTo(this.rect.x, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height / 2);

        context.lineWidth = 2;

        // set line color
        context.strokeStyle = settings.COLOR_BLUE;
        context.stroke();
        context.restore();

        context.moveTo(this.rect.x + this.rect.width, this.rect.y);
        context.lineTo(this.rect.x, this.rect.y + this.rect.height / 2);

        context.strokeStyle = settings.COLOR_BLUE;
        context.stroke();

    }

    context.restore();
};

Damage.prototype.drawPulpar = function (context, settings)
{
    console.log("Drawing pulpar");

    context.beginPath();

    if (this.type === TYPE_UPPER) {


        context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 10);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);

    } else {

        context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y + 10);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);

    }

    context.lineWidth = 3;

    context.strokeStyle = settings.COLOR_BLUE;

    context.stroke();
    context.restore();
};

Damage.prototype.drawMigracion = function (context, settings)
{
    console.log("Drawing Migracion");

    context.beginPath();

    var spacer = 5;

    if (this.type === TYPE_UPPER) {

        // draw line
        context.moveTo(this.rect.x + spacer, this.rect.y + this.rect.height + 5);
        context.lineTo(this.rect.x + this.rect.width - spacer, this.rect.y + this.rect.height + 5);

        // upper point
        context.moveTo(this.rect.x + spacer, this.rect.y + this.rect.height + 5);
        context.lineTo(this.rect.x + spacer + 4, this.rect.y + this.rect.height + 10);

        // lower point
        context.moveTo(this.rect.x + spacer, this.rect.y + this.rect.height + 5);
        context.lineTo(this.rect.x + spacer + 4, this.rect.y + this.rect.height);

    } else {

        // draw line
        context.moveTo(this.rect.x + spacer, this.rect.y - 5);
        context.lineTo(this.rect.x + this.rect.width - spacer, this.rect.y - 5);

        // upper point
        context.moveTo(this.rect.x + this.rect.width - spacer, this.rect.y - 5);
        context.lineTo(this.rect.x + this.rect.width - spacer - 4, this.rect.y - 10);

        // upper point
        context.moveTo(this.rect.x + this.rect.width - spacer, this.rect.y - 5);
        context.lineTo(this.rect.x + this.rect.width - spacer - 4, this.rect.y);

    }

    context.lineWidth = 2;


    context.strokeStyle = settings.COLOR_BLUE;

    context.stroke();
    context.restore();

};

Damage.prototype.drawOrtondicoRemovible = function (context, settings)
{
    console.log("Drawing Ortondico Removible");

    context.beginPath();

    var spacer = 5;

    if (this.type === TYPE_UPPER) {

        // draw ZigZag
        context.moveTo(this.rect.x, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 10);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y);

    } else {

        // draw ZigZag
        context.moveTo(this.rect.x, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height + 10);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);

    }

    context.lineWidth = 2;

    context.strokeStyle = settings.COLOR_BLUE;

    context.stroke();
    context.restore();

};

Damage.prototype.drawDienteExtruido = function (context, settings)
{
    console.log("Drawing Diente Extruido");

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        // draw arrow head
        context.moveTo(this.rect.x + 10, this.rect.y + this.rect.height + 10);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height + 15);
        context.lineTo(this.rect.x + this.rect.width - 10, this.rect.y + this.rect.height + 10);

        // draw arrow line
        context.moveTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y + this.rect.height + 10);
        context.lineTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y + this.rect.height);


    } else {

        // draw arrow head
        context.moveTo(this.rect.x + 10, this.rect.y - 10);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y - 15);
        context.lineTo(this.rect.x + this.rect.width - 10, this.rect.y - 10);

        // draw arrow line
        context.moveTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y - 10);
        context.lineTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.fillStyle = settings.COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

};

Damage.prototype.drawDienteIntruido = function (context, settings)
{
    console.log("Drawing Diente Intruido");

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        // draw arrow head
        context.moveTo(this.rect.x + 10, this.rect.y + this.rect.height + 5);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width - 10, this.rect.y + this.rect.height + 5);

        // draw arrow line
        context.moveTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y + this.rect.height + 5);
        context.lineTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y + this.rect.height + 15);


    } else {

        // draw arrow head
        context.moveTo(this.rect.x + 10, this.rect.y - 5);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width - 10, this.rect.y - 5);

        // draw arrow line
        context.moveTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y - 5);
        context.lineTo(this.rect.x + this.rect.width / 2 - 1, this.rect.y - 15);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.fillStyle = settings.COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

};

Damage.prototype.drawProtesisRemovible = function (context, settings)
{
    console.log("Drawing Protesis Removible");

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        // draw lower line
        context.moveTo(this.rect.x, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y);

        // draw upper line
        context.moveTo(this.rect.x, this.rect.y - 10);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y - 10);

    } else {

        // draw lower line
        context.moveTo(this.rect.x, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);

        // draw upper line
        context.moveTo(this.rect.x, this.rect.y + this.rect.height + 10);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + 10);
    }

    context.lineWidth = 3;

    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.fillStyle = settings.COLOR_BLUE;

    context.stroke();
    context.fill();
    context.restore();

};

Damage.prototype.drawRemanenteRadicular = function (context, settings)
{

    context.beginPath();

    context.fillStyle = settings.COLOR_RED;
    context.textAlign = 'center';
    context.font = "20px Arial Bold";

    if (this.type === TYPE_UPPER)
    {
        context.fillText("RR", this.rect.x + this.rect.width/2, this.rect.y + this.rect.height / 2);
    } else
    {
        context.fillText("RR", this.rect.x + this.rect.width/2, this.rect.y + this.rect.height / 2);
    }

    context.restore();

};

Damage.prototype.drawGiroversion = function drawGiroversion(context, settings)
{

    context.beginPath();

    var cx = this.rect.x + this.rect.width / 2;
    var cy = this.rect.y + this.rect.height;
    var radius = (this.rect.width - 10) / 2;

    if (this.type === TYPE_UPPER)
    {

        // half circle
        context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, true);

        context.moveTo(this.rect.x + this.rect.width - 3, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width - 11, this.rect.y + this.rect.height);

        context.moveTo(this.rect.x + this.rect.width - 3, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width - 3, this.rect.y + this.rect.height + 8);

    } else
    {
        cy = this.rect.y;
        // draw lower line
        context.arc(cx, cy, radius, Math.PI, 2 * Math.PI, false);

        context.moveTo(this.rect.x + 3, this.rect.y);
        context.lineTo(this.rect.x + 11, this.rect.y);

        context.moveTo(this.rect.x + 3, this.rect.y);
        context.lineTo(this.rect.x + 3, this.rect.y - 8);
    }


    context.lineWidth = 2;

    context.strokeStyle = settings.COLOR_BLUE;

    context.stroke();
    context.restore();

};

Damage.prototype.drawPernoMunon = function (context, settings)
{
    context.beginPath();

    var size = this.rect.width - 20;

    if (this.type === TYPE_UPPER)
    {
        // draw rectangle
        context.rect(this.rect.x + 8, this.rect.y + this.rect.height - 8 - size, size, size);

        // draw line
        context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 8 - size);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 8 - 50);

    } else
    {
        // draw rectangle
        context.rect(this.rect.x + 8, this.rect.y + 8, size, size);

        // draw line
        context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y + 8 + size);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + 8 + 50);
    }


    context.lineWidth = 2;

    context.strokeStyle = settings.COLOR_BLUE;

    context.stroke();
    context.restore();

};

Damage.prototype.drawDienteEnErupcion = function (context, settings)
{
    context.beginPath();

    var pad = 2;

    if (this.type === TYPE_UPPER)
    {
        // draw arrow head
        context.moveTo(this.rect.x + pad, this.rect.y + this.rect.height - 6);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width - pad, this.rect.y + this.rect.height - 6);

        // draw zig zag
        context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 6);
        context.lineTo(this.rect.x + pad * 3, this.rect.y + this.rect.height - 12);
        context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + this.rect.height - 24);
        context.lineTo(this.rect.x + pad * 3, this.rect.y + this.rect.height - 36);
        context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + this.rect.height - 48);
        context.lineTo(this.rect.x + pad * 3, this.rect.y + this.rect.height - 60);

    } else
    {
        // draw arrow head
        context.moveTo(this.rect.x + pad, this.rect.y + 6);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width - pad, this.rect.y + 6);

        // draw zig zag
        context.moveTo(this.rect.x + this.rect.width / 2, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + 6);
        context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + 12);
        context.lineTo(this.rect.x + pad * 3, this.rect.y + 24);
        context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + 36);
        context.lineTo(this.rect.x + pad * 3, this.rect.y + 48);
        context.lineTo(this.rect.x + this.rect.width - pad * 3, this.rect.y + 60);
    }

    context.lineWidth = 3;

    context.strokeStyle = settings.COLOR_BLUE;

    context.stroke();
    context.restore();
};

Damage.prototype.drawProtesisTotal = function (context, settings)
{

    context.beginPath();

    if (this.type === TYPE_UPPER) {
        context.moveTo(this.rect.x, this.rect.y + this.rect.height - 10);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height - 10);

        context.moveTo(this.rect.x, this.rect.y + this.rect.height - 15);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height - 15);

    } else {

        context.moveTo(this.rect.x, this.rect.y + 10);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + 10);

        context.moveTo(this.rect.x, this.rect.y + 15);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + 15);
    }

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();

};

Damage.prototype.drawEdentuloTotal = function (context, settings)
{

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        context.moveTo(this.rect.x, this.rect.y + this.rect.height - 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height - 20);

    } else {

        context.moveTo(this.rect.x, this.rect.y + 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + 20);
    }

    context.lineWidth = 3;
    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();

};

Damage.prototype.drawDienteEnClavija = function (context, settings)
{
    context.beginPath();
    var space = 40;

    context.lineWidth = 3;

    context.strokeStyle = settings.COLOR_BLUE;

    if (this.type === TYPE_UPPER)
    {
        context.moveTo(this.rect.x, this.rect.y + this.rect.height);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 30);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);

        context.closePath();
    } else
    {
        context.moveTo(this.rect.x, this.rect.y);
        context.lineTo(this.rect.x + this.rect.width / 2, this.rect.y + 30);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y);

        context.closePath();

    }

    context.stroke();
    context.restore();

};

Damage.prototype.drawFusion = function (context, settings)
{
    var cx = this.rect.x + this.rect.width / 2;

    var radius = (this.rect.width + 5) / 2;

    context.beginPath();

    if (this.type === TYPE_UPPER) {
        var cy = this.rect.y + this.rect.height * 3 / 4;

    } else {
        var cy = this.rect.y + 10;
    }

    context.ellipse(cx, cy, radius, radius - 15, 0, 0, 2 * Math.PI);

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();

};

Damage.prototype.drawCoronaDefinitiva = function (context, settings)
{

    var cx = this.rect.x + this.rect.width / 2;
    var cy = 0;

    var radius = (settings.RECT_DIMEN * 3) / 2;

    context.beginPath();

    if (this.type === TYPE_UPPER) {
        cy = this.rect.y + 16;
    } else {
        cy = this.rect.y + this.rect.height - 16;
    }

    context.ellipse(cx, cy, radius, radius, 0, 0, 2 * Math.PI);

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = settings.COLOR_BLUE;
    context.stroke();
    context.restore();

};

Damage.prototype.drawCoronaTemporal = function (context, settings)
{

    var cx = this.rect.x + this.rect.width / 2;
    var cy = 0;

    var radius = (settings.RECT_DIMEN * 3) / 2;

    context.beginPath();

    if (this.type === TYPE_UPPER) {
        cy = this.rect.y + 16;
    } else {
        cy = this.rect.y + this.rect.height - 16;
    }

    context.ellipse(cx, cy, radius, radius, 0, 0, 2 * Math.PI);

    context.lineWidth = 2;
    // set line color
    context.strokeStyle = settings.COLOR_RED;
    context.stroke();
    context.restore();

};

Damage.prototype.drawDiastema = function (context, settings)
{

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        console.log("Drawing diastema");

        context.lineWidth = 2;
        // set line color
        context.strokeStyle = settings.COLOR_BLUE;

        context.beginPath();

        context.arc(this.rect.x + this.rect.width / 2 + 15,
                this.rect.y + this.rect.height / 2 + this.rect.height / 4,
                15,
                Math.PI * 0.5, // 90 degress
                Math.PI * 1.5, // 270 degrees
                false);

        context.stroke();

        context.beginPath();

        context.arc(this.rect.x + this.rect.width / 2 - 15,
                this.rect.y + this.rect.height / 2 + this.rect.height / 4,
                15,
                Math.PI * 0.5, // 90 degress
                Math.PI * 1.5, // 270 degrees
                true);

        context.stroke();

    } else {

        console.log("Drawing diastema");

        context.lineWidth = 2;
        // set line color
        context.strokeStyle = settings.COLOR_BLUE;

        context.beginPath();

        context.arc(this.rect.x + this.rect.width / 2 + 15,
                this.rect.y + this.rect.height / 4,
                15,
                Math.PI * 0.5, // 90 degress
                Math.PI * 1.5, // 270 degrees
                false);

        context.stroke();

        context.beginPath();

        context.arc(this.rect.x + this.rect.width / 2 - 15,
                this.rect.y + this.rect.height / 4,
                15,
                Math.PI * 0.5, // 90 degress
                Math.PI * 1.5, // 270 degrees
                true);

        context.stroke();
    }

    context.restore();

};

Damage.prototype.drawSuperNumerario = function (context, settings)
{

    context.beginPath();

    if (this.type === TYPE_UPPER) {

        context.lineWidth = 2;
        // set line color
        context.strokeStyle = settings.COLOR_BLUE;

        context.beginPath();

        context.arc(this.rect.x + this.rect.width / 2,
                this.rect.y + 20,
                10,
                0, // 0 degress
                Math.PI * 2, // 360 degrees
                false);

        context.stroke();

        context.textAlign = 'center';
        context.fillStyle = settings.COLOR_BLUE;
        context.font = "16px Arial Bold";
        context.fillText("S", this.rect.x + this.rect.width / 2, this.rect.y + 25);

        context.restore();

    } else {

        context.lineWidth = 2;
        // set line color
        context.strokeStyle = settings.COLOR_BLUE;

        context.beginPath();

        context.arc(this.rect.x + this.rect.width / 2,
                this.rect.y + this.rect.height - 20,
                10,
                0, // 0 degress
                Math.PI * 2, // 360 degrees
                false);

        context.stroke();

        context.textAlign = 'center';
        context.fillStyle = settings.COLOR_BLUE;
        context.font = "16px Arial Bold";
        context.fillText("S", this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height - 15);

        context.restore();
    }

    context.restore();

};

Damage.prototype.render = function (context, settings)
{
    if (this.id === "1")
    {
        this.renderFractura(context, settings);
    }

    if (this.id === "2")
    {
        this.renderDienteAusente(context, settings);
    }

    if (this.id === "3")
    {
        this.drawPulpar(context, settings);
    }

    if (this.id === "4") {
        this.drawMigracion(context, settings);
    }

    if (this.id === "5") {
        this.drawOrtondicoRemovible(context, settings);
    }

    if (this.id === "6") {
        this.drawDienteExtruido(context, settings);
    }

    if (this.id === "7") {
        this.drawDienteIntruido(context, settings);
    }

    if (this.id === "8") {
        this.drawProtesisRemovible(context, settings);
    }

    if (this.id === "9") {
        this.drawRemanenteRadicular(context, settings);
    }

    if (this.id === "10") {
        this.drawGiroversion(context, settings);
    }

    if (this.id === "11") {
        this.drawPernoMunon(context, settings);
    }

    if (this.id === "12") {
        this.drawDienteEnErupcion(context, settings);
    }

    if (this.id === "15") {
        this.drawProtesisTotal(context, settings);
    }

    if (this.id === "16") {
        this.drawEdentuloTotal(context, settings);
    }

    if (this.id === "17") {
        this.drawDienteEnClavija(context, settings);
    }

    if (this.id === "18") {
        this.drawFusion(context, settings);
    }

    if (this.id === "19") {
        this.drawCoronaDefinitiva(context, settings);
    }

    if (this.id === "20") {
        this.drawCoronaTemporal(context, settings);
    }

    if (this.id === "21") {
        this.drawDiastema(context, settings);
    }

    if (this.id === "22") {
        this.drawSuperNumerario(context, settings);
    }


    if (settings.DEBUG) {
        this.rect.highlight(context);
    }
};


