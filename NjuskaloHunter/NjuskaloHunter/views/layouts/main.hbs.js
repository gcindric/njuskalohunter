﻿var main = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "﻿<!DOCTYPE html>\r\n\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n    <meta charset=\"utf-8\" />\r\n    <title>Njuškalo Hunter</title>\r\n    <script src=\"https://code.jquery.com/jquery-2.1.3.min.js\"></script>\r\n    <link href=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css\" rel=\"stylesheet\" />\r\n    <script src=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js\"></script>\r\n    <link href=\"../../styles/styles.css\" rel=\"stylesheet\" />\r\n</head>\r\n<body>\r\n    <div class=\"container\">\r\n        ";
  stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n        <div class=\"row well\">\r\n            <div class=\"col-md-12 column\">\r\n                <span class=\"author-info\">Application created by: Gordon Cindrić</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html> ";
},"useData":true});