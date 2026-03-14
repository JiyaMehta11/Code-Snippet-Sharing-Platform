# Code-Snippet-Sharing-Platform

 npm install express sequelize mysql2 bcryptjs jsonwebtoken dotenv cors 
 npm install --save-dev nodemon
 npx nodemon index.js  

 in mysql - CREATE DATABASE snippet_db;

 .env- 
DB_NAME=snippet_db
DB_USER=root
DB_PASSWORD=passwordofyourdb
DB_HOST=localhost
JWT_SECRET=mysupersecretkey123
PORT=5000


<h1>API Endpoints</h1>

<h2>1. Authentication & User Stats</h2>

<table>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
<th>Input (JSON Body)</th>
<th>Auth</th>
</tr>

<tr>
<td>Register</td>
<td>POST</td>
<td>/api/auth/register</td>
<td>{"username": "...", "email": "...", "password": "..."}</td>
<td>No</td>
</tr>

<tr>
<td>Login</td>
<td>POST</td>
<td>/api/auth/login</td>
<td>{"email": "...", "password": "..."}</td>
<td>No</td>
</tr>

<tr>
<td>User Stats</td>
<td>GET</td>
<td>/api/auth/stats</td>
<td>None (Returns users + snippet counts)</td>
<td>[Auth]</td>
</tr>

</table>

<h2>2. Snippet Management (CRUD)</h2>

<table>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
<th>Input (JSON Body)</th>
<th>Auth</th>
</tr>

<tr>
<td>Create Snippet</td>
<td>POST</td>
<td>/api/snippets</td>
<td>{"title": "...", "code": "...", "language": "...", "isPrivate": false}</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Public Feed</td>
<td>GET</td>
<td>/api/snippets/public</td>
<td>None (View all public code)</td>
<td>No</td>
</tr>

<tr>
<td>My Private List</td>
<td>GET</td>
<td>/api/snippets/my-private</td>
<td>None (View only your hidden code)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>View One</td>
<td>GET</td>
<td>/api/snippets/:id</td>
<td>URL Param: :id (ID of snippet)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Update Snippet</td>
<td>PUT</td>
<td>/api/snippets/:id</td>
<td>{"title": "...", "code": "..."}</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Delete Snippet</td>
<td>DELETE</td>
<td>/api/snippets/:id</td>
<td>URL Param: :id (Deletes snippet + comments)</td>
<td>[Auth]</td>
</tr>

</table>

<h2>3. Forking Snippets</h2>

<table>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
<th>Input</th>
<th>Auth</th>
</tr>

<tr>
<td>Fork Snippet</td>
<td>POST</td>
<td>/api/fork/:id</td>
<td>URL Param: :id (Snippet you want to copy)</td>
<td>[Auth]</td>
</tr>

</table>

<p><b>Note:</b> You can update or delete your forked snippet using the standard Snippet CRUD URLs above.</p>

<h2>4. Comment System</h2>

<table>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
<th>Input (JSON Body / Param)</th>
<th>Auth</th>
</tr>

<tr>
<td>Add Comment</td>
<td>POST</td>
<td>/api/comments/:id</td>
<td>{"content": "..."} (:id is Snippet ID)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>View Snippet Comments</td>
<td>GET</td>
<td>/api/comments/snippet/:id</td>
<td>URL Param: :id (Snippet ID)</td>
<td>No</td>
</tr>

<tr>
<td>My Activity</td>
<td>GET</td>
<td>/api/comments/made-by-me</td>
<td>None (All comments you wrote)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Notifications</td>
<td>GET</td>
<td>/api/comments/on-my-code</td>
<td>None (Comments on your snippets)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Global View</td>
<td>GET</td>
<td>/api/comments/all</td>
<td>None (Every comment on platform)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Update Comment</td>
<td>PUT</td>
<td>/api/comments/:id</td>
<td>{"content": "..."} (:id is Comment ID)</td>
<td>[Auth]</td>
</tr>

<tr>
<td>Delete Comment</td>
<td>DELETE</td>
<td>/api/comments/:id</td>
<td>URL Param: :id (Comment ID)</td>
<td>[Auth]</td>
</tr>

</table>

<h2>Input Examples for Postman</h2>

<h3>Create Snippet (POST /api/snippets)</h3>

<pre><code>{
  "title": "Reverse Array in JS",
  "code": "const rev = arr => [...arr].reverse();",
  "language": "javascript",
  "isPrivate": false
}
</code></pre>

<h3>Update Snippet (PUT /api/snippets/1)</h3>

<pre><code>{
  "title": "Optimized Reverse Array",
  "code": "const rev = arr => arr.reverse();"
}
</code></pre>

<h3>Add Comment (POST /api/comments/1)</h3>

<pre><code>{
  "content": "This is a great helper function, thanks for sharing!"
}
</code></pre>
