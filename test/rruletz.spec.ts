import { RRule } from 'rrule';
import { rruletzstr } from '../src';

describe('RRuletz', () => {
  describe('between()', () => {
    describe('when a schedule passes over a daylight savings change', () => {
      let rrule: RRule;
      const localDtstart = '20191005T000000';
      const dtstart = '2019-10-05T00:00:00+10:00'
      const localUntil = '20191006T235959';
      const until = '2019-10-06T23:59:59+11:00'
      const timezone = 'Australia/Sydney';

      beforeEach(() => {
        /**
         * Australian summer time:
         * First Sunday of October at 2:00 am => First Sunday of April at 2:00 am
         *
         * In 2019, change occurs morning of Sunday 6th October 2019
         */
        const str = `DTSTART:${localDtstart}\nRRULE:FREQ=DAILY;BYDAY=SA,SU;BYHOUR=8;UNTIL=${localUntil};TZID=${timezone}`;
        rrule = rruletzstr(str);
      });

      it('returns two dates', () => {
        const dates = rrule.between(new Date(dtstart), new Date(until));
        expect(dates).toHaveLength(2);
      });

      it('correctly returns a date before the change', () => {
        const [first] = rrule.between(new Date(dtstart), new Date(until));
        const firstStr = first.toISOString();
        expect(firstStr).toEqual('2019-10-05T08:00:00.000+10:00');
      });

      it('and after the change', () => {
        const [_, second] = rrule.between(new Date(dtstart), new Date(until));
        const secondStr = second.toISOString();
        expect(secondStr).toEqual('2019-10-06T08:00:00.000+11:00');
      });
    });
  });
});
