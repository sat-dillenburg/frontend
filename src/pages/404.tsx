import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import { Helmet } from 'react-helmet';

export default function Index(): JSX.Element {
  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <>
      <Helmet>
        <title>404</title>
        <meta name="description" content="404, Seite nicht gefunden." />
      </Helmet>
    </>
  );
}
