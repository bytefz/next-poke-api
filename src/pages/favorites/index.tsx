import { useState, useEffect } from 'react';


import { Layout } from '../../components/layouts/Layout';
import { NoFavorites } from '../../components/ui';
import { FavoritePokemons } from '../../components/pokemon/FavoritePokemons';
import { localFavorites } from '../../utils';

export default function FavoritesPage() {

  const [favoriteIdPokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, [])

  return (
    <Layout title='Pokemons Favoritos'>

      {
        favoriteIdPokemons.length === 0 
        ? <NoFavorites /> 
        : <FavoritePokemons favoriteIdPokemons={favoriteIdPokemons}/>

      }


    </Layout>
  );
}
