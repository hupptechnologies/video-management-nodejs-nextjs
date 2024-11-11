import { CreationOptional, Optional } from 'sequelize';

export interface IUsers {
    readonly id?: CreationOptional<number>
    name: string
    email: string
    password: string
    isDeleted?: boolean
    role: string
    readonly createdAt?: Date
    readonly updatedAt?: Date
}

export type TUsers = Optional<IUsers,
    'name' | 'email' | 'password' | 'id' | 'isDeleted' | 'role'>;
