

export interface ICommand<TResult =void>{
     executeAsync():TResult;
}

// export interface ICommandHandler<TCommand extends ICommand<TResult>, TResult> {
//   handle(command: TCommand): TResult;
// }