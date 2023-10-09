import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../posts/AllPosts"
import { NavBar } from "../nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../posts/PostDetails"
import { Welcome } from "../welcome/Welcome"





export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localHoneyUser = localStorage.getItem("learning_user")
        const honeyUserObject = JSON.parse(localHoneyUser)

        setCurrentUser(honeyUserObject)
    }, [])


    return <>

        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />

                    <Outlet />
                </>
            }
            >

                <Route index element={<Welcome />} />



                <Route path="allposts">
                    <Route index element={<PostList currentUser={currentUser} />} />
                    <Route path=":postId" element={< PostDetails />} />
                </Route>
      
                <Route path="profile" element={"this doesnt do anything yet "}/>
                <Route path="newpost" element={"this doesnt do anything yet "}/>
                <Route path="favorites" element={"this doesnt do anything yet "}/>
                <Route path="myposts" element={"this doesnt do anything yet "}/>
            </Route>
        </Routes>
    </>
}