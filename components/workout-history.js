import MaterialTable from '@material-table/core';

import { useState, useEffect } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import {
  addWorkout,
  deleteWorkout,
  getWorkoutHistory,
  updateWorkout,
} from '../service/workout';
import logger from '../logger/logger';

const oneRepMax = (weight, reps) => ((weight || 1) * (1 + (reps / 30))).toFixed(2);

function WorkoutHistory() {
  resetServerContext();
  const [workoutData, setWorkoutHistory] = useState([]);

  useEffect(() => {
    getWorkoutHistory()
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setWorkoutHistory(data);
      });
  }, []);

  const options = {
    showTitle: false,
    pageSize: 10,
    searchFieldAlignment: 'left',
    draggable: false,
    headerStyle: {
      backgroundColor: '#019b09',
      color: '#110f0f',
      fontSize: 'large',
      fontWeight: 'bold',
    },
  };

  const [columns] = useState([
    {
      title: 'Exercise',
      field: 'exercise',
      type: 'string',
      cellStyle: {
        backgroundColor: '#ade503',
        color: '#110f0f',
      },
    },
    {
      title: 'Reps',
      field: 'reps',
      type: 'numeric',
      initialEditValue: 1,
      validate: (rowData) => rowData.reps > 0,
    },
    {
      title: 'Weight',
      field: 'weight',
      type: 'numeric',
      initialEditValue: 1,
      validate: (rowData) => rowData.reps > 0,
    },
    {
      title: 'One Rep Max',
      field: 'max',
      render: (rowData) => <div>{oneRepMax(rowData.weight, rowData.reps)}</div>,
    },
    {
      title: 'Date',
      field: 'date',
      type: 'date',
      initialEditValue: new Date(),
    },
  ]);

  resetServerContext();

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MaterialTable
      columns={columns}
      data={workoutData}
      options={options}
      editable={{
        onRowAdd: (newData) => new Promise((resolve) => {
          setWorkoutHistory([...workoutData, newData]);

          addWorkout(newData)
            .catch((error) => logger.error(error));

          resolve();
        }),
        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          const dataUpdate = [...workoutData];
          const index = oldData.tableData.id;

          dataUpdate[index] = newData;
          dataUpdate.sort((a, b) => new Date(b.date) - new Date(a.date));
          setWorkoutHistory([...dataUpdate]);

          updateWorkout(newData)
            .catch((error) => logger.error(error));

          resolve();
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          const dataDelete = [...workoutData];
          const index = oldData.tableData.id;

          dataDelete.splice(index, 1);
          setWorkoutHistory([...dataDelete]);

          deleteWorkout(oldData._id)
            .catch((error) => logger.error(error));

          resolve();
        }),
      }}
    />
  );
}

export default WorkoutHistory;
