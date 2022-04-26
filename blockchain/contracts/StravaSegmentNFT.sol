// SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StravaSegmentNFT is Ownable, ERC721("StravaSegmentNFT", "STRNFT") {
    uint tokenId;
    mapping(address => tokenMetaData[]) public ownershipRecord;

    struct tokenMetaData {
        uint tokenId;
        uint timestamp;
        string tokenURI;
    }

    function mintToken(address _recipient, string memory _pictureUrl) onlyOwner public {
        require(owner() != _recipient, "Recipient cannot be the owner of the contract");
        _safeMint(msg.sender, tokenId);
        ownershipRecord[_recipient].push(tokenMetaData(tokenId, block.timestamp, _pictureUrl));
        tokenId += tokenId;
    }
}