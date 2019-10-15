import { RRule as OrigRRule, Options } from 'rrule';
import { DateTime, FixedOffsetZone } from 'luxon';

export class RRule {
  private _instance: OrigRRule;

  constructor(options: Partial<Options>) {
    if (!options.tzid) {
      throw new Error('You must provide a timezone for this schedule');
    }
    this._instance = new OrigRRule(options);
  }

  get origOptions(): Partial<Options> {
    return this._instance.origOptions;
  }

  between(after: Date, before: Date): Date[] {
    const tzid = this.origOptions.tzid;
    const utcDates = this._instance.between(after, before);

    return utcDates.map(d => {
      return DateTime.fromJSDate(d)
        .toUTC()
        .setZone(tzid!, { keepLocalTime: true })
        .toJSDate();
    });
  }

  toString(): string {
    return this._instance.toString();
  }
}
