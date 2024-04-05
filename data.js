 const apikey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcnJkemF1b2xtcnBobGd2YW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTAwMjYsImV4cCI6MjAyNjMyNjAyNn0.1MWeRMtYVmyE3ZQQggcXWSuHteE8vwkqy0AQSsspHQk"
 const endpoint ="https://barrdzauolmrphlgvamx.supabase.co/rest/v1/recipes"


 /*********************** Get  ****************/

 document.getElementById('recipeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const recipe = {
        name: formData.get('name'),
        description: formData.get('description'),
        origin: formData.get('origin'),
        ingredients: formData.get('ingredients').split(',').map(ingredient => ingredient.trim()),
        serves: parseInt(formData.get('serves'), 10),
        allergens: formData.get('allergens').split(',').map(allergen => allergen.trim()),
        diet: formData.get('diet'),
        prep: parseInt(formData.get('prep'), 10),
        cook: parseInt(formData.get('cook'), 10),
        studentFriendly: document.getElementById('studentFriendly').checked,
        image: formData.get('image')
    };

    await createRecipe(recipe);
    await displayRecipes();
});

export async function getRecipes() {
    let headersList = {
        "Accept": "application/json",
        "apikey": apikey
    };
       
    let response = await fetch(endpoint, { 
        method: "GET",
        headers: headersList
    });
       
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        console.error('Failed to fetch recipes:', response.statusText);
        return [];
    }
}
window.onload = displayRecipes;


/*********************** Display  ****************/


export async function displayRecipes() {
    const recipes = await getRecipes();
    const recipesContainer = document.getElementById('recipesDisplay');
    recipesContainer.innerHTML = '<h2>Added Recipes</h2>';
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe';
        const imageUrl = recipe.image || "Images/FoodGeneral.jpg";
        card.innerHTML = `<details>
        <summary>
        <h3>${recipe.name}</h3>
        <div class="image-container">
            <img src="${imageUrl}" alt="Recipe Image">
        </div>
    </summary>
    <div class="image-wrapper"><img src="${imageUrl}" class="recipeImage" alt="Recipe Image"></div>
    <h3>${recipe.name}</h3>
            <p><span class="label">Description:</span> ${recipe.description}</p>
            <p><span class="label">Origin:</span> ${recipe.origin}</p>
            <p><span class="label">Ingredients:</span> ${Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : 'Not specified'}</p>
            <p><span class="label">Serves:</span> ${recipe.serves}</p>
            <p><span class="label">Allergens:</span> ${Array.isArray(recipe.allergens) ? recipe.allergens.join(', ') : 'None'}</p>
            <p><span class="label">Diet:</span> ${recipe.diet}</p>
            <p><span class="label">Preparation Time:</span> ${recipe.prep} minutes</p>
            <p><span class="label">Cooking Time:</span> ${recipe.cook} minutes</p>
            <p><span class="label">Student Friendly:</span> ${recipe.studentFriendly ? 'Yes' : 'No'}</p>
            <p><span class="label">NR:</span> ${recipe.id}</p>
            </details>
        `;
        recipesContainer.appendChild(card);
    });
}

    document.querySelectorAll('.editRecipeBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const recipeId = event.target.getAttribute('data-id');
            editRecipeForm(recipeId);
        });
    });

document.getElementById('recipeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    await createRecipe(recipe);

    await displayRecipes();
});

//WET - write everything twice
//DRY - Don't Repeat yourself
//AHA - Avoid Hasty Abstraction


/*********************** Create  ****************/

export async function createRecipe(recipe) {
    let headersList = {
        "apikey": apikey, 
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify(recipe);
   
    let response = await fetch(endpoint, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
   
    let data = await response.text();
    console.log(data);
}



/*********************** Edit  ****************/


export async function editRecipe() {
  let headersList = {
    apikey:apikey,
    "Prefer": "return=representation",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify(
     {
       "name": "Tika Masala"
     }
   );
   
   let response = await fetch(endpoint, { 
     method: "PATCH",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.json();
   console.log(data);
}


/*********************** Remove  ****************/

export async function removeRecipe(recipeId){
    let headersList = {
        "Accept": "application/json",
        "apikey": apikey,
        "Content-Type": "application/json"
    };
    
    let response = await fetch(`${endpoint}?id=eq.${recipeId}`, { 
        method: "DELETE",
        headers: headersList
    });
    
    if (response.ok) {
        console.log("Recipe removed successfully");
    } else {
        console.error('Failed to remove recipe:', response.statusText);
    }
}
document.getElementById('removeRecipeBtn').addEventListener('click', async function() {
    const recipeId = document.getElementById('removeRecipeId').value;
    if (recipeId) {
        await removeRecipe(recipeId);
        await displayRecipes();
    } else {
        alert("Please enter a valid recipe ID");
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const formContainerHeight = document.querySelector('.container').offsetHeight;
    const recipesDisplayContainer = document.getElementById('recipesDisplay');
    recipesDisplayContainer.style.maxHeight = `${formContainerHeight}px`;
});

