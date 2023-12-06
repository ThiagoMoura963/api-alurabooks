import NaoEncontrado from "../error/NaoEncontrado.js";

function manipulador404(req, res, next) {
//   res.status(404).json({ mensagem: "Página não encontrada" });
  const erro404 = new NaoEncontrado();
  next(erro404);
}

export default manipulador404;