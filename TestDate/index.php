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

				var initialDay = new Date(currentYear, currentMonth, currentDay - 30);
				var lastDay    = new Date(currentYear, currentMonth, currentDay + 30);

				//alert("initialDay = " + initialDay.toDateString() + " lastDay = " + lastDay.toDateString());

				var days = getDays(initialDay, lastDay);

				//alert(days.length);

				var text = "";

				/*
				for(var x = 0; x < days.length; x++)
				{
					var currentDay = days[x];

					text += currentDay.toDateString() + ", ";
				}
				*/

				var daysByDayOfWeek = arrangeDaysByDayOfWeek(days);

				for(var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++)
				{
					var currentDays = daysByDayOfWeek[dayOfWeek];

					//console.log("dayOfWeek = " + dayOfWeek + " currentDays = " + currentDays.length);

					for(var x = 0; x < currentDays.length; x++)
					{
						var currentDay = currentDays[x];
						text += currentDay.toDateString() + ", ";
					}

					text += "\n\n";
				}

				console.log(text);
			}

			function arrangeDaysByDayOfWeek(days)
			{
				var arrangedDays = new Array();

				for(var x = 0; x < days.length; x++)
				{
					var currentDay   = days[x];
					var dayOfTheWeek = currentDay.getDay();
					var currentDays  = arrangedDays[dayOfTheWeek];

					if(currentDays == null)
					{
						currentDays 			   = new Array();
						arrangedDays[dayOfTheWeek] = currentDays;
					}

					currentDays.push(currentDay);

					//console.log("currentDays = " + currentDays.length +", dayOfTheWeek = " + dayOfTheWeek);
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
		<?php //echo '<p>Hello World</p>'; ?> 
	</body>
</html>