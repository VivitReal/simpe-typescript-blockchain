import Block from './block'

class Blockchain {
  private _blockchain: Block[] = []

  private getLastBlock = (): Block => 
    this._blockchain.length !== 0 
      ? this._blockchain[this._blockchain.length - 1]
      : {
        id: -1,
        hash: '',
        prevHash: '',
        data: '',
        timestamp: 0
      }

  private getTimestamp = (): number => Math.round(new Date().getTime() / 1000)

  private getHashForBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
      aBlock.id,
      aBlock.prevHash,
      aBlock.data,
      aBlock.timestamp
    )

  private isBlockValid = (candidateBlock: Block, lastBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
      return false
    }
    if (lastBlock.id + 1 !== candidateBlock.id) {
      return false
    }
    if (lastBlock.hash !== candidateBlock.prevHash) {
      return false
    }
    if (this.getHashForBlock(candidateBlock) !== candidateBlock.hash) {
      return false
    }
    return true
  }

  private addBlock = (candidateBlock: Block): void => {
    if (this.isBlockValid(candidateBlock, this.getLastBlock())) {
      this._blockchain.push(candidateBlock)
    }
  }

  get data(): Block[] {
    return this._blockchain
  }

  createNewBlock = (data: string): Block => {
    const lastBlock: Block = this.getLastBlock()
    const newId: number = lastBlock.id + 1
    const newTimestamp: number = this.getTimestamp()
    const newHash: string = Block.calculateBlockHash(
      newId,
      lastBlock.hash,
      data,
      newTimestamp
    )
    const newBlock = new Block(
      newId,
      newHash,
      lastBlock.hash,
      data,
      newTimestamp
    )
    this.addBlock(newBlock)
    return newBlock
  }
}

export default new Blockchain
