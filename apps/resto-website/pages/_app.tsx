import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';

import Link from 'next/link';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Link href="/" locale="fr">
        <a>To /fr</a>
      </Link>
      <Link href="/" locale="en">
        <a>To /en</a>
      </Link>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
