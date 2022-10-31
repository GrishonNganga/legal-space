import create from 'zustand'

export const userStore = create((set) => ({
    user: null,
    isLoadingUser: false,
    storeUser: (user) => set({ user: user }),
    removeUser: () => set({ user: null }),
    setIsLoadingUser: (status) => set({ isLoadingUser: status })
}))
