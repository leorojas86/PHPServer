<?php 
	class ServiceResult
	{
		public $success 	 = false;
		public $data		 = null;
		public $errorMessage = "None";
		public $errorCode    = 0; 

		public function __construct($success, $data = null, $errorMessage = "None", $errorCode = 0)
		{
			$this->success 	    = $success;
			$this->data 		= $data;
			$this->errorMessage = $errorMessage;
			$this->errorCode    = $errorCode;
		}

		public function toJSON()
		{
			$data = array('success' 	 => $this->success, 
						  'data' 	     => $this->data, 
						  'errorMessage' => $this->errorMessage, 
						  'errorCode' 	 => $this->errorCode);

			return json_encode($data);
		}
	} 
?>