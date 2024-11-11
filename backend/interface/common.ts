import { Optional } from 'sequelize';

export interface IQuery {
	search: string,
	limit: number,
	offset: number
}

export type TQuery = Optional<IQuery, 'search' | 'limit' | 'offset' >;
