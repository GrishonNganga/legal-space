import create from 'zustand'

export const userStore = create((set) => ({
    user: null,
    storeUser: (user) => set({ user: user }),
    removeUser: () => set({ user: null }),
}))
