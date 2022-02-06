import axios from 'axios'
exports.handler = function(event, context, callback) {
    const {zip='95624', cost=10000, page='1'} = event.queryStringParameters
    const key='MjQyMzUzODB8MTYzNTgxNjk4Ni44MDgxNDY1'
    const base='https://api.seatgeek.com/2'
    const URL=`${base}/events?highest_price.lte=${cost}&postal_code=${zip}&sort=datetime_local.asc&per_page=15&page=${page}&client_id=${key}`
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
            .then(res=>send(res.data.events.map((item)=>{
                return{
                    short_title: item.short_title,
                    name: item.venue.name,
                    performers: item.performers,
                    lowest_price: item.stats.lowest_price,
                    highest_price: item.stats.highest_price,
                    time_tbd: item.time_tbd,
                    datetime_local: item.datetime_local,
                    url: item.url
                }
            })))
            .catch(err=>send(err))
    }
    if (event.httpMethod  === 'GET'){
        getEvents()
    }

}

