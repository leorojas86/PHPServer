<?php 

	class Profiler
	{
		public $name 			 = false;
		public $profileStartTime = null;

		public function __construct($name)
		{
			$this->name 			= $name;
			$this->profileStartTime = microtime(true);

			//usleep(2000000);// Sleep for a while
		}

		public function Profile()
		{
			$currentMilliseconds 	= microtime(true);
			$profileDuration 		= $currentMilliseconds - $this->profileStartTime;

			//Profileerror_log("Profile '$this->name', duration = '$profileDuration', startTime = '$this->profileStartTime', endTime = '$currentMilliseconds'");

			return $profileDuration;
		}
	}
?>