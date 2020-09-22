import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function Index(): JSX.Element {
  useEffect(() => {
    navigate('/home');
  });

  return <></>;
}
