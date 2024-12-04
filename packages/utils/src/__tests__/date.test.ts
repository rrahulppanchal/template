import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime } from '../date';

describe('date utils', () => {
  const testDate = new Date('2023-12-25T15:30:00');

  describe('formatDate', () => {
    it('should format date correctly', () => {
      expect(formatDate(testDate)).toBe('December 25, 2023');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time correctly', () => {
      expect(formatDateTime(testDate)).toMatch(
        /December 25, 2023, \d{1,2}:\d{2} [AP]M/
      );
    });
  });
});
