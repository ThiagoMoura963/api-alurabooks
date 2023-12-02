import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from './routes/index.js';

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.log("erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("conexão com o banco feita com sucesso!");
});

const app = express();
routes(app);
// app.use(express.json());

// const livros = [
//     {
//         id: 1,
//         titulo: "Harry Potter",
//     },
//     {
//         id: 2,
//         titulo: "1984"
//     }
// ];

// function buscaLivros(id) {
//     return livros.findIndex(livro => {
//         return livro.id === Number(id);
//     });
// }

// app.get("/", (_, res) => {
//     res.status(200).send("Curso de NodeJS");
// });

// app.get("/livros", async(_, res) => {
//     const listaLivros = await Livro.find({});
//     res.status(200).json(listaLivros);
// });

// app.get("/livros/:id", (req, res) => {
//     const index = buscaLivros(req.params.id);
//     res.status(200).json(livros[index]);
// });

// app.post("/livros", (req, res) => {
//     livros.push(req.body);
//     res.status(201).send("livro cadastrado com sucesso!");
// });  

// app.put("/livros/:id", (req, res) => {
//     const index = buscaLivros(req.params.id);

//     livros[index].titulo = req.body.titulo;
//     res.status(200).json(livros);
// });

// app.delete("/livros/:id", (req, res) => {
//     const index = buscaLivros(req.params.id);
//     livros.splice(index, 1);

//     res.status(200).send("livro deletado com sucesso!");
// })

export default app;