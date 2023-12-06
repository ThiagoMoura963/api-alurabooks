import "dotenv/config";
//import http from "http";
import app from "./src/app.js";

const PORT = 3000;

// const rotas = {
//     "/": "Curso de NodeJS",
//     "/livros": "Entrei na rota livros",
// };

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end(rotas[req.url]);
// });

app.listen(PORT, () => {
  console.log("servidor ouvindo a porta 3000");
});