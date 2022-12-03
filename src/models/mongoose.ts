export interface IUpdateOne {
    modifiedCount: number;
    acknowledged: boolean;
}

export interface IDeleteOne {
    n: number;
    deletedCount: number;
    ok: number;
}

export interface ISave {
    err: Error
}