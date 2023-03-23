import { Link } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import ExerciseList from '../../components/exercise-list';
import { getWorkout } from '../../services/workouts';

// eslint-disable-next-line react/prop-types
function WorkoutList({ workoutId }) {
  const [workoutData, setWorkoutData] = useState({});

  useEffect(() => {
    getWorkout(workoutId)
      .then((data) => {
        setWorkoutData(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <main>
        <title>Workout Detail</title>
        <center><h1>{workoutData.workout}</h1></center>
        <ExerciseList
          workoutId={workoutId}
          workoutName={workoutData.workout}
        />
        <div className={styles.footer}>
          <Link href="/workouts-tracker" color="primary">Back</Link>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => ({
  props: {
    workoutId: context.query.id,
  },
});
export default WorkoutList;
