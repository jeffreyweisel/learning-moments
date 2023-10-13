import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getAllTopics, getPost } from "../../services/postServices"



export const PostEditForm = ({ currentUser }) => {

    const navigate = useNavigate()
    const { postId } = useParams()


    const [post, setPost] = useState({})
    const [selectedTopic, setSelectedTopic] = useState('')
    const [allTopics, setAllTopics] = useState([])

    useEffect(() => {
        getPost(postId).then((post) => {
            console.log(postId)
            setPost(post)
        })
    }, [postId])

    useEffect(() => {
        // Fetch all topics
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })

    }, [])


    // Update topicId in newPost when the user selects a topic
    useEffect(() => {
        setPost({
            ...post,
            topicId: parseInt(selectedTopic)      //spread operator to change topicId on onChange 
        })
    }, [selectedTopic])

    const handleSave = (e) => {
        e.preventDefault()
        if (post.body) {
            const editedPost = {
                id: post.id,
                userId: currentUser.id,
                body: post.body,
                title: post.title,
                date: post.date,
                topicId: post.topicId


            }
            editPost(editedPost).then(() => {
                console.log(editedPost)
                navigate('/myposts')
            })

        } else {
            window.alert('Please fill out description')

        }

    }

    const handleInputChange = (event) => {
        const stateCopy = { ...post }
        stateCopy[event.target.name] = event.target.value
        setPost(stateCopy)

    }



    return (
        <form>
            <h2>Edit Post</h2>
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
                        className="form-control"
                        value={post.title ? post.title : ''}
                        onChange={handleInputChange}
                        name="title"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Body</label>
                    <input
                        type="text"
                        className="form-control"
                        value={post.body ? post.body : ''}
                        onChange={handleInputChange}
                        name="body"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="btn-primary form-btn" onClick={handleSave}>Save Changes</button>
                </div>
            </fieldset>
        </form>
    )
}