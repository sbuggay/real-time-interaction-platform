var canvas = $("#c");
var c = canvas[0].getContext("2d");

var game = null;
var players = null;
var dragging = false;
var swapped = false;
var images = new Array();

function loadJSON() {
    images = new Array();
    
    $.getJSON($("#subs").val() + ".json", function (json) {
        console.log(json);
        game = json.game;
        players = json.players;
        $.each(json.pieces, function (i, fb) {
            images.push(new DragImage("resources/" + fb.piece, fb.x, fb.y));
        });
    });
}


var loop = setInterval(function() {

    c.fillStyle = "white";
    c.fillRect(0, 0, 1024, 512);
    c.font = "24px sans-serif";

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0)
                c.fillStyle="#d2b48c";
            else    
                c.fillStyle="#ffffff";

            c.fillRect(i * 64, j * 64, 64, 64); 
        }

    }

    for(var i = 0; i < images.length; i++) {
        if(images[i].update() == 1) {
            if(mousePressed == true && swapped == false) {
                images.move(i, images.length - 1);
                swapped = true;
            }
        }
    }

    c.fillStyle = "black";
    c.fillText(game + "(1/" + players + ")", 512, 24);

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
    swapped = false;
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
            if (dragging == false) {
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
                    dragging = true;
                }
            }
        }
        else {
            dragging = false;
            drag = false;
        }
        if (drag && dragging){
            that.x = mouseX - startX;
            that.y = mouseY - startY;
        }
        c.drawImage(img, that.x, that.y);
        if(dragging) {
            return 1;
        } 
        else {
            return 0;
        }
    }
}

function Card(src, x, y, flipped) {
    var that = this;
    var startX = 0, startY = 0;
    var drag = false;
    this.flipped = flipped;
    this.x = x;
    this.y = y;
    var img = new Image();
    img.src = src;
    this.update = function() {
        if (mousePressed) {
            if (dragging == false) {
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
                    dragging = true;
                }
            }
        }
        else {
            dragging = false;
            drag = false;
        }
        if (drag && dragging){
            that.x = mouseX - startX;
            that.y = mouseY - startY;
        }
        c.drawImage(img, that.x, that.y);
        if(dragging) {
            return 1;
        } 
        else {
            return 0;
        }
    }
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};