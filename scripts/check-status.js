const hre = require("hardhat");
async function main() {
  const path = require("path");
  const { address } = require(path.join(__dirname, "../client/src/contracts/ProjectRegistry.json"));
  const registry = await hre.ethers.getContractAt("ProjectRegistry", address);
  const total = Number(await registry.totalProjects());
  console.log("TOTAL_PROJECTS: " + total);
  for (let i = 1; i <= total; i++) {
    const p = await registry.projects(i);
    console.log(`\nPROYECTO #${i}:`);
    console.log(`  Titulo: ${p.title}`);
    console.log(`  Estado: ${p.status} (0=Pending, 1=Approved, 2=Rejected)`);
    console.log(`  Votos: ${p.votesFor} a favor / ${p.votesAgainst} en contra`);
    if (Number(p.votingDeadline) > 0) {
      const trib = await registry.getTribunal(i);
      console.log(`  Tribunal:`);
      for (const m of trib) {
        const v = await registry.hasVoted(i, m);
        console.log(`    - ${m}: ${v ? 'YA VOTO' : 'PENDIENTE'}`);
      }
    } else {
      console.log(`  Tribunal: NO ASIGNADO`);
    }
  }
}
main().catch(console.error);
