export type IdType = { id: number };

export type FindByIdRequest = IdType;

export interface DefaultParams {
	limit?: number;
	offset?: number;
	search?: string;
}
