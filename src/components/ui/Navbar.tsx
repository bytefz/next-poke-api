import Image from "next/image";
import NextLink from 'next/link';

import { Navbar, Text, Link } from "@nextui-org/react";
import { useTheme } from '@nextui-org/react';

export const NavbarComponent = () => {

  const { theme } = useTheme();

  return (
    <Navbar
      variant="static"
      css={{
        backgroundColor: theme?.colors.gray100.value,
      }}
      maxWidth='fluid'
    >
      <Navbar.Brand>
        <Image
          src="/static/images/pokeball_logo.png"
          width={80}
          height={50}
          alt="Pokemon Logo"
          title="Pokemon Logo"
        />
        <Link href="/" as={NextLink}>
            <Text css={{ fontSize: '1.5rem'}} hideIn="xs">
              Poke App
            </Text>
        </Link>
      </Navbar.Brand>

      <Navbar.Content>
        <Link href="/favorites" as={NextLink}>
          <Text css={{ fontSize: '1.2rem'}} hideIn="xs">
            Favorites
          </Text>
        </Link>
      </Navbar.Content>

    </Navbar>
  )
}
