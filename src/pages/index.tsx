import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import { Helmet } from 'react-helmet';

export default function Index(): JSX.Element {
  useEffect(() => {
    navigate('/home');
  });

  return (
    <>
      <Helmet>
        <title>SAT Interim</title>
        <meta name="description" content="Die SAT-Webseite befindet sich momentan in der Umbauphase, seid gespannt." />
      </Helmet>
    </>
  );
}
