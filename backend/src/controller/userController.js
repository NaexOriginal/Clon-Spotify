import { User } from '../models/userModel.js';

export const getAllUsers = async(req, res, next) => {
  try {
    const currentUserId = req.auth.userId

    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.status(200).json( users );

  } catch(error){
    console.error(`No se pudo obtener todos los usuarios: ${error}`)
    next(error);
  }
};