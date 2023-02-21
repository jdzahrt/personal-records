import {
  Input, Button, Grid,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

import {
  getWorkoutDetail, updateWorkout,
} from '../services/workout';

function WorkoutDetail({ workoutId }) {
  const [workoutDetail, setWorkoutDetail] = useState({});

  useEffect(() => {
    getWorkoutDetail(workoutId)
      .then((data) => {
        setWorkoutDetail(data);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      workoutId,
      exercise: event.target.exercise.value,
      exerciseType: event.target.exerciseType.value,
      date: event.target.date.value,
      reps: event.target.reps.value,
      weight: event.target.weight.value,
    };

    await updateWorkout(payload);
    // console.log('Payload output', payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid.Container gap={2}>
        <Grid>
          <Input
            labelLeft="exercise"
            rounded
            bordered
            type="text"
            id="exercise"
            name="exercise"
            initialValue={workoutDetail.exercise}
          />
        </Grid>
        <Grid>
          <Input
            labelLeft="type"
            rounded
            bordered
            type="text"
            id="exerciseType"
            name="exercise-type"
            initialValue={workoutDetail.exerciseType}
            width="120px"
          />
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2}>
        <Grid>
          <Input
            labelLeft="reps"
            rounded
            bordered
            type="number"
            id="reps"
            name="reps"
            initialValue={workoutDetail.reps}
            width="120px"
          />
        </Grid>
        <Grid>
          <Input
            labelLeft="weight"
            rounded
            bordered
            type="number"
            id="weight"
            name="weight"
            initialValue={workoutDetail.weight}
            width="120px"
          />
        </Grid>
        <Grid>
          <Input
            labelLeft="date"
            rounded
            bordered
            type="date"
            id="date"
            name="date"
            initialValue={workoutDetail.date}
            width="120px"
          />
        </Grid>
      </Grid.Container>
      <div align="center">
        <Button className={styles.button} type="submit" aria-label="submit-button">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default WorkoutDetail;
