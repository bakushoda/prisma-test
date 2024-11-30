const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

app.get('/', async (req, res) => {
  const posts = await prisma.posts.findMany();
  return res.json(posts);
});

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(post);
});

app.post('/', async (req, res) => {
  const { title, content } = req.body;
  const posts = await prisma.posts.create({
    data: {
      title: title,
      content: content,
    },
  });
  return res.json(posts);
});

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {content} = req.body;
  const updatedPost = await prisma.posts.update({
    where: {
      id: Number(id),
    },
    data: {
      content: content,
    },
  });
  return res.json(updatedPost);
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedPost = await prisma.posts.delete({
        where: {
            id: Number(id),
        },
    });
    return res.json(deletedPost);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
