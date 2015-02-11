var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/flickr', 
    handler: function (request, reply) {
		var credentials = require('./shared/credentials.js'),
			httpRequest = require('request'),
			flickrLib= require('./shared/flickr.js'),
			flickr = {
				"url": 'https://api.flickr.com/services/rest/',
				"qs": {
					"method": 'flickr.photos.search',
					"api_key": credentials.flickr.api_key,
					"tags": 'seabus',
					"format": 'json',
					"nojsoncallback": 1
				},
				"json": true
			};
		httpRequest(flickr, function (error, incomingMessage, response) {
			if (!error && incomingMessage.statusCode === 200) {
				// todo inclass: output html images
				// reply(flickrLib.createJpgPath(response.photos.photo)); // Browser output
				var photoSrc = flickrLib.createJpgPath(response.photos.photo),
					srcTag="",
					i;
					for (i=0; i<photoSrc.length; i++)
					{
						srcTag += '<img src="'+photoSrc[i]+'">';
					} 
				reply(srcTag);
			}
		})
	}
});
server.route({	
	method: 'GET',
    path:'/twitter',
	handler: function (request, reply) {
		//TWIT code to access twitter and output to screen
		var i,
			tweets="",
			credentials = require("./twitter/credentials.js"),
			Twit = require('twit'),
			twitterClient = new Twit(credentials.twitter);
			twitterClient.get('statuses/user_timeline', { screen_name: 'vanarts', count: 2 },  function (err, data, response) {
			for (i=0; i<2; i++)
				{
					// reply(data[i].text);
					tweets+= '<p>'+data[i].text+'</p>';
				}
				reply(tweets);
			});
		}
	});

server.route({
    method: 'GET',
    path:'/{param*}',
    handler: {
    	directory:{
    		path: "public",
    		listing: true,
    		index:false
    	}
    }
});
server.route({
    method: 'GET',
    path:'/shared/{param}',
    handler: {
    	directory:{
    		path: "shared",
    		listing: true,
    		index:false
    	}
    }
});


// Start the server
server.start(function () {
	console.log('Server running at ' + server.info.uri);
});