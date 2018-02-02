"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<h1><%= city %>, <%= state %></h1>\n\n<%_ sections.forEach(section => { _%>\n<h2><a href=\"#<%= section.permalink %>\"><%= section.name %></a></h2>\n  <%_ section.accounts.forEach(account => { _%>\n  <h3><a href=\"https://twitter.com/<%= account.handle %>\"><%= account.name || account.handle %></a></h3>\n  <%_ }) _%>\n  <%_ if (section.subsections) { _%>\n  <p>Subsections not implemented yet!</p>\n  <%_ } _%>\n<%_ }) _%>\n";
exports.default = template;
//# sourceMappingURL=template.js.map