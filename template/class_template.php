<?php 
	class ClassTemplate
	{
		public $variable = false;

		public function __construct($variable)
		{
			$this->variable 	= $variable;
		}

		public function TemplateMethod()
		{
			$data = array('success' 	 => $this->success, 
						  'data' 	     => $this->data, 
						  'errorMessage' => $this->errorMessage, 
						  'errorCode' 	 => $this->errorCode);

			return json_encode($data);
		}
	} 
?>


<?php 

	class ManagerTemplate
	{
		private static $_variable = null;

		public static function TemplateMethod($variable)
		{
			ManagerTemplate::$_variable = $variable;

		}
	} 
?>