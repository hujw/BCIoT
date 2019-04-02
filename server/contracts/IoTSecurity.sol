pragma solidity ^0.4.11;


contract IoTSecurity {
    struct Firmware {
    string swarmAddress;
    string SHA256;
    }

    uint numOfFirmware;

    mapping (uint => Firmware) public Firmwares;

    event uploadEvent(uint id, string swarmAddress, string SHA256);

    address owner;

    function IoTSecurity() public {
        numOfFirmware = 0;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function uploadFirmware(string swarmAddress, string SHA256) onlyOwner public returns (uint id){
        id = ++numOfFirmware;
        Firmwares[id] = Firmware(swarmAddress, SHA256);
        uploadEvent(numOfFirmware, swarmAddress, SHA256);
    }

}