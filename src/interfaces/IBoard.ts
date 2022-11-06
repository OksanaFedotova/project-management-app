type TBoardRequest = Omit<IBoard, 'id'>;

interface IBoard {
  id: string;
  title: string;
  description: string;
}

export { IBoard, TBoardRequest };
