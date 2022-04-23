export interface IActivityData {
  id: string;
  stravaId: number;
  name: string;
  segmentsIds: number[];
  matchingSegmentsIds: number[];
  segmentsPictures: string[];
}

export interface IActivityRO {
  activity: IActivityData;
}
