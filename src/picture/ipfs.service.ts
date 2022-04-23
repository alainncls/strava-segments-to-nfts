import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';

const IPFS_URL = 'https://ipfs.infura.io:5001/api/v0';
let ipfsClient;

@Injectable()
export class IpfsService {
  constructor() {
    ipfsClient = create({ url: IPFS_URL });
  }

  async uploadToIpfs(rawImage: any): Promise<string> {
    const { cid } = await ipfsClient.add(rawImage);
    return cid.toString();
  }
}
