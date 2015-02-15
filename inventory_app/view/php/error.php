<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>Error</title>
		<script src="utils/js/request_utils.js" 						type="text/javascript" ></script>
		<script src="utils/js/localization_manager.js" 					type="text/javascript" ></script>
		<script src="inventory_app/view/js/inventory_app_constants.js" 	type="text/javascript" ></script>
		<script type="text/javascript">
			
			function onPageLoaded()
			{
				LocManager.getInstance().loadLocalizationTable(InventoryAppConstants.ENGLISH_LOCALIZATION_TABLE, onLocalizationLoaded);
			}

			function onLocalizationLoaded(sender)
			{
				var errorPageText 	= LocManager.getInstance().getLocalizedString("error_page_text");
				var body 	   		= document.getElementById("body");
				body.innerHTML 		= errorPageText;
			}

		</script>
	</head>
	<body id="body" onload="onPageLoaded();">
	</body>
</html>