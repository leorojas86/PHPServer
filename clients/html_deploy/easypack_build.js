var sb = require('easypack');
sb.build({
  	webRoot : '../html_client',
    inputHtml : "index.html",
    outputHtml : "deploy/index.html",
    jsBuildName : "deploy/app.js"
});
