import { writable, derived, get } from 'svelte/store';

export const token = writable('')

export const user = writable('')

export const myAnimes = writable([]);
export const updateMyAnimes = (newAnime) => {
    myAnimes.set([...get(myAnimes), newAnime])
}