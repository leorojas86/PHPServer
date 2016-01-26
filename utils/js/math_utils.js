var MathUtils = { instance : new MathUtilsClass() };

function MathUtilsClass()
{
}

MathUtilsClass.prototype.getFitScale = function(originalSize, fitSize, fitMode)
{
	var fixScaleX = fitSize.x / originalSize.x;
	var fixScaleY = fitSize.y / originalSize.y;
	var scale   = 1;
	
	switch(fitMode)
	{
		case "FitOut":
			scale = Math.max(fixScaleX, fixScaleY);
		break;
		case "FitIn":
			scale = Math.min(fixScaleX, fixScaleY);
		break;
	}
	
	return scale;
};

/*
public static float GetFitScale(Vector2 originalSize, Vector2 fitSize, FitAxes fitAxes = FitAxes.Both, FitMode fitMode = FitMode.FitIn)
	{
		float fixScaleX = fitSize.x / originalSize.x;
		float fixScaleY = fitSize.y / originalSize.y;
		
		float scale = 1.0f;
		
		switch(fitAxes)
		{
			case FitAxes.Both:
	        {
				switch(fitMode)
				{
					case FitMode.FitOut:
						scale = Mathf.Max(fixScaleX, fixScaleY);
					break;
					case FitMode.FitIn:
						scale = Mathf.Min(fixScaleX, fixScaleY);
    				break;
				}
	        }
			break;
			case FitAxes.Horizontal: 
				scale = fixScaleX;
			break;
			case FitAxes.Vertical: 
				scale = fixScaleY;
			break;
		}
		
		return scale;
	}
*/