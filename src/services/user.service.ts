// import User, {IUser} from '../models/user.model';
// Προσθήκη για ρόλο schema
import Role, {IRole} from '../models/role.model';
import { Types } from 'mongoose';
import * as userDao from '../dao/user.dao';
import { CreateUserDTO } from '../dto/user.dto';
import { IUser } from '../models/user.model';


// export const findUsers = async():Promise<IUser[]> => {
export const findUsers = async() => {
    // Populate for role
    // const users = await User.find().populate({ path: "roles", model: Role}).lean().exec();
    const users = await userDao.findAll();
    console.log(">>>>>>>", users)
    return users;
}

export const findUserByEmail = async(email:string) => {
    const user = await userDao.findByEmail(email);
    if (user) {
        return user;
    }
}

export const createUser = async(payload:Partial<CreateUserDTO>) => {

    let roleIds: Types.ObjectId[] = [];
    if (payload.roles && payload.roles.length > 0) {
        roleIds = payload.roles.map(id => new Types.ObjectId(id));
    } else {
        let reader: IRole | null = await Role.findOne({'role': 'READER'});
        if (!reader) {
            reader = await Role.create({role: 'READER', description: "Default Role", active: true})
        }
        roleIds = [reader._id];
    }

    const user = await userDao.createUser({
        ...payload,
        roles: roleIds
    });

    if (user) {
        return user;
    }
};