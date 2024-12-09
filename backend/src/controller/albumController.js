import { Album } from '../models/albumModel.js'

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json( albums );

  } catch(error) {
    console.error(`Error al obtener los Albums: ${error}`);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params
    const album = await Album.findById(albumId).populate('Song');

    if(!album) {
      return res.status(404).json({ mensaje: 'Album no encontrado' });
    };
    
    res.status(200).json(album);

  } catch(error) {
    console.error(`Error al obtener el Album: ${error}`);
    next(error);
  }
};