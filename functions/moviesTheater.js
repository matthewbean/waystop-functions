import axios from 'axios'
exports.handler = function(event, context, callback) {
    const {page='1'} = event.queryStringParameters
    const key='e5b34ae336b887c79c81529076f0d0e2'
    const base='https://api.themoviedb.org/3/movie/now_playing'
    const imageBase='https://image.tmdb.org/t/p/w500'
    const URL=`${base}?api_key=${key}&language=en-US&page=1`

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
            .then(res=>send(res.data.results.map((item)=>{
                return{
                    title: item.title,
                    overview: item.overview,
                    image: imageBase+item.poster_path,
                    release_date: item.release_date,
                    rating: item.vote_average,
                    id: item.id
                }
            })))
            .catch(err=>send(err))
    }
    if (event.httpMethod  === 'GET'){
        getEvents()
    }

}

