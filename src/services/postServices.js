

export const getallPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_expand=user').then(res => res.json())
}

export const getAllUserLikes = () => {
    return fetch('http://localhost:8088/userLikes?_expand=user&_expand=post').then(res => res.json())
}

export const getAllTopics = () => {
    return fetch('http://localhost:8088/topics').then(res => res.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts?userId=${postId}&_expand=user&_embed=userLikes`).then(res => res.json())
}