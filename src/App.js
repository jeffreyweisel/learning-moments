import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import { Register } from "./components/auth/Register"
import { Login} from "./components/auth/Login"


export const App = () => {
  return ( 
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    
    <Route 
    path="*"
    element={
      //check if the user is authorized, ApplicationViews is child of Authorized 
      <Authorized>
        <ApplicationViews />
      </Authorized>
    }
    
    />
    </Routes>
  
  )

}