//Singleton instance
var ImageRenderingUtils = { instance : new ImageRenderingUtilsClass() };

//Variables
ImageRenderingUtilsClass.prototype._templateVariable = null;

//Constructors
function ImageRenderingUtilsClass()
{
}

//Methods
ImageRenderingUtilsClass.prototype.renderImage = function(fileInput, canvas)
{
	var ext = fileInput.value.match(/\.([^\.]+)$/)[1];

    switch(ext)
    {
        case 'jpg': case 'jpeg': case 'bmp': case 'png': case 'tif':
            var reader   	= new FileReader();
	        reader.onload 	= function(e) 
	        {	
			    var image = new Image();
			    image.onload = function() { ImageRenderingUtils.instance.loadImageIntoCanvas(image, canvas); };
			    image.src = e.target.result;
	        }

	        reader.readAsDataURL(fileInput.files[0]);
        break;
        default:
            alert('Selected file is not a valid image, extension = ' + ext);
    }
};

ImageRenderingUtilsClass.prototype.loadImageIntoCanvas = function(image, canvas)
{
	var fitScale  = MathUtils.instance.getFitScale({ "x":image.width, "y":image.height }, { "x":canvas.width, "y":canvas.height }, "FitIn");
	var fitWidth  = image.width  * fitScale;
	var fitHeight = image.height * fitScale;
	var fitX      = (canvas.width  - fitWidth)  / 2;
	var fitY      = (canvas.height - fitHeight) / 2;

	canvas.getContext("2d").clearRect(0,0, canvas.width, canvas.height);
	canvas.getContext("2d").drawImage(image, fitX, fitY, fitWidth, fitHeight); 
}