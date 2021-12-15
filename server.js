import Express from "express";
import { readFile } from "fs/promises";

const app = Express();

app.get("/posts", async (req, res) => {
  const posts = await readFile("./posts.json", "utf-8");
  res.send(posts);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  let posts = await readFile("./posts.json", "utf-8");
  posts = JSON.parse(posts);
  res.send(posts.find((item) => item.id === +id));
});
app.listen(8000, () => console.log("Server ready on port 8000"));
