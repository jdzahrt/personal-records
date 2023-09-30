import { calcDaysQuit } from '../../src/utils/days';

describe('days', () => {
  test('calcDaysQuit with endDate', () => {
    const expectedQuitDate = '1/1/2022';
    const expectedEndDate = '1/15/2022';

    const result = calcDaysQuit(expectedQuitDate, expectedEndDate);

    expect(result).toEqual(14);
  });

  test('calcDaysQuit with no endDate', () => {
    const expectedQuitDate = '1/1/2022';
    const expectedEndDate = null;

    const date1 = new Date(expectedQuitDate);
    const date2 = new Date();
    const expectedDiffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);

    const result = calcDaysQuit(expectedQuitDate, expectedEndDate);

    expect(result).toEqual(expectedDiffDays);
  });
});
