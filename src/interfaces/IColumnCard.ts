import { ITask } from './IBoard';

export default interface IColumnCard {
  id: string;
  title: string;
  tasks: ITask[];
}
