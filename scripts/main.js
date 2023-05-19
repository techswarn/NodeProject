const url = `https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-0b0f94ea-326e-434f-a6db-e297bf02f150/dbaccess/getquery`
const url_1= `https://faas-blr1-8177d592.doserverless.co/api/v1/namespaces/fn-0b0f94ea-326e-434f-a6db-e297bf02f150/actions/dbaccess/getquery?blocking=true&result=true`

const apiReq = async (reqURL) => {
    console.log("-----1-----")
    let res = {}
    for(let i=0; i<=2; i++){
        
        setTimeout(() => {console.log("loop")},
        1000)
        res = await fetch(url)
    }
    const data = await res.json();
    console.log(data)
    console.log("-----2-----")
    

}

apiReq()

// , {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Basic ODgzMjRkMGUtOTU3Mi00NjRhLTk4YTgtZTExYTM4YmU3YTQ1Om5nWXk5MnplZzFGelZLT2Y3d2tWMkdNRjUxb0wwMk82OWFBcVUyN0xTSm9jTkVXeURpNnpicW9aejZyV01GMzI="
//       },
// }
