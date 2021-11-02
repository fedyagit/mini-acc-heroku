export enum Actions {
    Get = 'Get',
    Insert = 'Insert',
    Update = 'Update',
    Delete = 'Delete',
}
export interface RecordInput {
    name: string,
    type: string,
    cost: string,
}
export interface RecordOutput extends RecordInput {
    id: number,
}
export interface BaseApiInput {
    action: Actions,
    data: RecordInput,
}
export interface Message {
    message: string;
}