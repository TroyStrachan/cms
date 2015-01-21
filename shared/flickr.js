// shared/flickr.js
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
};
if (typeof module !== "undefined"){
	module.exports.createJpgPath = createJpgPath
}