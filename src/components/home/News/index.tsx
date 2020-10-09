import React from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';

import Image from '@components/home/News/Image';
import Divider from '@components/home/News/Divider';
import Content from '@components/home/News/Content';

import { css } from 'linaria';

import type { FluidObject } from 'gatsby-image';

const query = graphql`
  query {
    satInterim: satInterim {
      news_title
      news_article {
        slug
      }
      news_article_display_name
      news_image_file {
        childImageSharp {
          fluid(maxWidth: 1080, quality: 90, srcSetBreakpoints: [580, 680, 780, 880, 980, 1080]) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`;

export default function News({ data }: Props): JSX.Element {
  const _data = data ? data : useStaticQuery<NewsData>(query);
  const dateData = _data.satInterim;

  const image = dateData.news_image_file.childImageSharp.fluid;
  const title = dateData.news_title;

  const link = {
    title: dateData.news_article_display_name,
    href: `/p/${dateData.news_article.slug}`,
  };

  return (
    <Link to={link.href} className={style}>
      <Image image={image} />
      <Divider />
      <Content title={title} linkTitle={link.title} />
    </Link>
  );
}

const style = css`
  position: relative;
  flex: 1 1 auto;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 2;
  width: calc(50% + 20px);
  min-width: 280px;

  cursor: pointer;
  text-decoration: none;

  @media (max-width: 420px), screen and (max-height: 420px) {
    padding: 50px 25px;
  }

  &:hover {
    * {
      text-decoration: underline !important;
    }
  }
`;

type Props = {
  data?: NewsData;
};

export type ImageFluid = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

export type NewsData = {
  satInterim: {
    news_title: string;

    news_article_display_name: string;
    news_article: {
      slug: string;
    };

    news_image_file: ImageFluid;
  };
};
