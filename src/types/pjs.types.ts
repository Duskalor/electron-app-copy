export interface Pjs {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Array<PjsResult>;
}

export interface PjsResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export interface textArea {
  name: string;
  content: string;
}
