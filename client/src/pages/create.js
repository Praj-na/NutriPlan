import { useState, useEffect } from "react"
import axios from "axios";
import './create.css'

export const CreateRecipe = () =>{
    const [name, setName] = useState("");
    const [cookingTime, setCookingTime] = useState(0); 
    const [cuisine, setCuisine] = useState("");
    const [recipeLink, setRecipeLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [userOwner, setuserOwner] = useState(0);
    const [ingredients, setIngredients] = useState(['']); 

  useEffect(() => {
    const userOwner = window.localStorage.getItem('userID'); // Assuming the token is stored in localStorage
    if (userOwner) {
      setuserOwner(userOwner); // Assuming the token contains `userId` field
    }
  }, []);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']); // Add a new empty ingredient field
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

    const CreateRecipe = async () => {
        try {
            const response = await axios.post("http://localhost:3001/recipes", {
                name, 
                cookingTime, 
                cuisine, 
                recipeLink, 
                imageUrl,
                ingredients, 
                userOwner
            });
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={CreateRecipe} className="recipe-form">
      <h2>Create A Recipe</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" value={name} type="text" onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="cookingTime">Cooking Time (Mins)</label>
        <input id="cookingTime" value={cookingTime} type="number" onChange={(event) => setCookingTime(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="cuisine">Cuisine</label>
        <input id="cuisine" value={cuisine} type="text" onChange={(event) => setCuisine(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="recipeLink">Recipe Link</label>
        <input id="recipeLink" value={recipeLink} type="text" onChange={(event) => setRecipeLink(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" value={imageUrl} type="text" onChange={(event) => setImageUrl(event.target.value)} />
      </div>
      <div className="form-group">
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder={`Ingredient ${index + 1}`}
            />
            <button type="button" className="remove-btn" onClick={() => handleRemoveIngredient(index)}>Remove</button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      <button type="submit" className="submit-btn">Create A Recipe</button>
    </form>
  );
};