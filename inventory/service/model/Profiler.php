<?php 

	class Profiler
	{
		public $name 			 = false;
		public $profileStartTime = null;

		public function __construct($name)
		{
			$this->name 			= $name;
			$this->profileStartTime = $this->GetCurrentMiliseconds();
		}

		public function Finish()
		{
			$currentMilliseconds 	= $this->GetCurrentMiliseconds();
			$profileDuration 		= $currentMilliseconds - $this->profileStartTime;

			error_log("Profile '$this->name', duration = '$profileDuration'");

			return $profileDuration;
		}

		public function GetCurrentMiliseconds()
		{
			$currentMilliseconds = round(microtime(true) * 1000);
			return $currentMilliseconds;
		}
	}
?>