import User from "../entities/User.entity";

export type TUserCreation = Required<Omit<User, "id">>