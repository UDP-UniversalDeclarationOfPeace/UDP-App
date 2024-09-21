// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Guestbook {
    struct Entry {
        address sender;
        string message;
    }

    Entry[] public entries;

    function addEntry(string memory _message) public {
        entries.push(Entry(msg.sender, _message));
    }

    function getEntries() public view returns (Entry[] memory) {
        return entries;
    }
}
