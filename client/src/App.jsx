import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import './App.css'

function App() {
  const [items, setItems] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemQuantity, setItemQuantity] = useState()
  const [updateId, setUpdatedId] = useState(0)
  const [editBool, setEditBool] = useState(false)
  const [addBool, setAddBool] = useState(false)
  const [newUserBool, setNewUserBool] = useState(false)
  const [loginBool, setLoginBool] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [displayedUser, setDisplayedUser] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState(0)
  const [itemDisplayMode, setItemDisplayMode]  = useState('all')
  const[isInventoryManager, setIsInventoryManager] = useState(false)
  const[selectedId, setSelectedId] = useState(0)
  const [exitButton, setExitButton] = useState(<p><IconButton id= 'exit' onClick={()=>{setAddBool(false), setEditBool(false), setLoginBool(false), setNewUserBool(false)}}><ClearIcon/></IconButton></p>)


  const delItem = async (id) =>{
    try{
      const response = await fetch(`http://localhost:8081/items/${id}`, {
        method: 'DELETE',
      })
      setItemDisplayMode('my')
    }catch(err){
      console.log(err)
    }
  }

  const addItem = async ()=>{
    try{
      const response = await fetch('http://localhost:8081/items/', {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          Item_Name: itemName,
          Description: itemDescription,
          Quantity: itemQuantity,
        }),
      })
      setAddBool(false)
      setEditBool(false)
      setItemDisplayMode('my')
    }catch(err){
      console.log(err)
    }
  }


  const updateItem = async (id)=>{
    try{
      const response = await fetch(`http://localhost:8081/items/${id}`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Item_Name: itemName,
          Description: itemDescription,
          Quantity: itemQuantity,
        }),
      })
      setEditBool(false)
      setAddBool(false)
    }catch(err){
      console.log(err)
    }
  }

  const displayOne = async (id) =>{
    try{
      const response = await fetch(`http://localhost:8081/items/${id}`)
        .then(res => res.json())
        .then(data => {setSelectedId(data[0].id)})
    }catch(err){
      console.log(err)
    }
  }

    //currently lacks input validation for duplicate accounts
    const addUser = async ()=>{
      try{
        const response = await fetch('http://localhost:8081/users/', {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            First_Name: firstName,
            Last_Name: lastName,
            Username: username,
            Password: password,
          }),
        })
        setNewUserBool(false);
        setUsername('')
        setPassword('')
      }catch(err){
        console.log(err)
      }
    }

    const logInUser = async ()=>{
      try{
        const response = await fetch('http://localhost:8081/login/', {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
          }),
        })
        .then(res => res.json())
        .then(data => setUserId(data[0].id))
        setLoginBool(false);
        setItemDisplayMode('my')
        setIsInventoryManager('true')
        setDisplayedUser(username)
        setUsername('')
        setPassword('')
      }catch(err){
        console.log(err)
      }
    }
  
  useEffect(() =>{
    fetch('http://localhost:8081/items')
    .then(res => res.json())
    .then(allItems =>{

      let itemList = [];

      itemDisplayMode === 'all'? 
      (allItems.map((element)=>{
        if((element.id === selectedId) || (selectedId === 0)){
        itemList.push(
        <div className='item-card' key = {element.id} >
          <div>
            <p>{(userId === element.UserId) && <IconButton onClick={()=>{delItem(element.id)}}><DeleteForeverIcon/></IconButton>}
            {(userId === element.UserId) && <IconButton onClick={()=>{setUpdatedId(element.id), setEditBool(true), setItemName(element.Item_Name), setItemDisplayMode('all'), setItemDescription(element.Description), setItemQuantity(element.Quantity)}}><EditIcon/></IconButton>}
            </p>
          </div>
          <div onClick={() => displayOne(element.id)}>              
            <p>Item Name: {element.Item_Name}</p>             
            <p>Description: {((element.Description.length > 100) && (selectedId === 0))? `${element.Description.substring(0,99)}...`: element.Description}</p>
            <p>Quantity: {element.Quantity}</p>
          </div>
        </div>)
    }})):
      (allItems.map((element)=>{
        if(userId === element.UserId)
        {
          if((element.id === selectedId) || (selectedId === 0)){
          itemList.push(
          <div className='item-card' key = {element.id}>
            <div>
              <p><IconButton onClick={()=>{delItem(element.id)}}><DeleteForeverIcon/></IconButton>
                {(userId === element.UserId) && <IconButton onClick={()=>{setUpdatedId(element.id), setEditBool(true), setItemName(element.Item_Name), setItemDescription(element.Description), setItemQuantity(element.Quantity)}}><EditIcon/></IconButton>}
              </p>
            </div>
            <div onClick={() => displayOne(element.id)}>
              <p>Item Name: {element.Item_Name}</p> 
              <p>Description: {((element.Description.length > 100) && (selectedId === 0))? `${element.Description.substring(0,99)}...`: element.Description}</p>
              <p>Quantity: {element.Quantity}</p>
            </div>
          </div>)
        }}
      }))
    
      setItems(itemList)
    })
  }, [delItem, itemDisplayMode])

  return (
    <>
      {/* main menu buttons  */}
      <div className = 'header'>
        <h1>Items</h1>
        {(userId === 0)? <p><Button variant="outlined" startIcon={<PersonAddIcon/>} onClick={() =>{setNewUserBool(true), setFirstName('')}}>Create Account</Button> <Button variant="outlined" startIcon={<PersonIcon/>} onClick={() =>setLoginBool(true)}>Log In</Button></p> 
                       : <p><Button variant="outlined" startIcon={<PersonIcon/>} onClick={() =>{setUserId(0), setItemDisplayMode('all'), setIsInventoryManager(false), setDisplayedUser('')}}>Log Out</Button> Currently Signed in as {displayedUser}</p>}
        <p><Button variant="outlined" color={itemDisplayMode === 'all'? (selectedId === 0? 'success':'primary' ): ('primary')} onClick={() =>{setItemDisplayMode('all'), setSelectedId(0)}}>All Items</Button> 
        {isInventoryManager && <Button variant="outlined" color={itemDisplayMode === 'all'? 'primary' : 'success'} onClick={() =>{setItemDisplayMode('my'), setSelectedId(0)}}>My Items</Button>}</p>
        {isInventoryManager && <p><Button variant="outlined" onClick={() =>{setAddBool(true), setItemName(''), setItemDescription(''), setItemQuantity(''), setEditBool(false)}} startIcon={<AddIcon/>}>Add New Item</Button></p>}
        {items}
      </div>

      {/* new user form  */}
      {(newUserBool)&& 
        <div>
          <div className='background-div'></div>
          <div className = "add-edit-item-card">
          {exitButton}
            <div>First Name:  <input type='text' id='first-name' onChange={e => setFirstName(e.target.value)}/></div>
            <div>Last Name: <input type='text' id='last-name' onChange={e => setLastName(e.target.value)}/></div>
            <div>Username: <input type='text' id='username' onChange={e => setUsername(e.target.value)}/></div>
            <div>Password: <input type='text' id='password' onChange={e => setPassword(e.target.value)}/></div>
            <Button id='submit-button' variant="outlined" onClick={() =>{addUser()}}>Create Account</Button>
          </div>
        </div>}

      {/* login form  */}
      {(loginBool)&& 
      <div>
      <div className='background-div'></div>
        <div className = "add-edit-item-card">
          {exitButton}
          <div>Username: <input type='text' className='login-field' onChange={e => setUsername(e.target.value)}/></div>
          <div>Password: <input type='text' className='login-field' onChange={e => setPassword(e.target.value)}/></div>
          <Button id='submit-button' variant="outlined" onClick={() =>{logInUser()}}>Log in</Button>
        </div>

      </div>}

      {/* edit / add item form  */}
      {(editBool || addBool)&& 
      <div>
      <div className='background-div'></div>
        <div className = "add-edit-item-card">
          {exitButton}
          <div>Item Name:  <input type='text' id='item-name' defaultValue={itemName} onChange={e => setItemName(e.target.value)}/></div>
          <div>Description: <input type='text' id='item-description' defaultValue={itemDescription} onChange={e => setItemDescription(e.target.value)}/></div>
          <div>Quantity:   <input type='integer' id='item-quantity' defaultValue={itemQuantity} onChange={e => setItemQuantity(e.target.value)}/></div>
          <Button id='submit-button' variant="outlined" onClick={() =>{editBool? updateItem(updateId): addItem()}}>{editBool? 'Update Item':'Add Item'}</Button>
        </div>
      </div>}
    </>
  )
}

export default App
