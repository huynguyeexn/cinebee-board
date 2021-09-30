import { IBase, Movie } from '.';

export interface Genre extends IBase {
	name: string;
	slug: string;
	movies: Movie[];
}
