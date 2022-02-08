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
})