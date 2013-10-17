var canvas = $("#c");
var c = canvas[0].getContext("2d");

var images = new Array();
var board;

$.getJSON("chess.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    board = new Image();
    board.src = json.board;
});
var path = "white_knight.png"


for(var i = 0; i < 10; i++) {
    images[i] = new DragImage(path, Math.floor((Math.random()*400)), Math.floor((Math.random()*400)));
}

// $("#log").html("Debug: Objects: " + images.length;

var loop = setInterval(function() {

    c.fillStyle = "white";
    c.fillRect(0, 0, c.width, c.height);

    // for (var i = 0; i < 8; i++) {
    //     for (var j = 0; j < 8; j++) {
    //         if ((i + j) % 2 == 0)
    //             c.fillStyle="#333333";
    //         else    
    //             c.fillStyle="#AAAAAA";

    //         c.fillRect(i * 64, j * 64, 64, 64); 
    //     }

    // }

    c.drawImage(board, 0, 0);
    for(var i = 0; i < 10; i++) {
        images[i].update();
    }

}, 15);

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
        if (mousePressed) {
            var left = that.x;
            var right = that.x + img.width;
            var top = that.y;
            var bottom = that.y + img.height;
            if (!drag){
                startX = mouseX - that.x;
                startY = mouseY - that.y;
            }
            if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
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
