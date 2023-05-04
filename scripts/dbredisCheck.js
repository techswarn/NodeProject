const {createClient} = require('redis');

const checkRedis = async () => {
    console.log("redis test")

    // (async () => {
    //     await redisclient.connect();
    // })();
    const client = await redis.createClient({
        socket: {
            host: 'db-redis-blr1-95522-do-user-11648032-0.b.db.ondigitalocean.com',
            port: '25061'
        },
        username: 'default',
        password: 'AVNS_4wCbQZV7k6pJVOZUKsB'
    });
    await client.connect();
    client.on('ready', () => {
        console.log("Connected!");
    });

    client.on('error', err => console.log('Redis Server Error', err));
    // try {
    //     
    //     console.log('Connected')
    // }catch(err){
    //     console.log(`Error while client.connect : ${err}`)
    // }
    // await client.set('foo', 'bar');
    // const res = await client.get('foo');
    // console.log(res)
}

checkRedis()