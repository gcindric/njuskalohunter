var oglasi = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <tr>\r\n                    <td class=\"numeracija\">"
    + escapeExpression(((helper = (helper = helpers.rednibroj || (depth0 != null ? depth0.rednibroj : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rednibroj","hash":{},"data":data}) : helper)))
    + "</td>\r\n                    <td><img src=\""
    + escapeExpression(((helper = (helper = helpers.slika || (depth0 != null ? depth0.slika : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slika","hash":{},"data":data}) : helper)))
    + "\" /></td>\r\n                    <td><strong><a class=\"stan-title-link\" href=\"http://www.njuskalo.hr/"
    + escapeExpression(((helper = (helper = helpers.detaljiurl || (depth0 != null ? depth0.detaljiurl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"detaljiurl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.naziv || (depth0 != null ? depth0.naziv : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"naziv","hash":{},"data":data}) : helper)))
    + "</a></strong></td>\r\n                    <td class=\"cijena\">"
    + escapeExpression(((helper = (helper = helpers.cijena || (depth0 != null ? depth0.cijena : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cijena","hash":{},"data":data}) : helper)))
    + "</td>\r\n                </tr>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "﻿<div class=\"row well\">\r\n    <div class=\"col-md-12 column\">\r\n        <h1>Stranica s oglasima</h1>\r\n    </div>\r\n</div>\r\n<div class=\"row well\">\r\n    <div class=\"table-responsive\">\r\n        <table class=\"table table-striped njuskalo-hunter-table\">\r\n            <thead>\r\n                <tr>\r\n                    <th>#</th>\r\n                    <th>Slika</th>\r\n                    <th>Naziv</th>\r\n                    <th>Cijena</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.oglasi : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n";
},"useData":true});