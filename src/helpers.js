export let isAuthenticated = () => {
    return !!localStorage.getItem('token')
}
