import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'


import React from 'react'


function Recipe() {


    //create a state for the recipe with use effect
    const [recipe, setRecipe] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    //to retireve the recipe id from the URL
    let params = useParams();

    //make an API call funtion
    const getRecipe = async(id) =>{
        //make API call "fetch" for recipe and store in " data" use await
       const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
       )
       //console.log(data)
       //Store Data as a json object. Use await
       const recipeData = await data.json()
       console.log(recipeData)

       //set recipe state with the data from the API
       setRecipe(recipeData)
    }
    //'useEffect" to call getRecipe when component is loaded. Runs after the first render 
    useEffect(()=>{
        getRecipe(params.id);

    },[params.id])

    console.log(recipe.extendedIngredients)
  return (
    <DetailWrapper>
        <div>
            <h2> {recipe.title}</h2>
            <img src={recipe.image} alt =""/> 
        </div>
        <Info>
            <Button 
            className= { activeTab === 'instructions' ? 'active' : ''} 
            onClick={() => setActiveTab('instructions')}>
                Instructions
            </Button>
            <Button 
            className= { activeTab === 'ingredients' ? 'active' : ''} 
            onClick={() => setActiveTab('ingredients')}>
                Ingredients
            </Button>
        {activeTab === 'instructions' && (
        <div>
        <h3 dangerouslySetInnerHTML={{__html:recipe.summary}}></h3>
        <h3 dangerouslySetInnerHTML={{__html:recipe.instructions}}></h3>
        </div>
        )}
        
        {activeTab === 'ingredients' && (
        <ul> 
            {recipe.extendedIngredients?.map((ingredient) => {
                return(
                    <li key={ingredient.id}>{ingredient.original}</li>
                    )
                })}
        </ul>
        )}
        </Info>

    </DetailWrapper>
  )
}
 
const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    .active{
        background: linear-gradient(35deg, #494949,  #313131 );
        color: white
    }

    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size:1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    };
`
const Button = styled.button`
    padding: 1rem;
    color: #313131;
    background: white;
    margin-right: 2rem;
    font-weight: 600;
`

const Info = styled.div`
    margin-left: 10rem;
`
export default Recipe