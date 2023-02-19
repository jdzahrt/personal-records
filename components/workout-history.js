import { v4 } from 'uuid';
import MaterialTable from '@material-table/core';
import moment from 'moment';

import { useState, useEffect } from 'react';

import {
  Input, MenuItem, Select,
} from '@mui/material';

import {
  addWorkout,
  deleteWorkout,
  getWorkoutHistory,
  updateWorkout,
} from '../services/workout';
import logger from '../logger/logger';

const calcOneRepMax = (weight, reps) => ((weight || 1) * (1 + (reps / 30))).toFixed(2);
const formatDate = (date) => moment.utc(date).format('MM-DD-YYYY');

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
    pageSize: 20,
    searchFieldAlignment: 'left',
    draggable: true,
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
      title: 'EType',
      field: 'exerciseType',
      type: 'string',
      grouping: true,
      editComponent: (props) => (
        <Select
          value={props.rowData.exerciseType || ''}
          label="EType"
          onChange={(e) => props.onChange(e.target.value)}
        >
          <MenuItem value="upper">upper</MenuItem>
          <MenuItem value="lower">lower</MenuItem>
        </Select>
      ),
    },
    {
      title: 'Reps',
      field: 'reps',
      type: 'numeric',
      width: '5%',
      initialEditValue: 1,
      validate: (rowData) => rowData.reps > 0,
    },
    {
      title: 'Weight',
      field: 'weight',
      type: 'numeric',
      width: '5%',
      initialEditValue: 1,
      validate: (rowData) => rowData.weight > 0,
    },
    {
      title: 'One Rep Max',
      field: 'max',
      width: '6%',
      render: (rowData) => <div>{calcOneRepMax(rowData.weight, rowData.reps)}</div>,
      editComponent: ({ rowData }) => (
        <Input
          value={calcOneRepMax(rowData.weight, rowData.reps)}
          readOnly
          type="number"
        />
      ),
    },
    {
      title: 'Date',
      field: 'date',
      type: 'date',
      width: '20%',
      initialEditValue: moment().format(),
      render: (rowData) => formatDate(rowData.date),
      editComponent: (props) => (
        <Input
          value={new Date(props.rowData.date).toISOString().substring(0, 10)}
          type="date"
          onChange={(e) => props.onChange(e.target.value)}
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
          let dataDelete = [...workoutData];

          dataDelete = dataDelete.filter((obj) => obj.workoutId !== oldData.workoutId);

          setWorkoutHistory([...dataDelete]);

          deleteWorkout(oldData.workoutId)
            .catch((error) => logger.error(error));

          resolve();
        }),
      }}
    />
  );
}

export default WorkoutHistory;
