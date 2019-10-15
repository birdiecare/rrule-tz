import { rrulestr as origRRulestr } from 'rrule';

import { RRule } from './rrule';

export function rrulestr(str: string) {
  const { options } = origRRulestr(str);
  return new RRule(options);
}
