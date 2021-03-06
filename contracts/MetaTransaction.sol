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

    bytes32 public _signedDataHash;
    bytes32 public _hashedMessage;
    address public signer;

    function getEthHash(bytes32 _certificateHash) public returns (bytes32)  {
        _signedDataHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _certificateHash));
        return _signedDataHash;
    }

    function getMessageHash(Certificate memory _certificate) public returns (bytes32) {

        _hashedMessage = keccak256(abi.encodePacked(_certificate.nonce, _certificate.maxAmount, _certificate.minAmount));
        return _hashedMessage;

    }

    function hash() external returns (bytes32) {

        Certificate memory _certificate = Certificate(225, 1000, 10);
        getMessageHash(_certificate);
        
    }

    function recover(bytes32 _ethSignedHash, bytes calldata _signature) external returns (address) {

        (bytes32 r, bytes32 s, uint8 v) = _split(_signature);
        signer =  ecrecover(_ethSignedHash, v, r, s);

    }


    function _split(bytes memory _signature) internal returns (bytes32 r, bytes32 s, uint8 v) {

        require(_signature.length == 65, "invalid signature length");

        assembly {

            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))

        }

    }

    

}