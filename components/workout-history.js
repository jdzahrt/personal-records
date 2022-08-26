import { v4 } from 'uuid';
import MaterialTable from '@material-table/core';
import moment from 'moment';

import { useState, useEffect } from 'react';

import { Input } from '@mui/material';

import {
  addWorkout,
  deleteWorkout,
  getWorkoutHistory,
  updateWorkout,
} from '../services/workout';
import logger from '../logger/logger';

const oneRepMax = (weight, reps) => ((weight || 1) * (1 + (reps / 30))).toFixed(2);
const defaultDate = new Date().toISOString().substring(0, 10);

function WorkoutHistory() {
  const [workoutData, setWorkoutHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWorkoutHistory()
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setWorkoutHistory(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const options = {
    showTitle: false,
    pageSize: 10,
    searchFieldAlignment: 'left',
    // draggable: false,
    grouping: true,
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
      validate: (rowData) => Boolean(rowData.exercise),
      cellStyle: {
        backgroundColor: '#ade503',
        color: '#110f0f',
      },
    },
    {
      title: 'Type',
      field: 'type',
      type: 'string',
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
      validate: (rowData) => rowData.weight > 0,
    },
    {
      title: 'One Rep Max',
      field: 'max',
      render: (rowData) => <div>{oneRepMax(rowData.weight, rowData.reps)}</div>,
      editComponent: ({ rowData }) => (
        <Input
          defaultValue={oneRepMax(rowData.weight, rowData.reps)}
          readOnly="true"
          type="number"
        />
      ),
    },
    {
      title: 'Date',
      field: 'date',
      type: 'date',
      grouping: true,
      initialEditValue: moment().format(),
      render: (rowData) => moment(rowData.date).format(('MM/DD/YY')),
      validate: (rowData) => Boolean(rowData.date),
      editComponent: () => (
        <Input
          defaultValue={defaultDate}
          type="date"
        />
      ),
    },
  ]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MaterialTable
      columns={columns}
      data={workoutData}
      options={options}
      isLoading={isLoading}
      editable={{
        onRowAdd: (newData) => new Promise((resolve) => {
          const payload = {
            ...newData,
            _id: v4(),
          };

          const fullWorkoutHistory = [...workoutData, payload];
          fullWorkoutHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
          setWorkoutHistory(fullWorkoutHistory);

          addWorkout(payload)
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
