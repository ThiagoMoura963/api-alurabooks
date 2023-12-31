import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
// import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O titulo do livro é obrigatório"]
  },
  editora: { 
    type: String, 
    required: [true, "A editora é obrigatória"],
    // enum: {
    //   values: ["Rocco, Folha"],
    //   message: "A editora {VALUE} não é um valor permitido"
    // }
  },
  preco: { type: Number },
  paginas: { 
    type: Number,
    min: [10, "O número de páginas deve ser entre 10 e 5000. O valor fornecido: {VALUE}"],
    max: [5000, "O número de páginas deve ser entre 10 e 5000. O valor fornecido: {VALUE}"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatório"],
    autopopulate: true
  },

}, { versionKey: false });

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema);

export default livro;