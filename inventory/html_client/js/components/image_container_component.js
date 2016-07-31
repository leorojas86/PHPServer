function ImageContainerComponent(canvas)
{
	this.loadImage = function(imageURL, onProgress)
	{
		var callback = function(xmlhttp, success, duration) { onImageLoadedCallback(imageURL, xmlhttp, success, duration); };
		RequestUtils.instance.request(imageURL, 'GET', callback, null, onProgress);
	}

	function onImageLoadedCallback(imageURL, xmlhttp, success, duration)
	{
		if(success)
		{
			var image 	 = new Image();
			image.onload = function() 
			{ 
				ImageRenderingUtils.instance.loadImageIntoCanvas(image, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE); 
			};
			image.src = imageURL;
		}
		else
			alert('error downloading image ' + imageURL);
	}

	this.renderImage = function(fileInput)
	{
		ImageRenderingUtils.instance.renderImage(fileInput, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE);
	}
}