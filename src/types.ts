export interface Topic {
    id: string, 
    title: string,
    description: string,
    questions?: Question[],
}

export interface Question {
    id: string,
    content: string,
    topics?: Topic[]
    correctChoiceId: string,
    choices: Choice[],
}

interface Choice {
    id: string,
    content: string,
}

export interface Record {
    id: string,
    topic: Topic,
    answers: Answer[],
    userId: string, 
    score: number,
    createdDate: string,
}

export interface Answer { 
    questionId: string,
    choiceId: string,
}

export interface User {
    id: string,
    email: string,
    roles: string[],
    records: Record[],
}