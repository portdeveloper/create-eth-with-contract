# Create ETH with Contract

A CLI tool to create a Scaffold-ETH 2 project with a custom Solidity contract.

## Usage

Run the following command:

npx create-eth-with-contract -code <base64_encoded_contract>

Replace <base64_encoded_contract> with your base64 encoded Solidity contract.

## Encoding Your Contract

To encode your Solidity contract, you can use the following command:

base64 -w 0 < YourContract.sol | pbcopy

This will encode the contract and copy it to your clipboard (on macOS).

## Options

- -code <base64>: Base64 encoded Solidity contract (required)
- -n, --name <projectName>: Name of the project directory (optional)

## Example

npx create-eth-with-contract -code SGVsbG8sIFdvcmxkIQ==

This will create a new Scaffold-ETH 2 project with your custom contract.

## Requirements

- Node.js 14.0.0 or later

## Note

This tool is designed to be run directly with npx. There's no need to install it globally.

## Local Development and Testing

To test this tool locally:

1. Clone this repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies
4. Run `npm link` to create a global symlink to your local version

After running `npm link`, you can use the tool as if it were installed globally:

npx create-eth-with-contract -code <base64_encoded_contract>

This will use your local version of the tool, allowing you to test your changes.

To unlink after testing, run `npm unlink` in the project directory.

## Quick Start

You can run this tool directly using npx and GitHub:

npx github:yourusername/create-eth-with-contract -code <base64_encoded_contract>

Replace <base64_encoded_contract> with your base64 encoded Solidity contract.

Examples:

1. Hello World Contract:

npx github:portdeveloper/create-eth-with-contract -code cHJhZ21hIHNvbGlkaXR5IF4wLjguMDsKCmNvbnRyYWN0IEhlbGxvV29ybGQgewogICAgc3RyaW5nIHB1YmxpYyBncmVldGluZyA9ICJIZWxsbywgV29ybGQhIjsKCiAgICBmdW5jdGlvbiBzZXRHcmVldGluZyhzdHJpbmcgbWVtb3J5IF9ncmVldGluZykgcHVibGljIHsKICAgICAgICBncmVldGluZyA9IF9ncmVldGluZzsKICAgIH0KfQ==

This will create a new Scaffold-ETH 2 project with a simple "Hello World" contract.

2. Token Contract:

npx github:portdeveloper/create-eth-with-contract -code cHJhZ21hIHNvbGlkaXR5IF4wLjguMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHMvdG9rZW4vRVJDMjAvRVJDMjAuc29sIjsKCmNvbnRyYWN0IE15VG9rZW4gaXMgRVJDMjAgewogICAgY29uc3RydWN0b3IoKSBFUkMyMCgiTXkgVG9rZW4iLCAiTVRLIikgewogICAgICAgIF9taW50KG1zZy5zZW5kZXIsIDEwMDAwMDAgKiAxMCAqKiBkZWNpbWFscygpKTsKICAgIH0KfQ==

This will create a new Scaffold-ETH 2 project with a basic ERC20 token contract.

## Scaffold-ETH 2 Resources

- Scaffold-ETH 2 Documentation: https://docs.scaffoldeth.io/
- Scaffold-ETH 2 GitHub Repository: https://github.com/scaffold-eth/scaffold-eth-2
- Scaffold-ETH 2 Telegram Support Chat: https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
