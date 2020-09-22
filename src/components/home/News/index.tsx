import React from 'react';
import { useLocation } from '@reach/router';

import { graphql, Link, useStaticQuery } from 'gatsby';
import slugify from 'slugify';

import Image from '@components/home/News/Image';
import Divider from '@components/home/News/Divider';
import Content from '@components/home/News/Content';

import { css } from 'linaria';

import type { FluidObject } from 'gatsby-image';

const query = graphql`
  query {
    satInterim: satInterim {
      news_link_title
      news_title

      news_blog_entry {
        title
      }

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

export default function News(): JSX.Element {
  const dateData = useStaticQuery<SATInterimData>(query).satInterim;
  const location = useLocation();

  const image = dateData.news_image_file.childImageSharp.fluid;
  const title = dateData.news_title;
  const link = {
    title: dateData.news_link_title,
    href: `/page/${slugify(dateData.news_blog_entry.title).toLowerCase()}`,
  };

  return (
    <Link to={link.href} state={{ prevPath: location.pathname }} className={style}>
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

type ImageFluid = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

type SATInterimData = {
  satInterim: {
    news_link_title: string;
    news_title: string;

    news_blog_entry: {
      title: string;
      content: string;
    };

    news_image_file: ImageFluid;
  };
};
