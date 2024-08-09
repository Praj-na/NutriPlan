import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    ingredients: [{ type: String, required: false}],
    cookingTime: {type: Number, required: true}, 
    cuisine: {type: String, required: true}, 
    recipeLink: { type: String, required: false}, 
    userOwner: {type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: false
    },
    imageUrl: { type: String, required: false},
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);