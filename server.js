var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

var characters = [

	{
		routeName: "yoda",
		name:"yoda",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    scores:[
     5,
     1,
     4
   ]
	},

	{
		routeName: "car",
		name:"car",
    photo:"http://oi47.tinypic.com/6t1esg.jpg",
    scores:[
     1,
     5,
     1
   ]	
	},

	{
		routeName: "Brad Pitt",
		name:"Brad Pitt",
    photo:"https://s-media-cache-ak0.pinimg.com/236x/42/29/17/4229178045bad6d6f5f47efc6ec8b0c9.jpg",
    scores:[
     2,
     3,
     4
   ]
	}
]

app.get('/survey', function(req, res){
	res.sendFile(path.join(__dirname, '/app/public/survey.html'));
})

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/app/public/home.html'));
})

app.post('/api/friends', function(req, res){

	var newcharacter = req.body;
	console.log(newcharacter.scores);
  var userScore = [];
	for (var i=0 ; i<newcharacter.scores.length; i++) {
		var eachScore = parseInt(newcharacter.scores[i]);
		userScore.push(eachScore);
	}
	console.log(userScore);
	var difference = 0;
	var absoluteValue = 0;
	var absoluteValueDifference = [];
	
  
  for (var x=0; x<characters.length; x++) {

		  for (var i=0; i<userScore.length; i++) {
		  	difference = difference + (Math.abs(characters[x].scores[i] - userScore[i]));

		  }
		  absoluteValue = difference;
		  absoluteValueDifference.push(absoluteValue);
		  difference = 0;
		  console.log(absoluteValue);
	 }
	 console.log(absoluteValueDifference);
	 var min = absoluteValueDifference[0];
	 var minIndex = 0;
   
   for (var j=1; j<absoluteValueDifference.length; j++) {
   	  if (absoluteValueDifference[j] < min) {
   	  	  minIndex=j;
   	  	  console.log(minIndex);
   	  	  console.log("inside for loop")
   	  	  min = absoluteValueDifference[j];
   	  }
   }
	


	/*characters.push(newcharacter);*/
  console.log(minIndex);
	res.json(characters[minIndex]);
})

app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})