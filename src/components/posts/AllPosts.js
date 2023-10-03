import { useEffect, useState } from "react"
import { getAllTopics, getallPosts } from "../../services/postServices"
import "./Posts.css"
import { getAllUserLikes } from "../../services/postServices"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")
    const [filteredTopics, setFilteredtopics] = useState([])



    //useEffect for allPosts and filteredPosts
    useEffect(() => {
        getallPosts().then((postsArray) => {
            setAllPosts(postsArray)
            setFilteredPosts(postsArray)
        })
    }, [])

    //useEfffect for post likes
    useEffect(() => {
        getAllUserLikes().then((likesArray) => {
            //filter userLikes to find matching id to post id
            const postLikes = likesArray.filter((like) =>
                allPosts.find((post) => post.id === like.postId)
            )
            setAllLikes(postLikes)
        })

    }, [allPosts])


    //useEffect for search bar
    useEffect(() => {
        const foundPosts = allPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPosts(foundPosts)

    }, [searchTerm, allPosts])


    useEffect(() => {
        //fetch all topics
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })

    }, [])


    // // useEffect for filtering posts based on the selected topic.
    // useEffect(() => {
    //     if (selectedTopic) {
    //         const foundPosts = allPosts.filter((post) => post.topicId === selectedTopic)
    //         setFilteredPosts(foundPosts)
    //     } else {
    //         // If no topic is selected, show all posts.
    //         setFilteredPosts(allPosts)
    //     }
    // }, [selectedTopic, allPosts])


    const handleTopicChange = (selectedTopic) => {
        if (selectedTopic) {
            const foundPosts = allPosts.some((post) => post.topicId === selectedTopic)
            console.log(foundPosts)
            setAllPosts(foundPosts)
            
        } else {
            // If no topic is selected, show all posts.
            setAllPosts(allPosts)
        }
    }

    return (
        <div className="post-hdr">
            {/* the search bar  */}
            <div className="post-search">
                <input
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                    type="text"
                    placeholder="Search Posts"
                    className="post-input"
                />
            </div>
            {/* the dropdown selector */}
            <div className="post-search">
                <select
                    onChange={(event) => {
                        handleTopicChange(event.target.value)
                        // console.log(selectedTopic) 
                    }}
                    value={selectedTopic}
                    className="post-select"
                >
                    <option value="">Select a topic</option>
                    {allTopics.map((topic) => (
                        <option key={topic.id}
                            value={topic.id}>
                            {topic.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="post-container">
                {filteredPosts.map((post) => {
                    //count the number of likes for each post
                    const postLikeCount = allLikes.filter((like) => like.postId === post.id)

                    return (
                        <div key={post.id} className="posts">
                            <div className="post-hdr">
                                <div className="post-info post-title">{post.title}</div>
                            </div>
                            <div className="post-info post-body">{post.body}</div>
                            <div className="post-info">{postLikeCount.length} likes</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}




