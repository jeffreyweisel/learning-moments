export const allUserLikes = () => {
    return fetch('http://localhost:8088/userLikes?_expand=user&_expand=post').then(res => res.json())
}