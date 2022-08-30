import axios from "api/axiosInstance";
import { APICall, CharacterType } from "./types";

export const getAllCharacters = (): APICall<CharacterType[]> =>
  axios.get(`/character`);

export const getSingleCharacterByID = (id: string): APICall<CharacterType[]> =>
  axios.get(`/character/${id}`);

export const getCharactersByStatus = (
  status: string
): APICall<CharacterType[]> => axios.get(`/character/?status=${status}`);

export const getCharactersByName = (name: string): APICall<CharacterType[]> =>
  axios.get(`/character/?name=${name}`);

export const getCharactersByQuery = (
  name: string,
  status: string
): APICall<CharacterType[]> =>
  axios.get(`/character/?name=${name}&status=${status}`);
