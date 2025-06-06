export interface Operation<I, O> {
  execute: (data: I) => Promise<O>;
}
