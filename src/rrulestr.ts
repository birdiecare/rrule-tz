import { rrulestr as origRRulestr } from 'rrule';

import { RRule } from './rrule';

export function rrulestr(input: string) {
  const { origOptions } = origRRulestr(input);

  // passing TZID in string causes options to be returned as an empty object
  // See: https://github.com/jakubroztocil/rrule/issues/333
  const tzid = parseTZID(input);

  return new RRule({
    ...origOptions,
    tzid
  });
}

export function parseTZID(input: string) {
  const matches = input.match(/TZID=([a-zA-Z\/_]+);?/);
  return matches && matches[1];
}
