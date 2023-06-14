// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract OperationCertification {
    //新建用于获取操作名称以及操作hash的结构
    struct Attestation {
        string OperatorName; //操作名称
        bytes32 OperatorHash;
    }


    //新建mapping进行存储
    mapping(address => mapping(string => Attestation[])) ats;

    //设置日志
    function setLogger(
        string memory opName,
        string memory opHash,
        string memory username
    ) public {
        bytes32 hashValue = stringToBytes32(opHash);
        ats[msg.sender][username].push(
            Attestation({OperatorName: opName, OperatorHash: hashValue})
        );
    }

    function getLoggers(address ads, string memory username) public view returns (Attestation[] memory) {
    return ats[ads][username];
}

    //将string类型转化为hash的bytes32类型
    function stringToBytes32(
        string memory str
    ) private pure returns (bytes32 result) {
        bytes memory temp = bytes(str);
        assembly {
            result := mload(add(temp, 32))
        }
    }

    //将bytes32类型转换为string
    function bytes32ToString(
        bytes32 _bytes32
    ) private pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (uint8 j = 0; j < i; j++) {
            bytesArray[j] = _bytes32[j];
        }
        return string(bytesArray);
    }
}
