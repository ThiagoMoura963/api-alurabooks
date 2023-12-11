import { autor, livro } from "../models/index.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

class LivroController {
    
  static listarLivros = async(req, res, next) => {
    try {
      const buscaLivro = livro.find();

      req.resultado = buscaLivro;

      next();
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = processaBusca(req.query);

      if(busca !== null) {
        const livroPorFiltro = livro.find(busca);

        req.resultado = livroPorFiltro;
        
        next();
      } else {
        res.status(200).json([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(params) {
  const { titulo, editora, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};
  // const regex = new RegExp(titulo, "i");

  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if(editora) busca.editora = { $regex: editora, $options: "i" };

  if(minPaginas || maxPaginas) busca.paginas = {};

  if(minPaginas) busca.paginas.$gte = minPaginas;
  if(maxPaginas) busca.paginas.$lte = maxPaginas;

  if(nomeAutor) {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor });

    if(autorEncontrado !== null) {
      busca["autor._id"] = autorEncontrado._id; 
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;