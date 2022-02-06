import axios from 'axios'
exports.handler = function(event, context, callback) {
    const {category='chicken'} = event.queryStringParameters
    const key='1'
    const base='https://www.themealdb.com/api/json/v1'
    const URL=`${base}/${key}/filter.php?c=${category}`

    const getRandom=(arr, n) =>{
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

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
                if (res.data.meals.length>10){
                    return getRandom(res.data.meals, 10)
                } else {
                    return res.data.meals
                }
            })
            .then(res=>

                send(res.map((item)=>{
                    return{
                        title: item.strMeal,
                        image: item.strMealThumb,
                        id: item.idMeal
                    }
                })))
            .catch(err=>{
                send(err)})
    }
    if (event.httpMethod  === 'GET'){
        getEvents()
    }

}

