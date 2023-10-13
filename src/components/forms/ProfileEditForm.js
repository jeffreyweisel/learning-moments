import { useEffect, useState } from "react"
import { getAllUsers, getUserById, updateUser } from "../../services/userServices"
import { useNavigate} from "react-router-dom"

export const ProfileEditForm = ({currentUser}) => {

    const [user, setUser] = useState({})
    
    const navigate = useNavigate()
    

    useEffect(() => {
        getAllUsers(currentUser.id).then((data) => {
            const userObj = data[0]
            setUser(userObj)
        })
    }, [currentUser])


    const handleSave = (event) => {
        event.preventDefault()
        console.log('Clicked')

        const editedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            cohort: user.cohort
            
        }

        updateUser(editedUser).then(() => {
            navigate(`/`)
        })
    }

    const handleInputChange = (event) => {
        const stateCopy = { ...user }
        stateCopy[event.target.name] = event.target.value
        setUser(stateCopy)
      }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="text"
                        value={user.email ? user.email : ''}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="email" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Cohort #: </label>
                    <input type="number"
                        value={user.cohort ? user.cohort : 0}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="cohort" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-primary"
                        onClick={handleSave}>

                        Save Profile
                    </button>
                </div>
            </fieldset>
        </form>
    )
}