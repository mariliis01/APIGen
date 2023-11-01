import { PrismaClient } from "@prisma/client";
import express, { request, response } from "express";

const app = express();
const prisma = new PrismaClient();

app.get("/", (request, response) => {
  response.send("Welcome");
});

app.get("/books", async (request, response) => {
  //const sql = "SELECT * FROM books";
  //books.getAll();
  try {
    const books = await prisma.books.findMany();
    response.status(200).json(books);
  } catch (error) {
    console.log(error);
    response.status(400).send({
      message: "Midagi läks valesti.Proovi uuesti.",
    });
  }
});


app.get('/books/:id', async (request, response) => {
    //const id = request.params.id;
    try {

   
    const { id } = request.params;

    const book = await prisma.books.findUnique({
        where: {
            id: Number(id), 
        },
  });

    if (!book)

    throw new Error("Raamatut ei leitud");

    response.status(200).json(book);
    }catch (error) {
    console.log(error);
    response.status(400).send({
      message: error.message,

    });

}});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
