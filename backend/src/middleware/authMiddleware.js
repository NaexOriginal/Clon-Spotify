import { clerkClient } from '@clerk/express';

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    res.status(401).json({
      mensaje: 'No autorizdo - Debe iniciar sesión'
    });

    return null
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if(!isAdmin) {
      res.status(403).json({
        mensaje: "No autorizdo - Debe ser administrador para hacer esta acción"
      });
    }

    next();
  } catch (error){
    next(error)
  }
} 