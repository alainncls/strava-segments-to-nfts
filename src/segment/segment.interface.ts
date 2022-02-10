export interface ISegmentData {
    id: string;
    stravaId: number;
    name: string;
    length: number;
}

export interface ISegmentRO {
    segment: ISegmentData;
}