var MathUtils = { instance : new MathUtilsClass() };

function MathUtilsClass()
{
	this.getFitScale = function(originalSize, fitSize, fitMode)
	{
		var fixScaleW = fitSize.w / originalSize.w;
		var fixScaleH = fitSize.h / originalSize.h;
		var scale     = 1;

		//alert("fixScaleW = " + fixScaleW);
		
		switch(fitMode)
		{
			case "FitOut":
				scale = Math.max(fixScaleW, fixScaleH);
			break;
			case "FitIn":
				scale = Math.min(fixScaleW, fixScaleH);
			break;
		}
		
		return scale;
	};
}