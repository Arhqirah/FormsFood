import { getRecipes } from "./data.js";

async function fetchAndLogRecipes() {
    const response = await getRecipes();
    console.log(response);
}

fetchAndLogRecipes();