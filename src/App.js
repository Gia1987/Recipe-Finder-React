import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';

const API_KEY = 'aedbb2d845263a9cad4857bcec585195';

class App extends Component {
  state = {
    recipes: []
  }
  getRecipe = async(e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`);
    const data = await api_call.json();
    this.setState({recipes: data.recipes});
    console.log(this.state.recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        { this.state.recipes.map((recipe) => {
          return (
            <div key={recipe.recipe_id}>
              <img src={recipe.image_url} alt={recipe.title}/>
              <p>{recipe.title}</p>
            </div>
          )
        }) }
      </div>
    );
  }
}

export default App;
