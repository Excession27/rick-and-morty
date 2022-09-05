import { CharacterType } from "./characters/types";

export type PageDataType = {
  data: { info: PageInfoType; results: CharacterType[] };
  status: number;
  statusText: string;
  headers: any;
};

type PageInfoType = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
