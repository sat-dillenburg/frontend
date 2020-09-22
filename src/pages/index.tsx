import React from 'react';
import { Redirect } from '@reach/router';
import config from '../../gatsby-config'

export default function Index(): JSX.Element {
  return <Redirect noThrow to="home" />;
}
