import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema } from '../validators/user.validator';

const router = Router();

router.get('/', userCtrl.getAll);
router.get('/email/:email', userCtrl.getOneByEmail)
router.post('/', validate(createUserSchema), userCtrl.create);
router.post('/', userCtrl.create);
router.put('/:username', userCtrl.update);
router.delete('/:username', userCtrl.remove);
export default router;