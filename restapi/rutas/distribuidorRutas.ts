import express, { Request, Response} from 'express';
import { Distribuidor } from '../modelos/distribuidorModelo';

const router = express.Router();

router.get('/distribuidores', async (req: Request, res: Response) => {

  const distribuidores = await Distribuidor
    .find( );
  return res.status(200).send(distribuidores);
});

export { router as distribuidorRouter };
