import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../posts/AllPosts"
import { NavBar } from "../nav/NavBar"
import { useEffect, useState } from "react"
import { PostDetails } from "../posts/PostDetails"
import { Welcome } from "../welcome/Welcome"
import { NewPostForm } from "../forms/NewPostForm"
import { MyPosts } from "../posts/MyPosts"
import { PostEditForm } from "../forms/PostEditForm"
import { FavoritePosts } from "../posts/FavoritePosts"
import { ProfileEditForm } from "../forms/ProfileEditForm"
import { UserDetails } from "../users/UserDetails"






export const ApplicationViews = ({postObj}) => {

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
                     <Route path="edit/:postId" element={<PostEditForm currentUser={currentUser} post={postObj} />} />
                   
                </Route>
      
                <Route path="profile">
                  <Route index element={<UserDetails currentUser={currentUser}/>}/>
                  <Route path=":userId" element={< ProfileEditForm />} />
                    </Route>
                <Route path="newpost" element={< NewPostForm currentUser={currentUser} />}/>
                <Route path="favorites" element={<FavoritePosts currentUser={currentUser} />}/>
                
                <Route path="myposts">
                     <Route index element={< MyPosts currentUser={currentUser}/>} />
            </Route>
       </Route>
        </Routes>

    </>
}