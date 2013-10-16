var canvas = $("#c");
var c = canvas[0].getContext("2d");

var images = new Array();

var path = "http://smallbeerpress.com/wp-content/uploads/itunes.png"

for(var i = 0; i < 10; i++) {
    images[i] = new DragImage(path, Math.floor((Math.random()*400)), Math.floor((Math.random()*400)));
}

var loop = setInterval(function() {

    c.fillStyle = "white";
    c.fillRect(0, 0, 500, 500);

    for(var i = 0; i < 10; i++) {
        images[i].update();
    }

}, 30);

var mouseX = 0, mouseY = 0;
var mousePressed = false;
canvas.mousemove(function(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
})
 
$(document).mousedown(function(){
    mousePressed = true;
}).mouseup(function(){
    mousePressed = false;
});

function DragImage(src, x, y) {
    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.x = x;
    this.y = y;
    var img = new Image();
    img.src = src;
    this.update = function() {
        if (mousePressed){
            var left = that.x;
            var right = that.x + img.width;
            var top = that.y;
            var bottom = that.y + img.height;
            if (!drag){
              startX = mouseX - that.x;
              startY = mouseY - that.y;
            }
            if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top){
               drag = true;
            }
        }else{
           drag = false;
        }
        if (drag){
            that.x = mouseX - startX;
            that.y = mouseY - startY;
        }
        c.drawImage(img, that.x, that.y);
    }
}