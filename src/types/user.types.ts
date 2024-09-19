import User from "../entities/User.entity";

export type TUserCreation = Omit<User, "id">