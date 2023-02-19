import moment from 'moment';

const workoutDTO = (data) => ({
  workoutId: data._id,
  email: data.email,
  date: moment(data.date).format('YYYY-MM-DD'),
  exercise: data.exercise,
  reps: data.reps,
  weight: data.weight,
  exerciseType: data.exerciseType,
});

const workoutDTOArray = async (data) => data.map((singleElement) => workoutDTO(singleElement));

export { workoutDTO, workoutDTOArray };
