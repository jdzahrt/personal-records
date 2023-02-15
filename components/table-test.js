import {
  Col, Row, Table, Tooltip,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { getWorkoutHistory } from '../services/workout';
import EditIcon from './Buttons/EditIcon';
import { DeleteIcon } from './Buttons/DeleteIcon';

function TableTest() {
  const [workoutData, setWorkoutHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      key: 'date',
      label: 'DATE',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];

  useEffect(() => {
    getWorkoutHistory()
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setWorkoutHistory(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
                    id: item._id,
                  },
                }}
                >
                  <IconButton>
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Link>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Delete record"
                color="error"
                onClick={() => console.log('Delete record', item._id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
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
    <Table
      id="main-table"
      aria-label="Example table with static content"
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column id={column.key} key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={workoutData}>
        {(item) => (
          <Table.Row id={item._id} key={item._id}>
            {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default TableTest;
