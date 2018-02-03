var renderCard = function (account) { return "\n  <div class=\"col-md-4\">\n    <div class=\"card mb-4 box-shadow\">\n      <a href=\"https://twitter.com/<%= account.handle %>\">\n        <img class='card-img-top' src=\"https://avatars.io/twitter/" + account.handle + "\" />\n      </a>\n      <div class=\"card-body\">\n        <h4 class='card-title'><a href=\"https://twitter.com/" + account.handle + "\">" + (account.name || account.handle) + "</a></h3>\n        <p class=\"card-text\"><%= account.notes %></p>\n        <div class=\"d-flex justify-content-between align-items-center\">\n          <small class=\"text-muted\">@" + account.handle + "</small>\n        </div>\n      </div>\n    </div>\n  </div>\n"; };
var template = function (data) { return "\n<!doctype html>\n<html lang=\"en\">\n  <head>\n    <title>" + data.city + " Twitter Accounts</title>\n    <meta name=\"description\" content=\"Twitter accounts for " + data.city + ", " + data.state + ". Powered by citytwitter.\">\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\n  </head>\n  <body>\n    <header>\n      <div class=\"navbar navbar-dark bg-dark box-shadow\">\n        <div class=\"container d-flex justify-content-between\">\n          <a href=\"/\" class=\"navbar-brand d-flex align-items-center\">\n            <strong>" + data.city + ", " + data.state + "</strong>\n          </a>\n        </div>\n      </div>\n    </header>\n\n    <main role=\"main\">\n      <div class=\"album py-2 bg-light\">\n        <div class=\"container\">\n          " + data.sections.map(function (section) { return "\n            <div class=\"row px-4 py-2\">\n              <h3><a class='link black dim' href=\"#" + section.permalink + "\">" + section.name + "</a></h3>\n            </div>\n            <div class=\"row\">\n              " + section.accounts.map(function (account) { return renderCard(account); }) + "\n            </div>\n            " + section.subsections.map(function (subsection) {
    <div class="row px-4 py-2">
                <h4><a class='link black dim' href="#${subsection.permalink}">${subsection.name}</a></h4>
              </div>
        ,
            <div class="row">
                ${subsection.accounts.map(function (account) { return renderCard(account); })}
              </div>;
}) + "\n          "; }) + "\n        </div>\n      </div>\n    </main>\n\n    <footer class=\"text-muted\">\n      <div class=\"container py-2\">\n        <p class=\"float-right\">\n          <a href=\"#\">Back to top</a>\n        </p>\n        <p>This site was built with <a href=\"https://github.com/imkmf/citytwitter\">citytwitter</a>, a tool for visualizing social media accounts of United States cities.</p>\n        " + ; };
if (data.meta) {
    <p>Something out of date? <a href="<%= meta.contact_url %>">Contact the maintainer</a>.</p>;
}
div >
;
footer >
;
body >
;
html >
    "\n\nexport default template\n";
//# sourceMappingURL=template.js.map