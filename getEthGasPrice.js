const { ethers } = require("ethers");
const axios = require("axios");

// 使用本地或远程以太坊节点的URL
const localNodeUrl = "http://localhost:8545"; // 假设你的本地节点在8545端口
const provider = new ethers.providers.JsonRpcProvider(localNodeUrl);

async function getGasPriceFromNode() {
    try {
        const gasPrice = await provider.getGasPrice();
        console.log(`当前的Gas价格（来自以太坊节点）: ${ethers.utils.formatUnits(gasPrice, 'gwei')} Gwei`);
    } catch (error) {
        console.error("无法从以太坊节点获取Gas价格:", error);
    }
}

async function getGasPriceFromEtherscan() {
    const etherscanApiKey = "YOUR_ETHERSCAN_API_KEY";
    const etherscanUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanApiKey}`;

    try {
        const response = await axios.get(etherscanUrl);
        const data = response.data;

        if (data.status === "1") {
            const safeGasPrice = data.result.SafeGasPrice;
            const proposeGasPrice = data.result.ProposeGasPrice;
            const fastGasPrice = data.result.FastGasPrice;

            console.log(`安全的Gas价格（来自Etherscan API）: ${safeGasPrice} Gwei`);
            console.log(`建议的Gas价格（来自Etherscan API）: ${proposeGasPrice} Gwei`);
            console.log(`快速的Gas价格（来自Etherscan API）: ${fastGasPrice} Gwei`);
        } else {
            console.error("无法从Etherscan API获取Gas价格");
        }
    } catch (error) {
        console.error("无法从Etherscan API获取Gas价格:", error);
    }
}

// 获取Gas价格
getGasPriceFromNode();
getGasPriceFromEtherscan();
