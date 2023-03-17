// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// 1. anyone can save an algo
// 2. owner can authorize algo in authorized hash

contract WhiteBox {
    address public owner;
    mapping (uint => string) public algos;
    mapping (uint => bool) public authorizedAlgos;
    uint public algosCount;
    uint public authorizedAlgosCount;

    constructor() {
        owner = (msg.sender);
    }

    function saveAlgo (string memory _algo) public {
        algos[algosCount++] = _algo;
    }

    function authorizeAlgo (uint _algoId) public onlyOwner {
        authorizedAlgos[_algoId] = true;
        authorizedAlgosCount++;
    }
    function deauthorizeAlgo (uint _algoId) public onlyOwner {
        authorizedAlgos[_algoId] = false;
        authorizedAlgosCount--;
    }

    function saveAndAuthorizeAlgo (string memory _algo) public onlyOwner {
        algos[algosCount] = _algo;
        authorizedAlgos[algosCount] = true;
        algosCount++;
        authorizedAlgosCount++;
    }

    function getAuthorizedAlgos () public view returns (string[] memory) {
        string[] memory authorizedAlgosArray = new string[](authorizedAlgosCount);
        uint lastAuthorizedAlgoIndex = 0;

        for (uint i = 0; i < algosCount; i++) {
            if (authorizedAlgos[i]) {
                authorizedAlgosArray[lastAuthorizedAlgoIndex++] = algos[i];
            }
        }

        return authorizedAlgosArray;
    }

    function getSavedAlgo (uint _algoId) public view returns (string memory) {
        return algos[_algoId];
    }

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "You aren't the owner");
        _;
    }
}
