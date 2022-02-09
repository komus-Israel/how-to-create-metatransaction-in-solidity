const Meta = artifacts.require("./MetaTransaction")

require("chai")
    .use(require("chai-as-promised"))
    .should()


contract("Meta", ([address1, address2, operator1, operator2])=>{

    let meta

    beforeEach(async()=>{
        meta = await Meta.new()
    })

    describe("deployment", ()=>{
        it("has contract address", async()=>{
            await meta.address.should.not.be.equal("", "it has a contract address")
        })
    })

    describe("certificate hash with solidity", ()=>{

        let hash

        beforeEach(async()=>{
           hash =  await meta.hash()
        })

        it("returns hash", async()=>{
           const hashMessage = await meta._hashedMessage()
           console.log(hashMessage)
        })
    })

    describe("certificate hash with web3 js and solidity", ()=>{

        let hash
        let _certificate

        _certificate = {

            nonce: 225,
            maxAmount: 1000,
            minAmount: 10

        }

        
        beforeEach(async()=>{

            hash = await meta.getMessageHash(_certificate)
            

        })


        it("returns hash", async()=>{
            const hashMessage = await meta._hashedMessage()
            console.log(hashMessage)
        })

    })

    describe("certificate hash with just web3 js", ()=>{
        let hash
        let _certificate
        let encoded

        _certificate = {

            nonce: 225,
            maxAmount: 1000,
            minAmount: 10

        }

        beforeEach(()=>{
           encoded =  web3.eth.abi.encodeParameters(["uint256", "uint256", "uint256"], [_certificate.nonce, _certificate.maxAmount, _certificate.minAmount])
        })

        it("returns hash", ()=>{
           const hash = web3.utils.keccak256(encoded)
           console.log(hash)
        })


        
    })

    describe("certificate signing with solidity", ()=>{

        let certificateHash
        let hashedSignature
        let signature = "0x4f9d78c59c7ac47064d553b0309c731f9225176b2a2504618b3eccbf07b3d11a079f90ea926870793498f1f0c11b51fc1c58946c3db51c42a49b42d9c47e84f41b"

        beforeEach(async()=>{
            await meta.hash()
        })

        it("returns hash", async()=>{
            certificateHash = await meta._hashedMessage()
            console.log(certificateHash)
        })

        it("signs the certificate", async()=>{
             const sign = await meta.getEthHash(certificateHash)
             hashedSignature = await meta._signedData()
             console.log(hashedSignature)
             
        })

        it("recovers the address", async()=>{
            await meta.recover(hashedSignature, signature)
            const recover = await meta.signer()
            recover.should.be.equal(address1, "returns the valid address of the signer")
        })

    })

    

    
})