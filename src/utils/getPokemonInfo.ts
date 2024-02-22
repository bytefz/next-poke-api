import { ParsedUrlQuery } from "querystring";
import { Pokemon } from '../interfaces/pokemon';
import pokeApi from '../api/pokeApi';


interface Params extends ParsedUrlQuery {
  name: string
}

export const getPokemonInfo = async (nameOrId: string) => {


  try {
    const { data } = await pokeApi.get<Pokemon>(`pokemon/${nameOrId}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    }

  } catch (error) {
    return null;
  }

}
