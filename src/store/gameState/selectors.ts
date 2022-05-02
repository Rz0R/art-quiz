import { NameSpace } from '../../consts/const';
import { RootState } from '../rootReducer';

export const getQuestions = (state: RootState) => state[NameSpace.game].questions;
