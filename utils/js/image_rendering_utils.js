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
        case 'jpg':
        case 'bmp':
        case 'png':
        case 'tif':
            canvas.src = fileInput.files[0];
            var reader   	   = new FileReader();
	        reader.onload 	   = function(e) 
	        {	
			    var img = new Image();
			    
			    img.onload = function() 
			    { 
			    	var fitScale  = MathUtils.instance.getFitScale({ "x":img.width, "y":img.height }, { "x":canvas.width, "y":canvas.height }, "FitIn");
			    	var fitWidth  = img.width  * fitScale;
			    	var fitHeight = img.height * fitScale;
			    	var fitX      = (canvas.width  - fitWidth)  / 2;
			    	var fitY      = (canvas.height - fitHeight) / 2;

			    	canvas.getContext("2d").clearRect(0,0, canvas.width, canvas.height);
			    	canvas.getContext("2d").drawImage(img, fitX, fitY, fitWidth, fitHeight); 
			    };
			    img.src = e.target.result;
	        }

	        reader.readAsDataURL(fileInput.files[0]);
        break;
        default:
            alert('Selected file is not a valid image');
            fileInput.value	   = '';
            canvas.src = '';
    }
};