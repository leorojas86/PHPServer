<?php 

	class Profiler
	{
		public $name 			 = false;
		public $profileStartTime = null;

		public function __construct($name)
		{
			$this->name 			= $name;
			$this->profileStartTime = $this->GetCurrentMiliseconds();

			// Sleep for a while
			usleep(200000);
		}

		public function Finish()
		{
			$currentMilliseconds 	= $this->GetCurrentMiliseconds();
			$profileDuration 		= $currentMilliseconds - $this->profileStartTime;

			error_log("Profile '$this->name', duration = '$profileDuration', startTime = '$this->profileStartTime', endTime = '$currentMilliseconds'");

			return $profileDuration;
		}

		public function GetCurrentMiliseconds()
		{
			$currentMilliseconds = microtime(true) / 100000;
			return $currentMilliseconds;

			/*$microtime = microtime();
  $comps = explode(' ', $microtime);

  // Note: Using a string here to prevent loss of precision
  // in case of "overflow" (PHP converts it to a double)
  return sprintf('%d%03d', $comps[1], $comps[0] * 1000);*/

    /*list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);*/
		}
	}
?>