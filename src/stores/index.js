import create from "zustand";
import { persist } from 'zustand/middleware'

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      isLoadingUser: false,
      lawyer: null,
      storeUser: (user) => set({ user: user }),
      removeUser: () => set({ user: null }),
      setIsLoadingUser: (status) => set({ isLoadingUser: status }),
      setLawyer: (lawyer) => set({ lawyer: lawyer }),
    }),
    {
        name: 'legal', // name of item in the storage (must be unique)
      }
  )
);

export const lawyerStore = create((set) => ({
  appointment: null,
  case: null,
  storeAppointment: (appointmentDetails) =>
    set({ appointment: appointmentDetails }),
  storeCase: (caseDetails) => set({ case: caseDetails }),
}));
