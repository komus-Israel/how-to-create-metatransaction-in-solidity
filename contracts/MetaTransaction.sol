pragma solidity 0.8.10;


/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details




//  message to sign

//  hash the message

//  sign the hashed message. This is done offchain

//  erecover --> this will return the signer


contract MetaTransaction {

    struct Certificate {

        uint256 nonce;
        uint256 maxAmount;
        uint256 minAmount;
        //address signer;
        

    }

    bytes _signedData;
    bytes32 public _hashedMessage;

    function signCertificate () public view returns (bytes memory)  {
        return "";
    }

    function getMessageHash(Certificate memory _certificate) public returns (bytes32) {

        _hashedMessage = keccak256(abi.encode(_certificate.nonce, _certificate.maxAmount, _certificate.minAmount));
        return _hashedMessage;

    }

    function hash() external returns (bytes32) {

        Certificate memory _certificate = Certificate(225, 1000, 10);
        getMessageHash(_certificate);
        
    }

}