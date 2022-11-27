type TBoardRequest = Omit<IBoard, 'id'>;
type TColumnRequest = Omit<IColumn, 'id'>;

type TTaskRequest = {
  title: string;
  order?: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
};

interface ITaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface IBoard {
  id: string;
  title: string;
  description: string;
  columns?: IColumn[];
}

interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files?: IFile[];
}

interface IFile {
  filename: string;
  fileSize: number;
}

export {
  IBoard,
  TBoardRequest,
  IColumn,
  ITask,
  IFile,
  TColumnRequest,
  TTaskRequest,
  ITaskResponse,
};
