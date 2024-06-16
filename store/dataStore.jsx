"use client"
const { createContext, useReducer } = require("react");

export const UserData = createContext({
  data: {},
  updateData: () => {}
})

const dataReducer=(currData, action)=>{
  let updatedData = currData
  if (action.type=="UPDATE"){
    updatedData = Object.assign(currData, action.payload.newData)
  }
  return updatedData
}

const UserDataProvider = ({ children }) => {

  const [ data, dispatch ] = useReducer(dataReducer, {name:'', email:'', username:'', password:'', description:'', profilePic:'', coverPic:'', paymentSecret:'', createdAt:'', updatedAt:'', paymentId:'', paymentSecret:''})

  const updateData = (newData) => {
      dispatch({type:"UPDATE",
        payload:{
          newData
        }
      })
  }

  return <UserData.Provider value={
    {
      data:data,
      updateData
    }
  }>{children}</UserData.Provider>
}
export default UserDataProvider;