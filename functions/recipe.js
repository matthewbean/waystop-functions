import axios from 'axios'
exports.handler = function(event, context, callback) {
    const {id='52771'} = event.queryStringParameters
    const key='1'
    const base='https://www.themealdb.com/api/json/v1'
    const URL=`${base}/${key}/lookup.php?i=${id}`


    const send = body =>{
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept' 
            },
            body: JSON.stringify(body)
        })
    }
    const getEvents=()=>{
        axios.get(URL)
            .then(res=>{
                let object={
                    ingredients: [],
                    amounts: []
                }
                for(const property in res.data.meals[0]){
                    if (res.data.meals[0][property]==='' ||res.data.meals[0][property] === null){
                    }
                    else if (/strIngredient/.test(property)){
                        object.ingredients.push(res.data.meals[0][property])
                    } else if (/strMeasure/.test(property)){
                        object.amounts.push(res.data.meals[0][property])
                    } else {
                        object[property]=res.data.meals[0][property]
                    }

                }
                return object
            })
            .then(res=>
                {
                    send(
                    {
                        ingredients: res.ingredients,
                        amounts: res.amounts,
                        title: res.strMeal,
                        instructions: res.strInstructions.split('\r\n'),
                        image: res.strMealThumb,
                        YouTube: res.strYoutube,
                        source: res.strSource
                    }
                )}
                )
            .catch(err=>{
                console.log(err)
                send(err)})
    }
    if (event.httpMethod  === 'GET'){
        getEvents()
    }

}

