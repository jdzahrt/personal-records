import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { forwardRef, useState, useEffect } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import {
  addWorkout, deleteWorkout, getWorkoutHistory, updateWorkout,
} from '../service/workout';

const tableIcons = {
  // eslint-disable-next-line react/jsx-filename-extension
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  TablePagination: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const oneRepMax = (weight, reps) => ((weight || 1) * (1 + (reps / 30))).toFixed(2);

function WorkoutHistory() {
  resetServerContext();
  const [workoutData, setWorkoutHistory] = useState([]);

  useEffect(() => {
    getWorkoutHistory()
      .then((data) => {
        setWorkoutHistory(data);
      });
  }, []);

  const [columns] = useState([
    {
      title: 'Exercise',
      field: 'exercise',
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

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={workoutData}
      options={{
        showTitle: false,
        pageSize: 10,
      }}
      editable={{
        onRowAdd: (newData) => new Promise((resolve) => {
          setWorkoutHistory([...workoutData, newData]);

          addWorkout(newData)
            .then((response) => console.log('Success', response));

          resolve();
        }),
        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataUpdate = [...workoutData];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setWorkoutHistory([...dataUpdate]);
            updateWorkout(newData)
              .then((response) => console.log('Success', response));

            resolve();
          }, 1000);
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          setTimeout(() => {
            const dataDelete = [...workoutData];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setWorkoutHistory([...dataDelete]);

            deleteWorkout(oldData._id)
              .then((response) => console.log('Successfully deleted', response));

            resolve();
          }, 1000);
        }),
      }}
    />
  );
}

export default WorkoutHistory;
