//Singleton instance
var ImageRenderingUtils = { instance : new ImageRenderingUtilsClass() };

//Constructors
function ImageRenderingUtilsClass()
{
	//Methods
	this.renderInputImage = function(fileInput, canvas, preferedCanvasSize, maxImageSize)
	{
		var ext = (fileInput.value.match(/\.([^\.]+)$/)[1]).toLowerCase();

		if(ext == 'jpg' || ext == 'jpeg' || ext == 'bmp' || ext == 'png' || ext == 'tif')
			this.renderImageDataIntoCanvas(fileInput.files[0], canvas, preferedCanvasSize, maxImageSize);
	  else //HACK: Using setTimeout to fix iOS issue -> http://stackoverflow.com/questions/18903525/alert-and-confirm-not-working-with-apple-mobile-web-app-capable
	    setTimeout(function(){ alert('Selected file is not a valid image, extension = ' + ext); }, 100);
	};

	this.renderImageDataIntoCanvas = function(imageData, canvas, preferedCanvasSize, maxImageSize)
	{
		var reader   	= new FileReader();
		reader.onload = function(e)
		{
			var image 		= new Image();
			image.onload 	= function() { ImageRenderingUtils.instance.loadImageIntoCanvas(image, canvas, preferedCanvasSize, maxImageSize); };
			image.src	 		= e.target.result;
		}

		reader.readAsDataURL(imageData);
	};

	this.renderImageSourceIntoCanvas = function(imageSource, canvas, preferedCanvasSize, maxImageSize)
	{
			var image 		= new Image();
			image.onload 	= function() { ImageRenderingUtils.instance.loadImageIntoCanvas(image, canvas, preferedCanvasSize, maxImageSize); };
			image.src	 		= imageSource;
	};

	this.loadImageIntoCanvas = function(image, canvas, preferedCanvasSize, maxImageSize)
	{
	    //alert("image.width = " + image.width + " image.height = " + image.height + " maxImageSize = " + maxImageSize);

	   maxImageSize        		= Math.min(Math.min(maxImageSize, image.width), image.height);
		var downscaleImageScale = MathUtils.instance.getFitScale({ w:image.width, h:image.height }, { w:maxImageSize, h:maxImageSize }, "FitIn");
		var downscaleImageSize  = { w:image.width * downscaleImageScale, h: image.height * downscaleImageScale};

		//alert("downscaleImageScale " + downscaleImageScale + " downscaleImageSize = " + downscaleImageSize.w + "," + downscaleImageSize.h);

		canvas.width 	= downscaleImageSize.w;
		canvas.height = downscaleImageSize.h;

		canvas.getContext("2d").clearRect(0,0, canvas.width, canvas.height);
		canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

		preferedCanvasSize = Math.min(preferedCanvasSize, maxImageSize * 1.5);

		var fitCanvasSizeScale = MathUtils.instance.getFitScale({ w:canvas.width, h:canvas.height }, { w:preferedCanvasSize, h:preferedCanvasSize }, "FitIn");
		var fitCanvasSize      = { w: canvas.width * fitCanvasSizeScale, h: canvas.height * fitCanvasSizeScale};

		canvas.style.width  = fitCanvasSize.w + "px";
		canvas.style.height = fitCanvasSize.h + "px";
	};
}
