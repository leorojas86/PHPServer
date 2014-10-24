<!DOCTYPE html>
<html  lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>PHP Test</title>
		<link rel="stylesheet" href="view/css/main_page.css">
		<script src="utils/js/utils.js" type="text/javascript" ></script>
		<!-- http://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage -->
		<!-- http://www.codeproject.com/Tips/630793/Context-Menu-on-Right-Click-in-Webpage -->
		<script type="text/javascript">

			onload = function() 
		    {
    			disableDefaultContextMenu();
			}

		    function ShowMenu(control, e) 
		    {
		    	alert("ShowMenu");
		    }

		</script>
	</head>
	<body>
		<?php //echo '<p>Hello World</p>'; ?> 
		<div style="overflow:scroll; width:450px; height:300px; margin-left: 300px;" >
			<div id="folder_icon" style="width:100px; height:120px; float: left;" oncontextmenu="ShowMenu('contextMenu',event);">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;" oncontextmenu="ShowMenu('contextMenu',event);">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;" oncontextmenu="ShowMenu('contextMenu',event);">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
			<div id="folder_icon" style="width:100px; height:120px; float: left;">
				<img src="view/images/Folder.png" onclick="alert('Test');" style="cursor:pointer; cursor:hand;"/>
				<label> Folder Name </label>
			</div>
		</div>
	</body>
</html>