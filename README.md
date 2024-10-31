# Bitlayer Omnity Demo

This repository contains a demo application that interacts with Omnity on the Bitlayer, functioning as a LuckyPot.

Users can cross-chain mint 1 UNCOMMON•GOODS into this LuckyPot contract by making a deposit. When the contract holds UNCOMMON•GOODS, users can enter their Bitcoin address and click “Draw” to participate in the raffle. The draw can result in one of three outcomes:

	1.	1 UNCOMMON•GOODS is redeemed to the user’s provided Bitcoin address.
	2.	1 UNCOMMON•GOODS is transferred cross-chain to the user’s corresponding account on BEVM.
	3.	1 UNCOMMON•GOODS is destroyed.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/octopus-network/bitlayer-omnity-demo.git
cd bitlayer-omnity-demo
npm install
```

Then, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Coinbase Wallet](https://www.coinbase.com/wallet) or [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.


On a new terminal, go to the repository's root folder and run this to
deploy your contract to Bitlayer mainnet:

```sh
$ npx hardhat vars set BITLAYER_PRIVATE_KEY
$ npx hardhat ignition deploy ./ignition/modules/LuckyPot.js --network bitlayer
✔ Confirm deploy to network bitlayer (200901)? … yes
Hardhat Ignition 🚀

Deploying [ LuckyPotModule ]

Batch #1
  Executed LuckyPotModule#LuckyPot

[ LuckyPotModule ] successfully deployed 🚀

Deployed Addresses

LuckyPotModule#LuckyPot - 0x7A4daDbFB7FAd10daD816A9864aFC19F813bd1c3
```