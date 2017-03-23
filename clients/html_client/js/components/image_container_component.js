function ImageContainerComponent(canvas)
{
	this.loadImage = function(fileName, onProgress)
	{
		FilesService.instance.downloadFile(fileName, onImageLoadedCallback, onProgress);
	}

	function onImageLoadedCallback(resultData)
	{
		if(resultData.success)
		{
			//TODO: Get and check content type
			var blob = new Blob([resultData.data], { type:'image/jpeg' });
			ImageRenderingUtils.instance.renderImageDataIntoCanvas(blob, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE);
		}
		else
			alert('error downloading image ' + imageURL);
	}

	this.renderInputImage = function(fileInput)
	{
		ImageRenderingUtils.instance.renderInputImage(fileInput, canvas, canvas.parentElement.offsetWidth * 0.9, Constants.IMAGE_MAX_SIZE);
	}
}
