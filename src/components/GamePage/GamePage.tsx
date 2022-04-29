import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { loadQuestionsAction } from '../../store/serviceActions';
import { getQuestions } from '../../store/gameState/selectors';

const GamePage: React.FC = () => {
  const { groupId = '' } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuestionsAction(Number(groupId)));
  }, [groupId, dispatch]);

  const questions = useAppSelector(getQuestions);

  console.log(questions);

  return <div>Game</div>;
};

export default GamePage;
