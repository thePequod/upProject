import { getTransactions } from "./index.js"

async function main() {
    const id = await getTransactions();
    console.log(id);
}

main();