import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { validateEmail } from '../middlewares/validateEmail.middleware';

const router = Router();

router.get('/', userCtrl.getAll);
router.get('/email/:email',validateEmail(), userCtrl.getOneByEmail)
router.post('/', validate(createUserSchema), userCtrl.create);
router.put('/:username', validate(updateUserSchema), userCtrl.update);
router.delete('/:username', userCtrl.remove);
export default router;