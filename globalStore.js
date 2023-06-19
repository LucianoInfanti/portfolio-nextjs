import { create } from "zustand";

export const globalStore = create((set) => ({
  hasAnimated: false,
  setHasAnimated: () => set((state) => ({ hasAnimated: true })),
}));
