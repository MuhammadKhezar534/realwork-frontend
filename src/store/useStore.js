import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  properties: [],
  setProperties: (properties) => set({ properties }),
  clearProperties: () => set({ properties: [] }),
  notification: null,
  showNotification: (status, message) =>
    set({ notification: { status, message, id: Date.now() } }),
  hideNotification: () => set({ notification: null }),
}));
