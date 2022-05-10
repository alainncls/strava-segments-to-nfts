class OwnershipRecord {
  private tokenId: number;
  private timestamp: number;
  private tokenURI: string;
  private segmentId: string;

  constructor(tokenId: number, timestamp: number, tokenURI: string, segmentId: string) {
    this.tokenId = tokenId;
    this.timestamp = timestamp;
    this.tokenURI = tokenURI;
    this.segmentId = segmentId;
  }

  getTokenId(): number {
    return this.tokenId;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getTokenUri(): string {
    return this.tokenURI;
  }

  getSegmentId(): string {
    return this.segmentId;
  }
}

export default OwnershipRecord;
