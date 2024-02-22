import { Container, Text } from '@nextui-org/react';
import Image from 'next/image';

export const NoFavorites = () => {
  return (
    <Container
        css={{
          display: 'flex', 
          flexDirection: 'column', 
          height: 'calc(100vh - 100px)', 
          alignItems: 'center', 
          justifyContent: 'center', 
          alignSelf: 'center'
        }}
      >
        <Text h1>No hay Favoritos</Text>
        <Image
          src='https://pokeapi.co/static/pokeapi_256.3fa72200.png' 
          alt='Poke Api'
          width={400}
          height={200}
          quality={100}
          style={{
            opacity: 0.2
          }}
        />
      </Container>
  )
}
