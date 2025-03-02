
import { create } from 'zustand';

const useFormulaStore = create((set) => ({
  formula: [],
  addToken: (token) => set((state) => ({ formula: [...state.formula, token] })),
  removeToken: (index) => set((state) => ({ formula: state.formula.filter((_, i) => i !== index) })),
  updateToken: (index, newValue) => set((state) => ({
    formula: state.formula.map((token, i) => (i === index ? { ...token, value: newValue } : token)),
  })),
}));

export default useFormulaStore;