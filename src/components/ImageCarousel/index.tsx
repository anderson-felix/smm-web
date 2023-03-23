/* eslint-disable react/jsx-indent */
import React from 'react';
import { Carousel as AntCarousel } from 'antd';

import { IImageCarouselProps } from './interfaces';

export const ImageCarousel: React.FC<IImageCarouselProps> = ({
  images,
  maxWidth,
}) => {
  return (
    <AntCarousel style={{ maxWidth }}>
      {images.length
        ? images.map(url => (
            <img width={250} height="max-content" src={url} key={url} />
          ))
        : null}
    </AntCarousel>
  );
};
