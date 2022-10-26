class Block {
  public id: number
  public hash: string
  public prevHash: string
  public data: string
  public timestamp: number
  constructor(
    id: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  )
  {
    this.id = id
    this.hash = hash
    this.prevHash = prevHash
    this.data = data
    this.timestamp = timestamp
  }
}

let blockchain: [Block]

export {
  blockchain
}
