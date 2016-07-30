function ImageContainerComponent(canvas)
{
	this.loadImage = function(imageURL)
	{
		var image 			= new Image();
		image.onload 		= function() { ImageRenderingUtils.instance.loadImageIntoCanvas(image, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE); };
		image.src 			= imageURL;
	}

	this.renderImage = function(fileInput)
	{
		ImageRenderingUtils.instance.renderImage(fileInput, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE);
	}
}