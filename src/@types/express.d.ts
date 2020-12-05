declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}

// adicionando a propriedade user dentro da interface Request
