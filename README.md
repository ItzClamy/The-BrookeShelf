<H1> The BrookeShelf </H1>

<H5> Welcome to the BrookeShelf, a full-stack web application for managing and browsing a book collection with user login authentication. 
  The front-end is built using Vite, React, and TypeScript and is hosted on AWS S3 with CloudFront and Route 53. 
  The backend is powered by a MySQL database, with numerous Lambda functions connecting everything seamlessly.</H5>

<H2> Features</H2>
<li>Book shelves: Distinct tables for each user that hold their own individual books.</li>
<li>Update and Delete: Buttons for each book entry to update or delete the book in real time</li>
<li>Add Book: A button to add one or more books to the collection.</li>
<li>Search Bar: Search functionality to filter books based on different columns.</li>
<li> Random Book Selector: Lets the user choose which table or both, then select one or more genres, and it will pull a random book based on the Has_Read column (Only pulling books not read yet).</li>

<H2>Usage</H2>
<H4>Add a book</H4>
<ul>1. Click on the "Add Book" button.</ul>
<ul>2. Fill out the form with the book's title, author, genre, and read status.</ul>
<ul>3. Click "Add" to save the book.</ul>

<H4>Update or Delete a Book</H4>
<ul>1. Click which icon you want next to the record of the book.</ul>
<ul>2. If updating, modify the book details in the form.</ul>
<ul>3. Click "Update" to save changes; if deleting, just click the icon and click Confirm.</ul>

<h4>Random Book Selector</h4>
<ul>1. Click on the "Pick a Random Book" button.</ul>
<ul>2. Select one or more tables to choose from and the genre (or choose "Any Genre").</ul>
<ul>3. Click "Start Picking" to randomly select a book from the specified criteria that has not been read.</ul>
<ul><ul>i. When choosing a random book with more than one table, it will only choose a book both users own and have not read.</ul></ul>

<h2>AWS Infrastructure</h2>
<h4>This project utilizes the following AWS services:</h4>
<li>S3 Bucket: For hosting a static website.</li>
<li>CloudFront: For content delivery.</li>
<li>Route 53: For domain management.</li>
<li>Lambda Functions: For backend operations.</li>
<li>MySQL Database: For storing and retrieving book information</li>

<H2>Screenshots + demo</H2>
<h5> Please click on the link to watch the demo: https://drive.google.com/file/d/14izU-1wc7Ii0XayataSE0i5-rXDSn2uw/view?usp=sharing </h5>
<h5>Please find all screenshots in the file path: //src/screenshot+demo</h5>
