// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { MerkleTree } from "../typechain";

export async function deployMerkleTree(): Promise<MerkleTree> {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Merkle = await ethers.getContractFactory("MerkleTree");
  const merkle = (await Merkle.deploy()) as MerkleTree;

  await merkle.deployed();

  console.log("MerkleTree deployed to:", merkle.address);
  return merkle;
}
