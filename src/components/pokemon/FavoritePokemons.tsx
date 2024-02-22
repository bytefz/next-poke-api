import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { FavoritePokemonCard } from './FavoritePokemonCard';

interface Props{
  favoriteIdPokemons: number[]
}

export const FavoritePokemons: FC<Props> = ({favoriteIdPokemons}) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {
        favoriteIdPokemons.map((pokemonId) => (
          <FavoritePokemonCard key={pokemonId} pokemonId={pokemonId}/>
        ))
      }
    </Grid.Container>
  )
}
