import { connection } from "../database/connection.mjs";

export const createUser = async (userDetails) => {
    const user = await connection.user.create({
        data: userDetails
    });
    return user;
}

export const getAllUsers = async () => {
    const users = await connection.user.findMany();
    return users;
}

export const getUserById = async (id) => {
    const user = await connection.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    return user;
}

export const getUserByEmail = async (email) => {
    const user = await connection.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

export const updateUser = async (id, userDetails) => {
    const user = await connection.user.update({
        where: {
            id: parseInt(id)
        },
        data: userDetails
    });
    return user;
}