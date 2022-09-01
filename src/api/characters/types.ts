export type CharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: [];
  url: string;
  created: string;
};

export enum CharacterStatus {
  any = "",
  alive = "alive",
  dead = "dead",
  unknown = "unknown",
}
