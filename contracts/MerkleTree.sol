//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract MerkleTree {
	bytes32[] public hashes;

	string[4] public transactions = ['TX1: Me -> John', 'TX2: John -> Mary', 'TX3: Mary -> Me', 'TX4: Me -> John'];

	constructor() {
		for (uint i = 0; i < transactions.length; i++) {
			hashes.push(makeHash(transactions[i]));
		}

		uint count = transactions.length;
		uint offset = 0;

		while (count > 0) {
			for (uint i = offset; i < offset + count - 1; i = i + 2) {
				hashes.push(keccak256(abi.encodePacked(hashes[i], hashes[i + 1])));
			}

			offset += count;
			count = count / 2;
		}
	}

	function verify(
		string memory transaction,
		uint index,
		bytes32 root,
		bytes32[] memory proof
	) public view returns (bool) {
		bytes32 hash = makeHash(transaction);
		console.logBytes32(hash);

		for (uint i = 0; i < proof.length; i++) {
			if (index % 2 == 0) {
				hash = keccak256(abi.encodePacked(hash, proof[i]));
			} else {
				hash = keccak256(abi.encodePacked(proof[i], hash));
			}

			index = index / 2;
			console.logBytes32(hash);
		}

		console.logString('End calculation');

		console.logBytes32(hash);
		console.logBytes32(root);
		return hash == root;
	}

	function encode(string memory input) public pure returns (bytes memory) {
		return abi.encodePacked(input);
	}

	function makeHash(string memory input) public pure returns (bytes32) {
		return keccak256(encode(input));
	}
}
