<?php 

	class Profiler
	{
		public $userId 			 = null;
		public $name 			 = false;
		public $profileStartTime = null;

		public function __construct($useId, $name)
		{
			$this->useId 			= $useId;
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