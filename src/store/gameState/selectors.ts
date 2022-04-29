import { NameSpace } from '../rootReducer';
import { RootState } from '../rootReducer';

export const getQuestions = (state: RootState) => state[NameSpace.game].questions;
