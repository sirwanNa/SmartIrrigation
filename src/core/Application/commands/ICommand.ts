

export interface ICommand<TResult =void>{
     execute():TResult;
}

// export interface ICommandHandler<TCommand extends ICommand<TResult>, TResult> {
//   handle(command: TCommand): TResult;
// }