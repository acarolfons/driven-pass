export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}

export type UserData = Omit<User, "id">

export type UserInput = UserData & {
    confirmPassword: string
}

export type UserLogin = {
    email: string;
    password: string
}