import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

class LivroController {
    
  static listarLivros = async(_, res, next) => {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);    
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async(req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      
      if(livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async(req, res, next) => {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);

      if(autorEncontrado !== null) {
        const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
      } else {
        next(new NaoEncontrado("Id do autor(a) não localizado."));
      }
      
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async(req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);

      if(livroEncontrado !== null) {
        res.status(200).json({ message: "livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async(req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);

      if(livroEncontrado !== null) {
        res.status(200).json({ message: "livro deletado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorEditor = async(req, res, next) => {
    const editora = req.query.editora;
    try {
      const livroPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livroPorEditora);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;