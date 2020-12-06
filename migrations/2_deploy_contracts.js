const Factory = artifacts.require('UniswapV2Factory.sol');
const Token = artifacts.require('Token.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async function (deployer, network, addresses)  {
    await deployer.deploy(Factory, addresses[0]);
    const factory = await Factory.deployed();

    if(network ==  'mainnet') {
        tokenAddress = '';
        token2Address = '';
    } else {
        await deployer.deploy(Token);
        await deployer.deploy(Token2);
        const token = await Token.deployed();
        const token2 = await Token2.deployed();
        tokenAddress = token.address;
        token2Address = token2.address;
    }
    await factory.createPair(tokenAddress, token2Address);
}