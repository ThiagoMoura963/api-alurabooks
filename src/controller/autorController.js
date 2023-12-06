import NaoEncontrado from "../error/NaoEncontrado.js";
import { autor } from "../models/Autor.js";

class AutorController {
    
  static listarAutores = async(_, res, next) => {
    try {
      const listarAutores = await autor.find();
      res.status(200).json(listarAutores);    
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async(req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if(autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do autor(a) não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async(req, res, next) => {
    try {
      const novoAutor = await autor.create(req.body);
      
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async(req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if(autorEncontrado !== null) {
        res.status(200).json({ message: "autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do autor(a) não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async(req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if(autorEncontrado !== null) {
        res.status(200).json({ message: "autor deletado com sucesso" });

      } else {
        next(new NaoEncontrado("Id do autor(a) não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;