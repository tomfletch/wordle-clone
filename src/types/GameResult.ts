export type GameResult =
  | {
      didWin: true;
      attempts: number;
    }
  | {
      didWin: false;
      attempts?: undefined;
    };
