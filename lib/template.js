const _ = require('lodash')

const renderHeader = data => `
  <header>
    <div class="navbar navbar-dark bg-dark box-shadow">
      <div class="container d-flex justify-content-between">
        <a href="/" class="navbar-brand d-flex align-items-center">
          <strong>${data.city}, ${data.state}</strong>
        </a>
      </div>
    </div>
  </header>
`

const renderFooter = data => `
  <footer class="text-muted">
    <div class="container py-2">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>This site was built with <a href="https://github.com/imkmf/citytwitter">citytwitter</a>, a tool for visualizing social media accounts of United States cities.</p>
      ${(data.meta) ? `<p>Something out of date? <a href="${data.meta.contact_url}">Contact the maintainer</a>.</p>` : ''}
    </div>
  </footer>
`

const renderCard = account => `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <a href="https://twitter.com/<%= account.handle %>">
        <img class='card-img-top' src="https://avatars.io/twitter/${account.handle}" />
      </a>
      <div class="card-body">
        <h4 class='card-title'><a href="https://twitter.com/${account.handle}">${account.name || account.handle}</a></h3>
        ${account.notes ? `<p class="card-text">${account.notes}</p>` : ``}
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">@${account.handle}</small>
        </div>
      </div>
    </div>
  </div>
`

const template = data => `
<!doctype html>
<html lang="en">
  <head>
    <title>${data.city} Twitter Accounts</title>
    <meta name="description" content="Twitter accounts for ${data.city}, ${data.state}. Powered by citytwitter.">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    ${renderHeader(data)}

    <main role="main">
      <div class="album py-2 bg-light">
        <div class="container">
          ${data.sections ? data.sections.map(section => `
            <div class="row px-4 py-2">
              <h3><a class='link black dim' href="#${section.permalink}">${section.name}</a></h3>
            </div>
            <div class="row">
              ${section.accounts ? section.accounts.map(account => renderCard(account)).join('') : ''}
            </div>
            ${section.subsections ? section.subsections.map(subsection => `
              <div class="row px-4 py-2">
                <h4><a class='link black dim' href="#${subsection.permalink}">${subsection.name}</a></h4>
              </div>
              <div class="row">
                ${_.compact(subsection.accounts).map(account => renderCard(account)).join('')}
              </div>
            `).join('') : ''}
          `).join('') : ''}
        </div>
      </div>
    </main>

    ${renderFooter(data)}
  </body>
</html>
`

module.exports = template
