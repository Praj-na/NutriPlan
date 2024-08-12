import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    const userID = window.localStorage.getItem('userID'); // Assuming the token is stored in localStorage
    if (userID) {
      setUserID(userID); // Assuming the token contains `userId` field
    }
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", 
        recipeID, 
        userID
      );
      console.log(response);
    } catch (err) {
      console.log(err)
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='recipes-container'>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <a href={recipe.recipeLink} target='_blank'>
              <div className="recipe-card" key={recipe.id}>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <div className="recipe-info">
                  <h2>{recipe.name}</h2>
                </div>
              </div>
            </a>
          </div>
        ))
      ) : (
        <p>No recipes available</p>
      )}
    </div>
  );
}

export default Home
