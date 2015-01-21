<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<script type="text/javascript">
			
			//http://www.w3schools.com/js/js_date_methods.asp
			//http://www.w3schools.com/js/tryit.asp?filename=tryjs_date_new_numbers
			function onPageLoaded()
			{
				var now = new Date();

				var currentYear  = now.getFullYear();
				var currentMonth = now.getMonth();
				var currentDay   = now.getDate();

				var initialDay = new Date(currentYear, 7, 16);//now;//new Date(currentYear, currentMonth, currentDay - 31);
				var lastDay    = new Date(initialDay.getFullYear(), initialDay.getMonth(), initialDay.getDate() + 48);

				//alert("initialDay = " + initialDay.toDateString() + " lastDay = " + lastDay.toDateString());

				var days 			= getDays(initialDay, lastDay);
				var daysByDayOfWeek = arrangeDaysByDayOfWeek(days);
				var calendar 		= document.getElementById("calendar");
				var html     		= ""; 
				var currentX 		= 0;
				var currentY 		= 0;
				var daysOfWeek 		= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

				for(var x = 0; x < daysOfWeek.length; x++)
				{
					var currentDay = daysOfWeek[x];
					html += "<div style='position:absolute; left:" + currentX + "px; top:" + currentY + "px; width:100; height:50;'> " + currentDay + " </div>"

					currentX += 100;
				}

				currentX = 0;
				currentY = 50;

				for(var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++)
				{
					var currentDays = daysByDayOfWeek[dayOfWeek];

					//console.log("dayOfWeek = " + dayOfWeek + " currentDays = " + currentDays.length);

					for(var x = 0; x < currentDays.length; x++)
					{
						var currentDay = currentDays[x];

						var dayText = currentDay == null ? "" : currentDay.toDateString().substring(4, currentDay.toDateString().length - 4);
						html += "<div style='position:absolute; left:" + currentX + "px; top:" + currentY + "px; width:100; height:50;'> " + dayText + " </div>"

						currentY += 50;
					}

					currentX += 100;
					currentY  = 50;
				}

				calendar.innerHTML = html;
			}

			function arrangeDaysByDayOfWeek(days)
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
						currentDays 			   = new Array();
						arrangedDays[dayOfWeek] = currentDays;
					}

					currentDays.push(currentDay);

					//console.log("currentDays = " + currentDays.length +", dayOfWeek = " + dayOfWeek);
				}

				return arrangedDays;
			}

			function getDays(initialDay, lastDay)
			{
				var days 	   = new Array();
				var currentDay = initialDay;
				var x = 0;

				while(currentDay.getFullYear() != lastDay.getFullYear() || currentDay.getMonth() != lastDay.getMonth() || currentDay.getDate() != lastDay.getDate())
				{
					days.push(currentDay);

					currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);

					x++;
					//console.log(x);
				}

				days.push(currentDay);

				return days;
			}

		</script>
	</head>
	<body onload="onPageLoaded();">
		<div id="calendar" >
	</body>
</html>