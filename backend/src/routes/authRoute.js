import { Router } from 'express';
import { User } from '../models/userModel.js'

const router = Router();

router.post('/callback', async(req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // *SignUp
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl
      });
    }

    res.status(200).json({
      Success: 'Se ha registrado correctamente'
    })
  } catch(error) {
    console.error(`Error en el callback de autorizacion ${error}`);
    res.status(500).json({
      Success: 'Error al registrar el usuario'
    })
  }
})

export default router;