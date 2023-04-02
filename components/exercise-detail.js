import {
  Input, Button, Grid, Loading,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';
import { getExercise, updateExercise } from '../services/exercise';
import { calcOneRepMax } from '../utils/calculations';

function ExerciseDetail({
  workoutExerciseId,
  workoutId,
}) {
  ExerciseDetail.propTypes = {
    workoutExerciseId: PropTypes.string.isRequired,
    workoutId: PropTypes.string.isRequired,
  };

  const [exerciseDetail, setExerciseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getExercise(workoutExerciseId)
      .then((data) => {
        setExerciseDetail(data);
      })
      .finally(() => setIsLoading(false));
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
    isLoading ? <Loading>Loading...</Loading>
      : (
        <form onSubmit={handleSubmit}>
          <Grid.Container gap={2} justify="center">
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
                onChange={(e) => {
                  document.getElementById('1rm').value = calcOneRepMax(exerciseDetail.weight, e.target.value);
                  document.getElementById('date').value = new Date().toISOString()
                    .slice(0, 10);
                }}
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
                onChange={(e) => {
                  document.getElementById('1rm').value = calcOneRepMax(e.target.value, exerciseDetail.reps);
                  document.getElementById('date').value = new Date().toISOString()
                    .slice(0, 10);
                }}
              />
            </Grid>
            <Grid>
              <Input
                labelLeft="1rm"
                aria-label="1rm-input"
                rounded
                bordered
                type="number"
                readOnly
                id="1rm"
                name="1rm"
                value={calcOneRepMax(exerciseDetail.weight, exerciseDetail.reps)}
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
      )
  );
}

export default ExerciseDetail;
