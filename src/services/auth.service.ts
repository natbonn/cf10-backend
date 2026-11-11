import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { AuthPayload } from '../models/auth.model';
import Role from '../models/role.model'
import { IRoleDTO } from '../dto/role.dto';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES = '1h';

export const login = async(username: string, password: string) => {
    const user = await User.findOne({username})
    .populate<{ roles: IRoleDTO[] }>({ path: "roles", model: Role })
    if (!user) return null;
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const payload: AuthPayload = {
        username: user.username, 
        email: user.email, 
        roles: user.roles
    };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES});
    return {user, token};
}