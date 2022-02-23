export interface IActivityData {
  id: string;
  stravaId: number;
  name: string;
  segmentsIds: number[];
  matchingSegmentsIds: number[];
  segmentsPictures: any[];
}

export interface IActivityRO {
  activity: IActivityData;
}
