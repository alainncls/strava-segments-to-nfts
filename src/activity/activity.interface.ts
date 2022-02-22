export interface IActivityData {
  id: string;
  stravaId: number;
  name: string;
  segmentsIds: number[];
  matchingSegmentsIds: number[];
}

export interface IActivityRO {
  activity: IActivityData;
}
