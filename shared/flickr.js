// shared/flickr.js
$.ajax({
	"url": 'https://api.flickr.com/services/rest/',
	"data": {
	"method": 'flickr.photos.search',
	"api_key": credentials.flickr.api_key,
	"tags": 'seabus',
	"format": 'json',
	"nojsoncallback": 1
},
	"success": function (response) {
	// input should be flickr's photo details including server secret and farm
	// output is full jpg web address
	var createJpgPath = function(photos)
		{
			var i,
				photo,
				photoSrc=[],
				len = photos.length;
			for (i = 0; i < len; i++) {
				photo = photos[i];
				// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
				photoSrc.push("https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
			}
			return photoSrc;	
		}
	var photoSrc = createJpgPath(response.photos.photo)
	$.each(photoSrc, function(i, src){
		$('body').append('<img src="'+src+'">');
	});
	}
});
