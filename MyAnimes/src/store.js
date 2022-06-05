import { writable, derived } from 'svelte/store';

export const token = writable('')

export const user = writable('')

export const navbarMessage = derived(user, $user => {
    return `Hola ${$user}!`
})