export const getallPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_expand=user').then(res => res.json())
}

export const getAllUserLikes = () => {
    return fetch('http://localhost:8088/userLikes?_expand=user&_expand=post').then(res => res.json())
}