<!-- @format -->

# To run:

```shell
npm install --force

npm start
```

# trouble shooting

Cant resolve ipfs-car/blockstore/memory when importing nft.storage?

    -Go to node_modules/nft.storage directory.
    -Make sure you have ipfs-car/dist/esm/blockstore and ipfs-car/dist/esm/pack. If not, install ipfs-car with npm i ipfs-car. Copy ipfs-car/dist/esm to nft.storage/src.
    -Inside nft.storage/src, update the ipfs-car import statements in the following files like so:

-Inside platform.web.js, update to this: import { MemoryBlockStore } from 'ipfs-car/dist/esm/blockstore/memory'

-Inside lib.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'

-Inside token.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'

-This solved my problem.
