import {
  Input, Button, Grid,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';
import { getExercise, updateExercise } from '../services/exercise';

function ExerciseDetail({ workoutExerciseId }) {
  ExerciseDetail.propTypes = {
    workoutExerciseId: PropTypes.string.isRequired,
  };

  const [exerciseDetail, setExerciseDetail] = useState({});

  useEffect(() => {
    getExercise(workoutExerciseId)
      .then((data) => {
        setExerciseDetail(data);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      workoutExerciseId,
      exercise: event.target.exercise.value,
      exerciseType: event.target.exerciseType.value,
      date: event.target.date.value,
      reps: event.target.reps.value,
      weight: event.target.weight.value,
    };

    await updateExercise(payload);
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
            initialValue={exerciseDetail.exercise}
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
            initialValue={exerciseDetail.exerciseType}
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
            initialValue={exerciseDetail.reps}
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
            initialValue={exerciseDetail.weight}
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
            initialValue={exerciseDetail.date}
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

export default ExerciseDetail;