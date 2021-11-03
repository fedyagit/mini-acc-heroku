export enum Actions {
    Get = 'Get',
    Insert = 'Insert',
    Update = 'Update',
    Delete = 'Delete',
}
export interface RecordInput {
    id?: string,
    name: string,
    type: string,
    cost?: string,
}
export interface BaseApiInput {
    action: Actions,
    data: RecordInput,
}
export interface Message {
    message: string;
    id? : string;
}