import { RRule as OrigRRule } from 'rrule';

export class RRule {
  private _instance: OrigRRule;

  constructor(options: Partial<OrigRRule["options"]>) {
    this._instance = new OrigRRule(options);
  }

  between(after: Date, before: Date): Date[] {
    return this._instance.between(after, before);
  }
}
