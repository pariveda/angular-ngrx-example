export type FetchItem<D = unknown> =
  | {
      id: string;
      status: 'IDLE';
    }
  | {
      id: string;
      status: 'LOADING';
      startedOn: Date;
    }
  | {
      id: string;
      status: 'SUCCEEDED';
      result: D;
      startedOn: Date;
      completedOn: Date;
    }
  | {
      id: string;
      status: 'FAILED';
      error: any;
      startedOn: Date;
      completedOn: Date;
    };
