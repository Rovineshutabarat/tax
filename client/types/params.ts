export type Params<T> = {
    page?: number;
    size?: number;
    keyword? : string
    body?: T;
};