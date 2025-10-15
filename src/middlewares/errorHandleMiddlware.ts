import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('🚨 Erro:', err);

    if(err.type === 'No Content'){
        return res.status(204).send(err.message || "Requisição inválida");
    }

    if(err.type === 'Bad Request'){
        return res.status(400).send(err.message || "Requisição inválida");
    }

    if(err.type === 'Unauthorized'){
        return res.status(401).send(err.message || "Não autorizado");
    }

    if(err.type === 'Not Found'){
        return res.status(404).send(err.message || "Não encontrado");
    }

    if(err.type === 'Conflict'){
        return res.status(409).send(err.message || "Conflito");
    }

    if(err.type === 'Unprocessable Entity'){
        return res.status(422).send(err.message || "Erro de validação");
    }

    if(err.type === 'Internal Server Error'){
        return res.status(500).send(err.message || "Erro interno");
    }
}