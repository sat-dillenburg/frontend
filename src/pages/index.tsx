import React from 'react';
import { Redirect } from '@reach/router';

export default function Index(): JSX.Element {
  return <Redirect noThrow to="/home" />;
}
