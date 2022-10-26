import * as CryptoJS from 'crypto-js'

class Block {
  public id: number
  public hash: string
  public prevHash: string
  public data: string
  public timestamp: number

  static calculateBlockHash = (
    id: number,
    prevHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(id + prevHash + data + timestamp).toString()

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.id === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.prevHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number'

  constructor(
    id: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  ) {
    this.id = id
    this.hash = hash
    this.prevHash = prevHash
    this.data = data
    this.timestamp = timestamp
  }
}

export default Block
