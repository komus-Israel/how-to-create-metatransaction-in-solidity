pragma solidity 0.8.10;


/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details


contract MetaTransaction {

    struct certificate {

        uint256 nonce;
        uint256 maxAmount;
        uint256 minAmount;
        address signer;
        

    }

    function signCertificate () public view returns (bytes memory)  {
        return "";
    }

}