const express = require("express");
const ViteExpress = require("vite-express");
const prisma = require("./prisma");
const cors = require("cors");

const app = express();
ViteExpress.config({ mode: "production" })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
})


app.post("/add-image", async (req, res) => {
  try {
    const newImage = await prisma.image.create({
      data: req.body,
    });
    res.status(200).json(newImage);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
})

app.get("/images", async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).json(images);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.delete("/images/:id", async (req, res) => {
  try {
    const deletedImage = await prisma.image.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedImage);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
