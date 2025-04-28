import film from "../Model/FilmModel.js";

export const createFilm = async (req, res) =>{
    try {
        const newFilm = await film.create(req.body);
        res.status(200).send({ 
            message: "Salvo",
            Film: newFilm,
         });
      } catch (err) {
        return res.send(err);
      }
}

export const listFilm = async (req, res) => {
    const listFilms = await film.find()
    return res.send({
      message: "Filmes achados",
      films:listFilms,
    })
}

export const findFilm = async (req, res) => {
    const findFilm = await film.find({ 
      title: req.params.title
    });
    if(findFilm.length == 0){
      res.status(404).send({ 
        message: "O filme não está cadastrado",
      })
    }else{
      res.send({
        message: "Filme achados",
        films: findFilm,
      });
    }
    return
}
export const updateFilm = async (req, res) => {
    const updateFilm = await film.findOneAndUpdate(
        { title: req.params.title },
        req.body,
        { new: true }
      );
      if(!updateFilm){
        res.status(404).send({ 
          message: "O filme não está cadastrado",
        })
      }else{
        res.send({
          message: "Filme atualizado",
          films: updateFilm,
        });
      }
      
      return
}
export const deleteFilm = async (req, res) => {
    const deleteFilm = await film.findOneAndDelete(
        { title: req.params.title },
        { new: true }
      );
      if(!deleteFilm){
        res.status(404).send({ 
          message: "O filme não está cadastrado",
        })
      }else{
        res.status(200).send({ 
          message: "Filme deletado",
        });
      }
    return
}
