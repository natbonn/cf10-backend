import { IRoleDTO } from "../dto/role.dto";

export interface AuthPayload {
    username: string;
    email: string;
    roles: IRoleDTO[];
}