import { Grid, Card } from '@nextui-org/react';
import { FC } from 'react';
import { useRouter } from 'next/router';

export const FavoritePokemonCard: FC<{pokemonId: number}> = ({pokemonId}) => {

  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/pokemon/${pokemonId}`);
  }

  return (
    <Grid key={pokemonId} xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onPress={handleOnClick} css={{padding: 10}}>
        <Card.Image 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          width={'100%'}
          height={100}
        />
      </Card>
    </Grid>
  )
}
