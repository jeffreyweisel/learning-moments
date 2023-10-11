import { useState, useEffect } from "react"
import { addNewPost, getAllTopics } from "../../services/postServices"
import "./Forms.css"
import { useNavigate } from "react-router-dom"

export const NewPostForm = ({ currentUser }) => {

    const navigate = useNavigate()

    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')

    const [newPost, setNewPost] = useState({
        title: '',
        body: '',
        date: new Date(),
        userId: currentUser.id,
        topicId: 0
    })


    useEffect(() => {
        // Fetch all topics
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })

    }, [])


    const handleInputChange = (event) => {
        const stateCopy = { ...newPost }
        stateCopy[event.target.name] = event.target.value
        setNewPost(stateCopy)

    }

    const handleSave = (event) => {
        event.preventDefault()
        console.log('Clicked')

        addNewPost(newPost).then(() => {
            navigate(`/myposts`)
        })

    }

    // Update topicId in newPost when the user selects a topic
    useEffect(() => {
        setNewPost({
            ...newPost,
            topicId: parseInt(selectedTopic)      //spread operator to change topicId on onChange 
        })
    }, [selectedTopic])


    return (
        <form className="new-post">
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    {/* the dropdown selector */}
                    <select
                        className="post-select"
                        onChange={(event) => setSelectedTopic(event.target.value)
                        }
                        value={selectedTopic}

                    >
                        <option value=''>Select a topic</option>
                        {allTopics.map((topic) => (
                            <option key={topic.id}
                                value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={newPost.title}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="title" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Body</label>
                    <input type="text"
                        value={newPost.body}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="body" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-secondary"
                        onClick={handleSave}
                    >
                        Save Post
                    </button>
                </div>
            </fieldset>
        </form>
    )

}



















