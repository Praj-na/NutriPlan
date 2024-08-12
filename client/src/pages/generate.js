import axios from 'axios';
import { useState } from 'react';
import './generate.css'

export const Generate = () => {
    const [ingredients, setIngredients] = useState("");
    const [time, setTime] = useState(0);
    const [cuisine, setCuisine] = useState("");
    const [number, setNumber] = useState(0);
    const [recipeData, setRecipeData] = useState(null);

    const parseRecipe = (data) => {
        const sections = data.split('\n\n');

        // Extract title (first section), ingredients (second section), and instructions (rest)
        const title = sections[0].replace('Recipe Idea: ', '');
        const ingredientsSection = sections[1].replace('Ingredients:', '');
        const ingredients = ingredientsSection.split('\n').filter(ingredient => ingredient.trim() !== '');
        const instructions = sections.slice(2).map((section, index) => section.replace(`${index + 1}. `, ''));

        return { title, ingredients, instructions };
    };

    const requestRecipe = async (event) => {

        event.preventDefault();

        const options = {
            method: 'POST',
            url: 'https://open-ai21.p.rapidapi.com/qa',
            headers: {
              'x-rapidapi-key': '2414475562msh03866f7322399abp173aa9jsnea3c5f5941de',
              'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {
              question: 'Give me one recipe idea. I have these ' + ingredients + "ingrdients and would like to be done in" + time + "minutes. I also would like recipes in this " + cuisine + "cuisine and for " + number + "people.",
              context: 'Recipes include ingredients, instructions and length of time to make the recipe. Give as many details as possible.'
            }
          };

        try {
            const response = await axios.request(options);
            console.log("reached here");
            console.log(response.data);
            setRecipeData(parseRecipe(response.data.result));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container'>
            <h2>Welcome to the AI Recipe Generator!</h2>
    <p>
        Craving something delicious but not sure what to make? Our AI-powered recipe generator is here to help! 
        Simply enter the ingredients you have on hand, how much time you have, and your preferred cuisine, 
        and we'll suggest a personalized recipe just for you. Perfect for busy weeknights, special occasions, 
        or when you're feeling adventurous in the kitchen.
    </p>
            <form onSubmit={requestRecipe}>
                <label>Ingredients</label>
                <input type="text" id="ingredients" onChange={(event) => setIngredients(event.target.value)}/>

                <label>Time(mins)</label>
                <input type="number" id="time" onChange={(event) => setTime(event.target.value)}/>

                <label>Cuisine</label>
                <input type="text" id="cuisine" onChange={(event) => setCuisine(event.target.value)}/>

                <label>How many people are you cooking for?</label>
                <input type="number" id="number" onChange={(event) => setNumber(event.target.value)}></input>


                <button type="submit">Generate A Recipe</button>
            </form>

            {recipeData && (
                <div className="recipe-container">
                <h1>{recipeData.title}</h1>
                <h2>Ingredients</h2>
                <ul>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h2>Instructions</h2>
                <ol>
                    {recipeData.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
            )}
        </div>
    )
}