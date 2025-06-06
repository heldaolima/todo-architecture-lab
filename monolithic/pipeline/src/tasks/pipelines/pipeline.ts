import { Operation } from '../operations/operation';

export class Pipeline<I, O> implements Operation<I, O> {
  constructor(private readonly steps: Operation<any, any>[]) { }

  async execute(input: I): Promise<O> {
    let current: unknown = input;

    for (const step of this.steps) {
      current = await step.execute(current);
    }

    return current as O;
  }
}
