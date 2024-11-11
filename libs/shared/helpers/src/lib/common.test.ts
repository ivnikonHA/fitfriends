import { parseTime, TimeAndUnit } from './common';

describe('Function: parseTime', () => {
  it('should return correct result', () => {
    // Arrange
    const mockTime = '10d';
    const correctResult: TimeAndUnit = {
      value: 10,
      unit: 'd'
    }
    // Act
    const result = parseTime(mockTime);

    // Assert
    expect(result).toEqual(correctResult);
  });
  it('should return incorrect result', () => {
    // Arrange
    const mockTime = '10s';
    const incorrectResult: TimeAndUnit = {
      value: 10,
      unit: 'd'
    }
    // Act
    const result = parseTime(mockTime);

    // Assert
    expect(result).not.toBe(incorrectResult);
  })
})
