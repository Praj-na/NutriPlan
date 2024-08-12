import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './savedRecipes.css';

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedRecipes = async () => {
    try {
      const userID = localStorage.getItem('userID');
      if (userID) {
        const response = await axios.get(`http://localhost:3001/recipes/saved/${userID}`);
        setSavedRecipes(response.data);
        console.log(savedRecipes);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='saved-recipes-container'>
      {savedRecipes.length > 0 ? (
        savedRecipes.map((recipe) => (
          <a href={recipe.recipeLink} target='_blank' rel="noopener noreferrer" key={recipe._id}>
            <div className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.name} />
              <div className="recipe-info">
                <h2>{recipe.name}</h2>
              </div>
            </div>
          </a>
        ))
      ) : (
        <p>No saved recipes available</p>
      )}
    </div>
  );
};

export default SavedRecipes;
