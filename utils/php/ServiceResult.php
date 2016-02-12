<?php 
	class ServiceResult
	{
		public $success 	 = false;
		public $data		 = null;
		public $errorCode    = 0; 
		public $sessionId    = null;

		public function __construct($success, $data = null, $errorCode = 0)
		{
			$this->success 	    = $success;
			$this->data 		= $data;
			$this->errorCode    = $errorCode;
			$this->sessionId   	= SessionManager::$sessionId;
		}

		public function toJSON()
		{
			$data = array('success' 	 => $this->success,
						  'data' 	     => $this->data,
						  'errorCode' 	 => $this->errorCode,
						  'sessionId'	 => $this->sessionId);

			return json_encode($data);
		}
	} 
?>