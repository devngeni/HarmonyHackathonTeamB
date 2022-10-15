# solving issues:

```shell
npm install --force
```

# trouble shooting
Cant resolve ipfs-car/blockstore/memory when importing nft.storage?<br/>

    -Go to node_modules/nft.storage directory.<br/>
    -Make sure you have ipfs-car/dist/esm/blockstore and ipfs-car/dist/esm/pack.<br/> If not, install ipfs-car with npm i ipfs-car. Copy ipfs-car/dist/esm to nft.storage/src.<br/>
    -Inside nft.storage/src, update the ipfs-car import statements in the following files like so:<br/>

-Inside platform.web.js, update to this: import { MemoryBlockStore } from 'ipfs-car/dist/esm/blockstore/memory'<br/>

-Inside lib.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'<br/>

-Inside token.js, update to this: import { pack } from 'ipfs-car/dist/esm/pack'<br/>

-This solved my problem.
 
