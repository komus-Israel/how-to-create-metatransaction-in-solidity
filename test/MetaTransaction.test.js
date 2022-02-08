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

    describe("certificate hash", ()=>{

        /*it("has an empty hash", async()=>{
            const hash = 
        })*/

        let hash

        beforeEach(async()=>{
           hash =  await meta.hash()
        })

        it("returns hash", async()=>{
           const hash = await meta._hashedMessage()
           console.log(hash)
        })
    })
})