import Head from "next/head";

import {FC} from "react";
import { NavbarComponent } from "../ui";

interface HeaderProps {
  title   ?: string,
  children?: React.ReactNode,
}

const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export const Layout: FC<HeaderProps> = ({children, title}) => {

  const stringToTitle = (str: string | undefined) => {
    if (!str) return str;
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });}

  return (
    <>
      <Head>
        <title>{stringToTitle(title) || 'Pokemon App'}</title>
        <meta name="author" content="Franzua Plasencia" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Información sobre el pokemón ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, app, pokedex`} />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Información sobre ${title}`} />
        <meta property="og:image" content={`${origin}/static/images/banner.png`} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarComponent />

      <main
        style={{
          padding: '0px 20px'
        }}
      >
        {children}
      </main>

    </>
  )
}
