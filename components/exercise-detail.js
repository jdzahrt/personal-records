import {
  Input, Button, Grid,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';
import { getExercise, updateExercise } from '../services/exercise';

function ExerciseDetail({ workoutExerciseId, workoutId }) {
  ExerciseDetail.propTypes = {
    workoutExerciseId: PropTypes.string.isRequired,
    workoutId: PropTypes.string.isRequired,
  };

  const [exerciseDetail, setExerciseDetail] = useState({});
  const router = useRouter();

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
      date: event.target.date.value,
      reps: event.target.reps.value,
      weight: event.target.weight.value,
    };

    await updateExercise(payload);

    await router.push(`/workout-exercise-list/${workoutId}`);
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
      <center>
        <Button
          className={styles.button}
          type="submit"
          aria-label="submit-button"
        >
          Submit
        </Button>
      </center>
    </form>
  );
}

export default ExerciseDetail;
