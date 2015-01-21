var DateUtils = 
(
	function() 
	{
	    var _instance = null;
	 
	    return {
			        getInstance : function () 
			        {
			            if(_instance == null)
			                 _instance = new DateUtilsClass();
			            
			            return _instance;
			        }
			    };
	}
)();

function DateUtilsClass()
{
}

DateUtilsClass.prototype.arrangeDaysByDayOfWeek = function(days)
{
	var firstDay     = days[0];
	var arrangedDays = new Array();

	//Fill with empty days from sunday to first day
	for(var dayOfWeek = 0; dayOfWeek < firstDay.getDay(); dayOfWeek++)
	{
		var currentDays 		= new Array();
		arrangedDays[dayOfWeek] = currentDays;

		currentDays.push(null);
	}

	for(var x = 0; x < days.length; x++)
	{
		var currentDay   = days[x];
		var dayOfWeek    = currentDay.getDay();
		var currentDays  = arrangedDays[dayOfWeek];

		if(currentDays == null)
		{
			currentDays 			= new Array();
			arrangedDays[dayOfWeek] = currentDays;
		}

		currentDays.push(currentDay);
	}

	return arrangedDays;
}

DateUtilsClass.prototype.getDays = function(initialDay, lastDay)
{
	var days 	   = new Array();
	var currentDay = initialDay;

	while(currentDay.getFullYear() != lastDay.getFullYear() || currentDay.getMonth() != lastDay.getMonth() || currentDay.getDate() != lastDay.getDate())
	{
		days.push(currentDay);

		currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);
	}

	days.push(currentDay);

	return days;
};