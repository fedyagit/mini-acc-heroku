export enum Actions {
    Get = 'Get',
    GetById = 'GetById',
    GetByType = 'GetByType',
    Insert = 'Insert',
    Update = 'Update',
    Delete = 'Delete',
}
export interface RecordInput {
    id?: string,
    name?: string,
    type?: string,
    cost?: string,
}
export type Action = {
    action: string,
}
export interface BaseApiInput extends Action, RecordInput {
}
export interface Message {
    message: string;
    id? : string;
}