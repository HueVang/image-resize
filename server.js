
var express = require('express');
var path = require('path');
var app = express();

const fs = require('fs');
const resizeImg = require('resize-img');

var runResize = () => {
  resizeImg(fs.readFileSync('public/images/react.png'), {width: 128, height: 128}).then(buf => {
  	fs.writeFileSync('public/images/react-2.png', buf);
  });
}; // end runResize


app.use(express.static('public'));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.post('/resize', function(req, res){
  runResize();
  res.sendStatus(200);
});

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Listening on port', server.address().port);
});
