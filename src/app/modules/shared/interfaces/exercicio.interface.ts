import { IExemplo } from "./exemplo.interface"

export interface IExercicio {
    id: number
    categoria: string
    nivelDificuldade: string
    descricao: string
    nomeFuncao: string
    exemplos: IExemplo[]
    notas: string,

    created_at: Date;
    titulo: string;
}