const Meta = artifacts.require("./MetaTransaction")

require("chai")
    .use(require("chai-as-promised"))
    .should()


contract("Meta", ([address1, address2, operator1, operator2])=>{

    let meta

    beforeEach(()=>{
        meta = await Meta.new()
    })

    describe("deployment", ()=>{
        it("has contract address", async()=>{
            meta.address.should.not.be.equal("", "it has a contract address")
        })
    })
})