import cloudinary from '../lib/cloudinary.js';

import { Album } from '../models/albumModel.js';
import { Song } from '../models/songModel.js';


// Una funcion que sube archivos a cloudinary 
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url
  } catch (error) {
    console.error(`Error al subir el archivo a Cloudinary: ${error}`);
    throw new Error(error);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        mensaje: 'Por favor suba todos los archivos',
      });
    } 

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    });

    await song.save()

    // Si la cancion pertence a un album, se actualuzan el album mediante un array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json({
      mensaje: 'Canción subida con exito',
    })
  } catch (error) {
    console.error(`Error al crear la canción: ${error}`);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params
    const song = await Song.findById(id)

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({
      mensaje: 'Canción eliminada correctamente'
    })
  } catch (error) {
    console.error(`Error al eliminar la canción: ${error}`);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body
    const { imageFile } = req.files

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear
    });

    await album.save();

    res.status(201).json({
      mensaje: 'Album creado con exito'
    });
  } catch (error) {
    console.error(`Error al crear el album: ${error}`);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });

    await Album.findByIdAndDelete(id);
    res.status(200).json({
      mensaje: 'Album eliminado con exito'
    });
  } catch(error) {
    console.error(`Error al eliminar el album: ${error}`);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};