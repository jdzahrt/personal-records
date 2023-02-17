import { Input, Button } from '@nextui-org/react';
import styles from '../styles/Home.module.css';

import { useState, useEffect } from 'react';

import {
  getWorkoutDetail,
} from '../services/workout';


function WorkoutDetail({ workoutDetailId }) {


  const [workoutDetail, setWorkoutDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWorkoutDetail(workoutDetailId)
      .then((data) => {
        const newData = {
          ...data,
          date: data.date.toString()
            .substring(0, 10),
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
        <Input
          rounded
          bordered
          type="text" id="exercise" name="exercise" initialValue={workoutDetail.exercise}
          label="exercise"/>
        <Input
          rounded
          bordered
          type="text" id="exercise-type" name="exercise-type"
          initialValue={workoutDetail.exerciseType}
          label="exercise type"/>
      </p>
      <p>
        <Input
          rounded
          bordered
          type="text" id="reps" name="reps" initialValue={workoutDetail.reps}
          label="reps"/>
        <Input
          rounded
          bordered
          type="text" id="weight" name="weight" initialValue={workoutDetail.weight}
          label="weight"/>
      </p>
      <p>
        <Input
          rounded
          bordered
          type="date" id="date" name="date" initialValue={workoutDetail.date}
          label="Date"/>
      </p>
      <div align="center" class={styles.button}>
        <Button>Submit</Button>
      </div>
    </form>
  );
}

export default WorkoutDetail;
