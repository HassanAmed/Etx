require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
    networks:{
    ropsten: {
        provider: () => new HDWalletProvider('equip impact faith private outdoor vote picnic panda goddess bicycle city napkin', `https://ropsten.infura.io/v3/854276ba0de6437b9a3d7d0c871c4a76`),
        network_id: 3,       // Ropsten's id
        gasPrice: 5500000,        // Ropsten has a lower block limit than mainnet
      },
    //   development: {
    //     host: "127.0.0.1",     // Localhost (default: none)
    //     port: 8545,            // Standard Ethereum port (default: none)
    //     network_id: "*",       // Any network (default: none)
    //    }
    // },
        solc:{
            optimizer: {
                enabled: true,
                runs: 200
              },
        }

}