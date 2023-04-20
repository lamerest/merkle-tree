import { ethers } from 'hardhat'
import { deployMerkleTree } from './deploy'

export async function merkle() {
	const merkle = await deployMerkleTree()
	const string = 'Slava'

	console.log(await merkle.encode(string))
	console.log(await merkle.makeHash(string))

	console.log('\nHashes')
	for (let i = 0; i < 7; i++) {
		console.log(await merkle.hashes(i))
	}

	console.log('\nVerify')
	const tx = await merkle.transactions(2)
	const root = await merkle.hashes(6)

	const proof1 = await merkle.hashes(3)
	const proof2 = await merkle.hashes(4)
	console.log('Proof 2', proof2)

	const proof = [proof1, proof2]

	console.log(await merkle.verify(tx, 2, root, proof))
}

merkle().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
