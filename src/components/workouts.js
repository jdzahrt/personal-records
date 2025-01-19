import { v4 } from 'uuid';
import {
  Col, Loading, Row, Table, Tooltip, Grid, Input, Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditIcon from './Buttons/EditIcon';
import { DeleteIcon } from './Buttons/DeleteIcon';
import { IconButton } from './Buttons/IconButton';
import styles from '../../styles/Home.module.css';
import {
  addWorkout, getWorkouts, deleteWorkout,
} from '../services/workouts';

function Workouts() {
  const [workoutData, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setAddRecord] = useState(false);
  const [workout, setWorkout] = useState('');
  const [workoutType, setWorkoutType] = useState('');

  const columns = [
    {
      key: 'workout',
      label: 'Workout',
    },
    {
      key: 'exerciseCount',
      label: 'Exercises',
    },
    {
      key: 'workoutType',
      label: 'Type',
    },
    {
      key: 'date',
      label: 'Date',
    },
    // {
    //   key: 'actions',
    //   label: 'Actions',
    // },
  ];

  const addRecord = () => {
    setAddRecord(true);
  };

  const createWorkout = async (event) => {
    event.preventDefault();

    const workoutPayload = {
      workoutId: v4(),
      workout: event.target.workoutInput.value,
      workoutType: event.target.workoutTypeInput.value,
    };

    const fullWorkout = [...workoutData, workoutPayload];
    setWorkouts(fullWorkout);

    await addWorkout(workoutPayload);

    setWorkout('');
    setWorkoutType('');
  };

  useEffect(() => {
    getWorkouts()
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const deleteRecord = async (workoutId) => {
    await deleteWorkout(workoutId);

    setWorkouts((ah) => ah.filter((a) => a.workoutId !== workoutId));
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case 'workout':
        return (
          <Tooltip content="Details">
            <Link href={{
              pathname: '/workout-exercise-list/[id]',
              query: {
                id: item.workoutId,
                name: item.workout,
              },
            }}
            >
              {cellValue}
            </Link>
          </Tooltip>
        );
      case 'exerciseCount':
        return (
          <Row justify="center" align="center">
            {cellValue}
          </Row>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div>
      {isAdding ? (
        <div>
          <form onSubmit={createWorkout}>
            <Grid.Container gap={2}>
              <Grid>
                <Input
                  labelLeft="workout"
                  rounded
                  bordered
                  type="text"
                  id="workoutInput"
                  name="workout-input"
                  aria-label="workout-input"
                  required
                  value={workout}
                  onChange={(event) => setWorkout(event.target.value)}
                />
              </Grid>
              <Grid>
                <Input
                  labelLeft="type"
                  rounded
                  bordered
                  type="text"
                  id="workoutTypeInput"
                  name="workout-type"
                  aria-label="workout-type"
                  required
                  value={workoutType}
                  onChange={(event) => setWorkoutType(event.target.value)}
                />
              </Grid>
            </Grid.Container>
            <center className={styles.button}>
              <Button
                type="submit"
                size="xs"
                shadow
                color="success"
              >
                Add
              </Button>
            </center>
          </form>
          <center>
            <Button
              className={styles.button}
              onPress={() => setAddRecord(false)}
              size="xs"
              shadow
              color="error"
            >
              Cancel
            </Button>
          </center>
        </div>
      ) : (
        <center className={styles.button}>
          <Tooltip
            content="Add record"
            color="error"
            onClick={addRecord}
          >
            <Button size="xs">
              Add New Workout
            </Button>
          </Tooltip>
        </center>
      )}
      {
        isLoading
          ? (<Loading>Loading the squat rack with data</Loading>)
          : (
            <Grid.Container xs={12}>

              <Table
                bordered
                id="main-table"
                aria-label="Example table with static content"
                css={{
                  height: 'auto',
                  width: 'auto',
                  minWidth: '100%',
                }}
              >
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column width="100" id={column.key} key={column.key}>{column.label}</Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={workoutData}>
                  {(item) => (
                    <Table.Row id={item.workoutId} key={item.workoutId}>
                      {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={10}
                />
              </Table>
            </Grid.Container>
          )
      }
    </div>
  );
}

export default Workouts;
