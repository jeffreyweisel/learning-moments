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


    // useEffect to filter posts based on selectedTopic
    useEffect(() => {
        const filteredTopics = allTopics.filter((topic) =>
            allPosts.find((post) => post.topicId === topic.id))
        setSelectedTopic(filteredTopics)
        console.log(filteredTopics)

    }, [allPosts, allTopics])

   

    useEffect(() => {
        console.log("selected topic", selectedTopic) 
        // console.log("all posts", allPosts)
        // console.log("all topiccsssss",allTopics)
    
    }, [selectedTopic])


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
                    className="post-search"
                />
            </div>
            {/* the dropdown selector */}
            <div className="post-search">
                <select
                    onChange={(event) => {
                        setSelectedTopic(event.target.value)
                        // console.log(selectedTopic) 
                    }}
                    value={selectedTopic}
                    className="post-search"
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




