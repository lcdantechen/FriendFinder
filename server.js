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
		
		name:"SuperMan",
    photo:"http://www.animatedimages.org/data/media/1579/animated-superman-image-0006.gif",
    scores:[
     5,
     5,
     4,
     3,
     1,
     4,
     5,
     1,
     1,
     1
   ]
	},

	{
		
		name:"IronMan",
    photo:"http://x.annihil.us/u/prod/marvel/i/mg/7/10/4bc45e96b7980.jpg",
    scores:[
     4,
     3,
     5,
     5,
     1,
     5,
     2,
     5,
     1,
     5
   ]	
	},

	{
	
		name:"DeadPool",
    photo:"http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/article_main_wide_image/public/deadpool_lead_4.jpg?itok=czdVRMnH",
    scores:[
     1,
     1,
     1,
     5,
     5,
     2,
     4,
     5,
     1,
     1
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