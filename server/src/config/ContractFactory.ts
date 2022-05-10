import {Signer} from 'ethers'
import StravaSegmentNftContract from './StravaSegmentNftContract'

class ContractFactory {
    private etherSigner: Signer;
    private stravaSegmentNft: StravaSegmentNftContract;

    constructor(etherSigner: Signer) {
        this.etherSigner = etherSigner
        this.stravaSegmentNft = new StravaSegmentNftContract(etherSigner)
    }

    getStravaSegmentNftContract(): StravaSegmentNftContract {
        return this.stravaSegmentNft
    }

}

export default ContractFactory
