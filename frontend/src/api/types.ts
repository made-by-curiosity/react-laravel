export interface IAuthResponse {
    token: string;
}

export interface IRegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IPostModel {
    id: number,
    user_id: number,
    title: string,
    content: string,
    created_at: string,
    updated_at: string,
}

export interface IPostsResponse {
    posts: IPostModel[]
}

export interface IPostResponse {
    post: IPostModel
}