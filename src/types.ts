export type childrenType = {
  children?: React.ReactNode;
};

export type MovieObject = {
  adult?: boolean;
  backdrop_path?: string;
  id: number;
  title: string;
  original_language: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: string;
  genre_ids?: [];
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
