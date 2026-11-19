import { TestServer } from "./testSetup";
import userRoutes from '../routes/user.routes';
import { findLastInsertedUser } from "../dao/user.dao";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

const server = new TestServer();
server.app.use('/users', userRoutes);

describe("User API Tests GET", () => {

    let token: string

    beforeAll(async () => {
        await server.start();
        // const hash = await bcrypt.hash("admin123", 10);
        // const user = await User.create({
        //     username: 'admin',
        //     password: hash,
        //     email: "admin@aueb.gr",
        //     roles: []
        // });
        // token = jwt.sign(
        //     {
        //         username: user.username,
        //         email: user.email
        //     },
        //     JWT_SECRET,
        //     { expiresIn: '1h' }
        // );
    });

    afterAll(async () => { await server.stop() });

    test('GET /users -> returns a list of users', async () => {
        const res = await server.request.get("/users");
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000);

    test('GET /users -> return a status code in wrong endpoint', async() => {
        const res = await server.request.get("/user");
        expect(res.status).toBe(404);
    });

    test("GET /users/email/:email -> Returns a user with wrong email", async () => {
        const lastUser = await findLastInsertedUser();
        const res = await server.request.get("/users/email/" + lastUser?.email);
        // console.log(res.bonpndy);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe(lastUser?.username);
    })

    test("GET /users/email/:email -> Returns a user with wrong email", async() => {
        const res = await server.request.get("/users/email/" + 'lalakis@aueb.gr');
        // console.log(res.bonpndy);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("User not found by email");
    })
});

describe("USER API TEST POST REQUESTS", ()=> {
    beforeAll(async () => { await server.start();  });

    afterAll(async () => { await server.stop() });
})