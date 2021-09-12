interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<R = Record<string, unknown>[]> {
  info?: Info;
  results?: R[];
  error?: string;
}

export interface EpisodeType {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
