import { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { Grid, Card, Button, Text, Container } from '@nextui-org/react';

import { ParsedUrlQuery } from 'querystring';

import confetti from 'canvas-confetti';

import pokeApi from '../../api/pokeApi';
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { Pokemon } from '../../interfaces/pokemon';
import { Layout } from '../../components/layouts';
import { localFavorites, getPokemonInfo } from '../../utils';
import Image from 'next/image';

interface Props {
  pokemon: Pokemon
}

export default function PokemonByNamePage({ pokemon }: Props) {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existPokemonInFavorites(pokemon.id))

  useEffect(() => {
    setIsInFavorites(localFavorites.existPokemonInFavorites(pokemon.id))
  }, [pokemon.id])
  

  const onToggleFavorites = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if(isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 }
    })

  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12}
          css={{'@xsMax': {flexDirection: 'column'}, '@smMax': {flexDirection: 'column'}}}
        >
          <Grid>
            <Card isHoverable css={{padding: '30px'}}>
              <Card.Body>
                <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width='100%'
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={12}>
            <Card>
              <Card.Header css={{display: 'flex', justifyContent: 'space-between', '@xsMax': {flexDirection: 'column'}}} >
                <Text h1 transform='capitalize'>{pokemon.name}</Text>

                <Button color="gradient" ghost={!isInFavorites} onPress={onToggleFavorites}>
                  {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
                </Button>
              </Card.Header>

              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction='row' display='flex' gap={0}>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>

        </Grid>
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>(`pokemon?limit=151`);

  return {
    paths: data.results.map((pokemon) => ({ params: { name: pokemon.name } })),
    fallback: 'blocking'
  }
}

interface Params extends ParsedUrlQuery {
  name: string
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({params}) => {
  
  let { name } = params as Params;

  name = name.toLowerCase();

  const pokemon = await getPokemonInfo(name);

  if(!pokemon){
    return {
      redirect:{
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400,
  }
}