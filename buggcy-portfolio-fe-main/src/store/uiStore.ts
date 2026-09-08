import { create } from "zustand";

interface UiState {
  isGlobalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;
  // An example of other global state you might need
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isGlobalLoading: false,
  setGlobalLoading: (isLoading) => set({ isGlobalLoading: isLoading }),
  
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
