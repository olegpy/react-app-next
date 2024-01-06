import React, {FC, ReactNode} from 'react';
import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type LayoutT = {
  title: string;
  children: ReactNode;
};

const Layout:FC<LayoutT> = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

export default Layout;