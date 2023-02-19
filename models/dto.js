import moment from 'moment';

const dataToModel = (data) => ({
  workoutId: data._id,
  email: data.email,
  date: moment(data.date).format('YYYY-MM-DD'),
  exercise: data.exercise,
  reps: data.reps,
  weight: data.weight,
  exerciseType: data.exerciseType,
});
const dataToModelArray = async (data) => data.map((singleElement) => dataToModel(singleElement));
export { dataToModel, dataToModelArray };
