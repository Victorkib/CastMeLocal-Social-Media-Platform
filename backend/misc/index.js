const register = async()=>{
    const user = {
        firstName:'Ethel',
        lastName:'Koech',
        phone:'0706499188',
        email:'koechethel@gmail.com',
        username:'ethel',
        location:'earth',
        dob:'jan',
        bio:'hey there',
        gender:'female',
        ethnicity:'African',
        password:'123'
    }
    const response = await fetch('http://localhost:6500/castmelocal/api/users/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify({user})
    })
    if(response.ok){
        const user = await response.json()
        console.log(user)
        return
    }
}
register()
const login = async()=>{
    const user = {
        email:'kiptoon457@gmail.com',
        password:'1234'
    }
    const response = await fetch('http://localhost:6500/castmelocal/api/users/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify({user})
    })
    if(response.ok){
        const user = await response.json()
        console.log(user)
        return
    }
    const error = await response.json()
    console.log(error)
}
//login()
const viewUser = async()=>{
    const user = {
        userId:'8263dd4a-7076-4f1f-9e8d-d96ac3798845'
    }
    const response = await fetch('http://localhost:6500/castmelocal/api/users/viewuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify({user})
    })
    if(response.ok){
        const userData = await response.json()
        const user = userData.user
        console.log(user)
        return
    }
    const error = await response.json()
    console.log(error)
}
//viewUser()
const viewUsers = async()=>{
    const user = {
        userId:'8263dd4a-7076-4f1f-9e8d-d96ac3798845'
    }
    const response = await fetch('http://localhost:6500/castmelocal/api/users/getallusers')
    if(response.ok){
        const usersData = await response.json()
        const users = usersData.users
        console.log(users)
        return
    }
    const error = await response.json()
    console.log(error)
}
viewUsers()
const deleteUser = async()=>{
    const user = {
        userId:'8263dd4a-7076-4f1f-9e8d-d96ac3798845'
    }
    const response = await fetch('http://localhost:6500/castmelocal/api/users/deleteuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify({user})
    })
    if(response.ok){
        const userData = await response.json()
        console.log(userData)
        return
    }
    const error = await response.json()
    console.log(error)
}
//deleteUser()


