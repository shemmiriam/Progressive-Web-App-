const express = require("express");
const path = require("path");
const app = express();
const sqlite3=require("sqlite3");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(8000, () => console.log("Server is running on Port 8000"));
const db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
  let blogs = [
    {
      id: "1",
      title: "How To Build A RESTAPI With Javascript",
      avatar: "images/coffee2.jpg",
      intro: "iste odio beatae voluptas dolor praesentium illo facere optio nobis magni, aspernatur quas.",
    },
    {
      id: "2",
      title: "How to Build an Offline-First Application with Node.js",
      avatar: "images/coffee2.jpg",
      intro:"iste odio beatae voluptas dolor praesentium illo facere optio nobis magni, aspernatur quas.",
    },
    {
      id: "3",
      title: "Building a Trello Clone with React DnD",
      avatar: "images/coffee2.jpg",
      intro: "iste odio beatae voluptas dolor praesentium illo facere optio nobis magni, aspernatur quas.",
    },
  ];
  db.run(
    `CREATE TABLE blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title text,avatar text,intro text)`,
    (err) => {
      if (err) {
        // console.log(err)
        // Table already created
      } else {
        // Table just created, creating some rows
        var insert = "INSERT INTO blogs (title, avatar, intro) VALUES (?,?,?)";
        blogs.map((blog) => {
          db.run(insert, [
            `${blog.title}`,
            `${blog.avatar}`,
            `${blog.intro}`,
          ]);
        });
      }
    }
  );
  app.get("/blogs", (req, res) => {
    res.status(200).json({
      blogs,
    });
  });
  