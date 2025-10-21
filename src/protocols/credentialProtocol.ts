export type Credential = {
    id: number;
    userId: number;
    title: string;
    url: string;
    username: string;
    password: string;
}

export type CredentialData = Omit<Credential, "id">
