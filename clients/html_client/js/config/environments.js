var ENVIRONMENTS =
{
  SELECTED_ENVIRONMENT: 'LOCAL',
  LOCAL:
  {
    SERVICES :
    {
         USERS  : { URL : 'http://inventory/api/' },
         GROUPS : { URL : 'http://inventory/api/' },
         TAGS   : { URL : 'http://inventory/api/' },
         FILES  :
         {
           URL : 'http://inventory/api/',
           UPLOADS_FOLDER : 'http://inventory/uploads/'
         }
    }
  },
  PUBLIC:
  {
    SERVICES :
    {
         USERS  : { URL : 'http://201.200.1.187/api/' },
         GROUPS : { URL : 'http://201.200.1.187/api/' },
         TAGS   : { URL : 'http://201.200.1.187/api/' },
         FILES  :
         {
           URL : 'http://201.200.1.187/api/',
           UPLOADS_FOLDER : 'http://201.200.1.187/uploads/'
         }
    }
  }
};
