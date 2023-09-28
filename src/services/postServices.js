export const getallPosts = () => {
    return fetch('http://localhost:8088/posts?_expand=topic&_expand=user').then(res => res.json())
}