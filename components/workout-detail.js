import {
  Input, Button, Grid,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';

import {
  getWorkoutDetail, updateWorkout,
} from '../services/workout';

function WorkoutDetail({ workoutId }) {
  WorkoutDetail.propTypes = {
    workoutId: PropTypes.string.isRequired,
  };

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid.Container gap={2}>
        <Grid>
          <Input
            labelLeft="exercise"
            aria-label="exercise-input"
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
            aria-label="type-input"
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
            aria-label="reps-input"
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
            aria-label="weight-input"
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
            aria-label="date-input"
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
      <center>
        <Button className={styles.button} type="submit" aria-label="submit-button">
          Submit
        </Button>
      </center>
    </form>
  );
}

export default WorkoutDetail;
