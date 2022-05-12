import { NameSpace } from '../../consts/const';
import { RootState } from '../rootReducer';

export const getArtistQuestions = (state: RootState) => state[NameSpace.game].artistQuestions;
