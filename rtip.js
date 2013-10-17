var canvas = $("#c");
var c = canvas[0].getContext("2d");

var game = null;
var images = new Array();

function loadJSON() {
    images = new Array();
    $.getJSON($("#subs").val() + ".json", function (json) {
        console.log(json);
        $.each(json.pieces, function (i, fb) {
            images.push(new DragImage("resources/" + fb.piece, fb.x, fb.y));
        });
    });
}


var loop = setInterval(function() {

    c.fillStyle = "white";
    c.fillRect(0, 0, 1024, 512);

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0)
                c.fillStyle="#d2b48c";
            else    
                c.fillStyle="#a52a2a";

            c.fillRect(i * 64, j * 64, 64, 64); 
        }

    }

    for(var i = 0; i < images.length; i++) {
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