const template = `
<h1><%= city %>, <%= state %></h1>

<% sections.forEach(section => { %>
  <h2><a href="#<%= section.permalink%>"><%= section.name %></a></h2>
  <% section.accounts.forEach(account => { %>
    <h3><a href="https://twitter.com/<%= account.handle %>"><%= account.name || account.handle %></a></h3>
  <% }) %>
  <% if (section.subsections) { %>
    <p>Subsections not implemented yet!</p>
  <% } %>
<% }) %>
`

export default template
