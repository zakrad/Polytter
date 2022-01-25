async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Updating contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const address = '0xb32eaf2e69a6e27bfa47e834926d5b5188f74263';
    const Decentradit = await ethers.getContractFactory("Decentradit");
    const decentradit = await Decentradit.attach(address);

    console.log("Decentradit address:", decentradit.address);

    await decentradit.addCategory("Meme");
    console.log("updated")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
