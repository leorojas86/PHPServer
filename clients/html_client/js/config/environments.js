var ENVIRONMENTS =
{
  CURRENT: 'LOCAL',
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
