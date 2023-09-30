import {
  Col, Loading, Row, Table, Tooltip, Grid, Input, Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import EditIcon from './Buttons/EditIcon';
import { IconButton } from './Buttons/IconButton';
import { DeleteIcon } from './Buttons/DeleteIcon';
import {
  getWorkoutExercises,
  addWorkoutExercise,
  deleteWorkoutExercise,
} from '../../services/exercise';
import styles from '../../styles/Home.module.css';
import { calcOneRepMax } from '../../utils/calculations';

function ExerciseList({ workoutId }) {
  ExerciseList.propTypes = {
    // eslint-disable-next-line react/require-default-props
    workoutId: PropTypes.string,
  };

  const [allExerciseData, setAllExerciseData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setAddRecord] = useState(false);

  const columns = [
    {
      key: 'exercise',
      label: 'EXERCISE',
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
      key: 'oneRepMax',
      label: '1RM',
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

  const searchRecords = async (searchText) => {
    const filtered = allExerciseData.filter(
      (workout) => workout.exercise.toLowerCase()
        .includes(searchText.toLowerCase()),
    );

    setExerciseData(filtered);
  };

  useEffect(() => {
    getWorkoutExercises(workoutId)
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setAllExerciseData(data);
        setExerciseData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addRecord = () => {
    setAddRecord(true);
  };

  const deleteRecord = async (workoutExerciseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (!confirmDelete) return;
    await deleteWorkoutExercise(workoutExerciseId);

    setExerciseData((ah) => ah.filter((a) => a.workoutExerciseId !== workoutExerciseId));
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

    const fullWorkout = [...exerciseData, workoutPayload];
    setExerciseData(fullWorkout);

    await addWorkoutExercise(workoutPayload);
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Edit record">
                <Link href={{
                  pathname: '/exercise-detail/[id]',
                  query: {
                    id: item.workoutExerciseId,
                    workoutId: item.workoutId,
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
                onClick={() => deleteRecord(item.workoutExerciseId)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#e73535" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      case 'oneRepMax':
        return (
          <div>
            {calcOneRepMax(item.weight, item.reps)}
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      {isAdding ? (
        <div>
          <form onSubmit={createWorkoutExercise}>
            <Grid.Container gap={2} justify="center">
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
            <Grid.Container gap={2} justify="center">
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
            <center>
              <Button
                className={styles.button}
                type="submit"
                aria-label="submit-button"
                size="xs"
                shadow
                color="success"
              >
                Add Exercise
              </Button>
            </center>
          </form>
          <center>
            <Button
              className={styles.button}
              onPress={() => setAddRecord(false)}
              shadow
              size="xs"
              color="error"
              auto
              aria-label="cancel-button"
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
              Add New Exercise
            </Button>
          </Tooltip>
        </center>
      )}
      <Input
        labelPlaceholder="Search"
        id="searchInput"
        name="search"
        bordered
        clearable
        onChange={(e) => searchRecords(e.target.value)}
        css={{ width: '100%' }}
        status="success"
      />
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
                    <Table.Column
                      width="100"
                      id={column.key}
                      key={column.key}
                    >
                      {column.label}
                    </Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={exerciseData}>
                  {(item) => (
                    <Table.Row id={item.workoutExerciseId} key={item.workoutExerciseId}>
                      {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={12}
                />
              </Table>
            </Grid.Container>
          )
      }
    </div>
  );
}

export default ExerciseList;
