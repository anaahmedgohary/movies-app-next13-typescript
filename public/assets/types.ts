export type childrenType = {
  children?: React.ReactNode;
};

//////////// movie types
export type MovieObjectold = {
  adult?: boolean;
  backdrop_path?: string;
  id: number;
  title: string;
  original_language: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  tagline?: string;
  genres: {
    id: number;
    name: string;
  }[];
  runtime?: number;
  homepage?: string;
  imdb_id?: string;
  budget?: number;
};

export interface MovieObject {
  media_type: string;
  genre_ids?: number[];
  //////////////////////
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/////////// tv series types
export type TvSeriesObjectold = {
  adult?: boolean;
  backdrop_path?: string;
  id: number;
  name: string;
  original_language: string;
  origin_country: string[];
  original_name?: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genre_ids?: number[];
  popularity: number;
  first_air_date?: string;
  last_air_date?: string;
  number_of_seasons: number;
  number_of_episodes: number;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  tagline?: string;
  genres: {
    id: number;
    name: string;
  }[];
  runtime?: number;
  homepage?: string;
  imdb_id?: string;
  budget?: number;
};

export interface TvSeriesObject {
  runtime?: number;
  budget?: number;
  video?: boolean;
  media_type: string;
  genre_ids?: number[];
  ///////////////
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: any[];
  first_air_date: string;
  genres: Genre[];
  imdb_id?: string;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  networks: Network[];
  next_episode_to_air: { [key: string]: any };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
