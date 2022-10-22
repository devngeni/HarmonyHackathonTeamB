HARMONY NFT MARKETPLACE 
NFT Marketplaceis a popular use case in the implementation of blockchain technology which raises the sale of NFTs art collection by digital artists.

We came up with an implementation of the same using HArmony SDK whereby we integrated the functionalities of major NFT Marketplaces.

Our maketplace impelements major use cases of most NFT marketplaces.

You can mint your NFT to our marketplace using the SDK.
This also allows you to buy an NFT incase one is interested in acquring one.
You can also resell the NFT after major profit as per ones requirements.
The showcase is that a user of our platfrom has access to there account through Metamask crypto wallet in that you can view all your NFT collection in your profile account.

Besides the NFT collection model we tried to use the covalent API to fetch transactions data. For testnet network we had some issues the endpoints provided couldn't fecth out NFT transaction history but we were able to fetch all network chains using the covalent API. This is demonstrated in our NFT marketplace. What a step.

The showcase of the Marketplace can be seen on https://the-nfts.netlify.app/

#Stretch Goal
Staking being part was a new idea of which we couldn't back down as we went ahead and tested it out. This ia still yet to be done as we will be pushing it to our repository.


<!-- @format -->

# To run:

```shell
npm install --force

npm start
```

# Trouble shooting

Cant resolve ipfs-car/blockstore/memory when importing nft.storage?

    -Go to node_modules/nft.storage directory.
    -Make sure you have ipfs-car/dist/esm/blockstore and ipfs-car/dist/esm/pack. If not, install ipfs-car with npm i ipfs-car. Copy ipfs-car/dist/esm to nft.storage/src.
    -Inside nft.storage/src, update the ipfs-car import statements in the following files like so:

-Inside platform.web.js, update to this: import { MemoryBlockStore } from 'ipfs-car/dist/esm/blockstore/memory'

-Inside lib.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'

-Inside token.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'

-This solved my problem.


