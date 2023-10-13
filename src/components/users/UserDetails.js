import { useEffect, useState } from "react"
import { getUserById } from "../../services/userServices"
import { useParams } from "react-router-dom"

export const UserDetails = () => {

    const [user, setUser] = useState({})

    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId).then((user) => {
            console.log(userId)
            setUser(user)
        })
    }, [userId])

    return <div className="posts">
        <header className="posts-info post-body post-header"> {user?.name}</header>
        <div className="posts-info post-body">
            <span> Email </span>
            {user?.email}
        </div>
        <div className="posts-info post-body">
            <span> Cohort #: </span>
            {user?.cohort}
        </div>
        
        
    </div>
}