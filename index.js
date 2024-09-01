#!/usr/bin/env node

import { program } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .option('-code <base64>', 'Base64 encoded Solidity contract')
  .option('-n, --name <projectName>', 'Name of the project directory')
  .parse();

const options = program.opts();

if (!options.code && !options.Code) {
  console.error('Please provide a base64 encoded contract with the -code flag');
  process.exit(1);
}

const base64Contract = options.code || options.Code;

// Decode the base64 contract
const decodedContract = Buffer.from(base64Contract, 'base64').toString('utf-8');

// Extract contract name from the decoded contract
const contractNameMatch = decodedContract.match(/contract\s+(\w+)/);
const contractName = contractNameMatch ? contractNameMatch[1] : 'YourContract';

// Set the project name
const projectName = options.name || `se-2${contractName}`;

// Create a new directory for the project
fs.mkdirSync(projectName);
process.chdir(projectName);

// Clone the scaffold-eth-2 repository
console.log(`Creating Scaffold-ETH 2 project "${projectName}" with custom contract...`);
execSync('git clone https://github.com/scaffold-eth/scaffold-eth-2.git .', { stdio: 'inherit' });

// Remove the .git directory to detach from the original repository
execSync('rm -rf .git');

// Add the decoded contract to the project
const contractPath = path.join(process.cwd(), 'packages/hardhat/contracts', `${contractName}.sol`);
fs.writeFileSync(contractPath, decodedContract);

// Create a new deploy script for the custom contract
const newDeployScriptPath = path.join(process.cwd(), 'packages/hardhat/deploy', `00_deploy_${contractName.toLowerCase()}.ts`);
const deployScriptContent = `
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy${contractName}: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("${contractName}", {
    from: deployer,
    // Contract constructor arguments (if any)
    args: [],
    log: true,
    autoMine: true,
  });

  const ${contractName.toLowerCase()} = await hre.ethers.getContract("${contractName}", deployer);
  console.log("👋 ${contractName} deployed to:", ${contractName.toLowerCase()}.address);
};

export default deploy${contractName};

deploy${contractName}.tags = ["${contractName}"];
`;

fs.writeFileSync(newDeployScriptPath, deployScriptContent);

// Update the deploy script if the contract has a constructor with arguments
const constructorMatch = decodedContract.match(/constructor\s*\((.*?)\)/);
if (constructorMatch && constructorMatch[1].trim() !== '') {
  const constructorArgs = constructorMatch[1].split(',').map(arg => arg.trim().split(' ')[1]);
  const argsString = constructorArgs.map(() => 'deployer').join(', ');
  const updatedDeployScript = fs.readFileSync(newDeployScriptPath, 'utf8')
    .replace('args: [],', `args: [${argsString}],`);
  fs.writeFileSync(newDeployScriptPath, updatedDeployScript);
}

console.log(`Project "${projectName}" created successfully with your custom contract: ${contractName}.sol`);
console.log('A new deploy script has been created for your contract.');
console.log('To get started, run:');
console.log(`  cd ${projectName}`);
console.log('  yarn install');
console.log('  yarn chain');
console.log('  yarn deploy');
console.log('  yarn start');

// Extract Solidity version from the contract
const solidityVersion = extractSolidityVersion(decodedContract);

if (solidityVersion) {
  // Update hardhat.config.ts with the new Solidity version
  const hardhatConfigPath = path.join(process.cwd(), 'packages/hardhat/hardhat.config.ts');
  let hardhatConfig = fs.readFileSync(hardhatConfigPath, 'utf8');
  
  // Replace the solidity version without adding a carat
  hardhatConfig = hardhatConfig.replace(
    /solidity:\s*{[\s\S]*?version:\s*["'].*?["']/,
    `solidity: {\n    version: "${solidityVersion}"`
  );
  
  fs.writeFileSync(hardhatConfigPath, hardhatConfig);
  console.log(`Updated Hardhat configuration with Solidity version ${solidityVersion}`);
} else {
  console.log('Could not detect Solidity version. Using default version in Hardhat config.');
}

function extractSolidityVersion(contractCode) {
  const versionMatch = contractCode.match(/pragma solidity\s+([\^~]?\d+\.\d+\.\d+)/);
  if (versionMatch) {
    // Remove ^ or ~ from the version number
    return versionMatch[1].replace(/[\^~]/, '');
  }
  return null;
}