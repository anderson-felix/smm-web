import React from 'react';
import { Img } from './styles';

import letterO from '../../assets/loader-icon-white.svg';

interface IProps extends React.HtmlHTMLAttributes<HTMLImageElement> {
  size?: number;
}

const Loading: React.FC<IProps> = props => <Img src={letterO} {...props} />;

export default Loading;
