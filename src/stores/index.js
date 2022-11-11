import create from 'zustand'

export const userStore = create((set) => ({
    user: null,
    isLoadingUser: false,
    lawyer: null,
    storeUser: (user) => set({ user: user }),
    removeUser: () => set({ user: null }),
    setIsLoadingUser: (status) => set({ isLoadingUser: status }),
    setLawyer: (lawyer) => set({ lawyer: lawyer })
}))

export const lawyerStore = create((set) => ({
    appointment: null,
    case: null,
    storeAppointment: (appointmentDetails) => set({ appointment: appointmentDetails }),
    storeCase: (caseDetails) => set({ case: caseDetails })

}))