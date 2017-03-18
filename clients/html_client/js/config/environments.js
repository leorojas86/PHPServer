var SELECTED_ENVIRONMENT = 'LOCAL';
var ENVIRONMENTS =
{
  CURRENT: SELECTED_ENVIRONMENT,//DO NOT TOUCH THIS LINE, THIS IS REPLACED BY THE DEPLOY PROCESS
  LOCAL:
  {
    SERVICES :
    {
         USERS  : { URL : 'http://inventory/api/' },
         GROUPS : { URL : 'http://inventory/api/' },
         TAGS   : { URL : 'http://inventory/api/' },
         FILES  : { URL : 'http://inventory/api/' }
    }
  },
  PUBLIC:
  {
    SERVICES :
    {
         USERS  : { URL : 'http://201.200.1.187/api/' },
         GROUPS : { URL : 'http://201.200.1.187/api/' },
         TAGS   : { URL : 'http://201.200.1.187/api/' },
         FILES  : { URL : 'http://201.200.1.187/api/' }
    }
  }
};
