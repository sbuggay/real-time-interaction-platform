var express = require("express");
var app = express();
app.get('/', function(req, res){
    
});
app.configure(function () {
    app.use(express.static(__dirname));
})

app.listen(3000);