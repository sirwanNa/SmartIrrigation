export class Mapper {
    
  static Map<TInput, TOutput>(input: TInput): TOutput {
    const output = {} as TOutput;
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        (output as any)[key] = (input as any)[key];
      }
    }
    return output;
  }
}
