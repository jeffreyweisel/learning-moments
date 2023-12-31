export const getPosts = () => {
    return fetch('http://localhost:8088/posts').then(res => res.json())
}

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
    return fetch(`http://localhost:8088/posts?postId=${postId}&_expand=user&_embed=userLikes`).then(res => res.json())
}

export const addUserLike = (postObj) => {
    return fetch(`http://localhost:8088/userLikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
    }).then((res) => res.json())
}

export const addNewPost = (newPost) => {
    return fetch('http://localhost:8088/posts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(newPost)
    }).then((res) => res.json())
}

export const deletePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }

    })
}

export const getPost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`).then(res => res.json())
}

export const editPost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    }).then((response) => response.json())
}


export const deleteLike = (like) => {
    return fetch(`http://localhost:8088/userLikes/${like.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        }

    })
}
