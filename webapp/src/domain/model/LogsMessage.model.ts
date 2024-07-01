export type TPlayerAction = {
  type: "PLAYER_ACTION";
  user_id: string;
};

export type TWinnerRound = {
  type: "WINNER_ROUND";
  user_id: string;
  average: string;
  user_number_selected: string;
};

export type TLiveActivityMessage = TPlayerAction | TWinnerRound;
