import React from 'react';
import { createImageUrl } from '../../../utils/common';
import LoadableImage from '../../LoadableImage';

type PicturesProps = {
  ind: number;
  picture: string;
  onAnswerBtnClick: (ind: number, painting: string) => void;
};

const Picture = ({ picture, ind, onAnswerBtnClick }: PicturesProps) => {
  return (
    <button className='pictures__item' onClick={() => onAnswerBtnClick(ind, picture)}>
      <LoadableImage src={createImageUrl(picture)} alt={`painting-${ind}`} />
    </button>
  );
};

export default Picture;
