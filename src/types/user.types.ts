export type TUser = {
    id: string;
    email: string;
    fullname: string;
    password: string;
}

export type TUserCreation = Omit<TUser, "id">