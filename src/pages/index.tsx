import { GetStaticProps } from 'next'

import {Grid, Card, Row, Text} from '@nextui-org/react'

import { Layout } from '../components/layouts'
import { pokeApi } from '../api'
import { Pokemon, PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon/PokemonCard';


interface Props {
  pokemons: SmallPokemon[]
}

export default function HomePage({ pokemons }: Props) {

  return (
    <>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
      </Grid.Container>
    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons = data.results.map(async (pokemon) => {

    const { data: pokemonRes } = await pokeApi.get<Pokemon>(`pokemon/${pokemon.name}`)

    pokemon.img = pokemonRes.sprites.other?.dream_world.front_default || pokemonRes.sprites.front_default;
    pokemon.id = pokemonRes.id;

    return pokemon;
  });

  const pokemonsResolved = await Promise.all(pokemons)

  return {
    props: {
      pokemons: JSON.parse(JSON.stringify(pokemonsResolved))
    }
  }
}

HomePage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout title='Home'>
      {page}
    </Layout>
  )
}