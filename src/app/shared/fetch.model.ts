export type FetchItem<D = unknown> =
  | {
      collection: string;
      id?: string;
      status: 'IDLE';
    }
  | {
      collection: string;
      id?: string;
      status: 'LOADING';
      startedOn: Date;
    }
  | {
      collection: string;
      id?: string;
      status: 'SUCCEEDED';
      result: D;
      startedOn: Date;
      completedOn: Date;
    }
  | {
      collection: string;
      id?: string;
      status: 'FAILED';
      error: any;
      startedOn: Date;
      completedOn: Date;
    };
