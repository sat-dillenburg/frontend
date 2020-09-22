import React from 'react';
import { css } from 'linaria';

import Divider from '@components/home/News/Divider';
import Title from '@components/home/News/Content/Title';
import Button from '@components/home/News/Content/Button';

export default function Content({ title, linkTitle }: Props): JSX.Element {
  return (
    <div className={style}>
      <Title>{title}</Title>
      <Divider />
      <Button>{linkTitle}</Button>
    </div>
  );
}

const style = css`
  padding-left: 10px;
  max-width: calc(100% - 62px);
  min-width: 220px;
`;

type Props = { title: string; linkTitle: string };
