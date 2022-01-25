async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Decentradit = await ethers.getContractFactory("Decentradit");
    const decentradit = await Decentradit.deploy();

    console.log("Decentradit address:", decentradit.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
