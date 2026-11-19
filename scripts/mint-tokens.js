const hre = require("hardhat");
const path = require("path");

async function main() {
  const [admin] = await hre.ethers.getSigners();
  const { address } = require(path.join(__dirname, "../client/src/contracts/UPECToken.json"));
  const token = await hre.ethers.getContractAt("UPECToken", address);

  const targets = [
    { name: "Docente 3", addr: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65" },
    { name: "Docente 1", addr: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" },
    { name: "Docente 2", addr: "0x90F79bf6EB2c4f870365E785982E1f101E93b906" },
  ];

  const amount = hre.ethers.parseUnits("500", 18);

  for (const t of targets) {
    const tx = await token.connect(admin).mint(t.addr, amount);
    await tx.wait();
    const bal = await token.balanceOf(t.addr);
    console.log(`✅ Minteados 500 UPECT a ${t.name} (${t.addr}). Saldo actual: ${hre.ethers.formatUnits(bal, 18)} UPECT`);
  }
}

main().catch(console.error);
