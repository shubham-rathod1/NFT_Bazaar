require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/a44ba5a185844cd8b2a0d799c5e773c9',
      accounts: [
        'cc45764f7d63cfec1a9f1df7aef96e61492253575ede450e3458f3890ab5fb13'
        
      ],
    },
  },
  paths: {
    artifacts: './src/backend/artifacts',
    sources: './src/backend/contracts',
    cache: './src/backend/cache',
    tests: './src/backend/test',
  },
};
//'0e48ab07ef90dec14498607fc16dedb2252e1ddb146c03be5c24c94d242a9f9d',