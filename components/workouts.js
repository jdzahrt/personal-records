import {
  Col, Loading, Row, Table, Tooltip, Grid, Input, Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditIcon from './Buttons/EditIcon';
import { DeleteIcon } from './Buttons/DeleteIcon';
import { IconButton } from './Buttons/IconButton';
import { addWorkout } from '../services/workouts';

function Workouts() {
  // const [workoutData, setWorkoutHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setAddRecord] = useState(false);

  const columns = [
    {
      key: 'workout',
      label: 'WORKOUT',
    },
    {
      key: 'workoutType',
      label: 'WORKOUT TYPE',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];

  const rows = [
    {
      workoutId: '1',
      workout: 'Test',
      workoutType: 'Upper',
    },
    {
      workoutId: '2',
      workout: 'Test workout',
      workoutType: 'Upper',
    }];

  const addRecord = () => {
    console.log('add record');
    setAddRecord(true);
    console.log(isAdding);
  };

  const createWorkout = async (event) => {
    event.preventDefault();

    const workoutPayload = {
      workoutId: 1,
      workout: event.target.workoutInput.value,
      type: event.target.workoutTypeInput.value,
    };

    const response = await addWorkout(workoutPayload);
    console.log(response);
    // //   fetch('/api/workouts', {
    // //   method: 'POST',
    // //   headers: {
    // //     'Content-Type': 'application/json',
    // //   },
    // //   body: JSON.stringify(workout),
    // // });
    // const data = await response.json();
    // return data;
  };

  // useEffect(() => {
  //   getWorkoutHistory()
  //     .then((data) => {
  //       data.sort((a, b) => new Date(b.date) - new Date(a.date));
  //
  //       setWorkoutHistory(data);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

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
                onClick={() => console.log('here')}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#e73535" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      case 'workout':
        return (
          <Tooltip content="Details">
            <Link href={{
              pathname: '/workout-list/[id]',
              query: {
                id: item.workoutId,
              },
            }}
            >
              {cellValue}
            </Link>
          </Tooltip>
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
        <form onSubmit={createWorkout}>
          <Grid.Container>
            <Grid xs={12}>
              <Input
                placeholder="Workout"
                type="text"
                id="workoutInput"
                name="workout-input"
                aria-label="workout-input"
              />
            </Grid>
            <Grid xs={12}>
              <Input
                placeholder="Type"
                type="text"
                id="workoutTypeInput"
                name="workout-type"
                aria-label="workout-type"
              />
            </Grid>
          </Grid.Container>
          <Button type="submit" aria-label="submit-button" size="xs">
            Submit
          </Button>
        </form>
      ) : null}
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
                <Table.Body items={rows}>
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
