import Express from "express";
import { readFile } from "fs/promises";
import cowsay from "cowsay";
const app = Express();
app.use(Express.json());

app.get("/api/posts", async (req, res) => {
  const posts = await readFile("./posts.json", "utf-8");
  res.send(posts);
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  let posts = await readFile("./posts.json", "utf-8");
  posts = JSON.parse(posts);
  res.send(posts.find((item) => item.id === +id));
});

app.get("/api/yeshuvim", async (req, res) => {
  const names = await readFile("./yeshuvim.json", "utf-8");
  res.send(names);
});
app.get("/api/messages", async (req, res) => {
  const messages = await readFile("./messages.json", "utf-8");
  res.send(messages);
});

app.get("/api/messages/:id", async (req, res) => {
  const { id } = req.params;
  let message = await readFile("./messages.json", "utf-8");
  message = JSON.parse(message);
  res.send(message.find((item) => item.id === +id));
});

app.listen(8000, () =>
  console.log(
    cowsay.say({
      text: "listening on port 8000",
      e: "Xx",
      T: "U",
    })
  )
);
