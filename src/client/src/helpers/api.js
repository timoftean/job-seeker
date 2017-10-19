
export function fetchUser() {
    return fetch('/user').then((res) => res.json())
}
