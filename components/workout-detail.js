import { Input } from '@nextui-org/react';

import { useState, useEffect } from 'react';

import {
  addWorkout,
  deleteWorkout,
  getWorkoutDetail,
  updateWorkout,
} from '../services/workout';

function WorkoutDetail({ workoutDetailId }) {
  // const ok = getServerSideProps();
  // console.log('prizzy1111', getServerSideProps());
  console.log('prizzy22', workoutDetailId);
  const [workoutDetail, setWorkoutDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWorkoutDetail(workoutDetailId)
      .then((data) => {
        const newData = {
          ...data,
          date: data.date.toString().substring(0, 10),
        };
        setWorkoutDetail(newData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = () => console.log('hello');

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    // <div>
    //   <b>{workoutDetail.exercise}</b>
    //   <b>{workoutDetail._id}</b>
    //   <Input>Test</Input>
    // </div>
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="id">
          {'ID: '}
          <input type="text" id="id" name="id" readOnly value={workoutDetail._id} />
        </label>
      </p>
      <p>
        <label htmlFor="exercise">
          {'Exercise: '}
          <input type="text" id="exercise" name="exercise" defaultValue={workoutDetail.exercise} />
        </label>
        <label htmlFor="exercise-type">
          {' Type: '}
          <input type="text" id="exercise-type" name="exercise-type" defaultValue={workoutDetail.exerciseType} />
        </label>
      </p>
      <p>
        <label htmlFor="reps">
          {'Reps: '}
          <input type="text" id="reps" name="reps" defaultValue={workoutDetail.reps} />
        </label>
        <label htmlFor="weight">
          {' Weight: '}
          <input type="text" id="weight" name="weight" defaultValue={workoutDetail.weight} />
        </label>
      </p>
      <p>
        <label htmlFor="date">
          {'Date: '}
          <input type="date" id="date" name="date" defaultValue={workoutDetail.date} />
        </label>
      </p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default WorkoutDetail;
