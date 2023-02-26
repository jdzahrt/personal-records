import {
  Col, Loading, Row, Table, Tooltip, Grid, Input, Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';
import EditIcon from './Buttons/EditIcon';
import { IconButton } from './Buttons/IconButton';
import { DeleteIcon } from './Buttons/DeleteIcon';
import { getWorkoutExercises, addWorkoutExercise } from '../services/exercise';
import styles from '../styles/Home.module.css';

function ExerciseList({ workoutId }) {
  const [workoutData, setWorkoutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setAddRecord] = useState(false);

  const columns = [
    {
      key: 'exercise',
      label: 'EXERCISE',
    },
    {
      key: 'exerciseType',
      label: 'EXERCISE TYPE',
    },
    {
      key: 'reps',
      label: 'REPS',
    },
    {
      key: 'weight',
      label: 'WEIGHT',
    },
    {
      key: 'date',
      label: 'DATE',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];

  useEffect(() => {
    getWorkoutExercises(workoutId)
      .then((data) => {
        // data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setWorkoutData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addRecord = () => {
    setAddRecord(true);
  };

  const createWorkoutExercise = async (event) => {
    event.preventDefault();

    const workoutPayload = {
      workoutExerciseId: v4(),
      workoutId,
      exercise: event.target.exerciseInput.value,
      reps: event.target.repsInput.value,
      weight: event.target.weightInput.value,
      date: event.target.dateInput.value,
    };

    const fullWorkout = [...workoutData, workoutPayload];
    setWorkoutData(fullWorkout);

    await addWorkoutExercise(workoutPayload);
  };

  // const deleteRecord = async (workoutId) => {
  //   await deleteWorkout(workoutId);
  //
  //   setWorkoutHistory((ah) => ah.filter((a) => a.workoutId !== workoutId));
  // };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Edit record">
                <Link href={{
                  pathname: '/workout-detail/[id]',
                  query: {
                    id: item.workoutId,
                  },
                }}
                >
                  <IconButton>
                    <EditIcon size={20} fill="#4ADE7B" />
                  </IconButton>
                </Link>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Delete record"
                color="error"
                onClick={() => deleteRecord(item.workoutId)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#e73535" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      <Tooltip
        content="Add record"
        color="error"
        onClick={addRecord}
      >
        <IconButton>Add</IconButton>
      </Tooltip>
      {isAdding ? (
        <form onSubmit={createWorkoutExercise}>
          <Grid.Container gap={2}>
            <Grid>
              <Input
                labelLeft="exercise"
                aria-label="exercise-input"
                rounded
                bordered
                type="text"
                id="exerciseInput"
                name="exercise"
                required
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
                id="repsInput"
                name="reps"
                width="120px"
                required
              />
            </Grid>
            <Grid>
              <Input
                labelLeft="weight"
                aria-label="weight-input"
                rounded
                bordered
                type="number"
                id="weightInput"
                name="weight"
                width="120px"
                required
              />
            </Grid>
            <Grid>
              <Input
                labelLeft="date"
                aria-label="date-input"
                rounded
                bordered
                type="date"
                id="dateInput"
                name="date"
                width="120px"
                required
              />
            </Grid>
          </Grid.Container>
          <div align="center">
            <Button className={styles.button} type="submit" aria-label="submit-button">
              Submit
            </Button>
          </div>
        </form>
      ) : null}
      {
        isLoading
          ? (<Loading>Loading the squat rack with dataz</Loading>)
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

export default ExerciseList;
