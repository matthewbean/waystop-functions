import axios from 'axios'
exports.handler = function(event, context, callback) {
    const { id } = event.queryStringParameters
    const key='e5b34ae336b887c79c81529076f0d0e2'
    const base=`https://api.themoviedb.org/3/movie/${id}/watch/providers`
    const imageBase='https://image.tmdb.org/t/p/w500'
    const URL=`${base}?api_key=${key}`

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
            .then(res=>send(res.data.results.US.flatrate))
            .catch(err=>send(err))
    }
    if (event.httpMethod  === 'GET'){
        getEvents()
    }

}

