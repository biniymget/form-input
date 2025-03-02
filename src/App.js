
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FormulaInput from './components/formulaInputs/FormulaInput';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Formula Input</h1>
        <FormulaInput />
      </div>       
    </QueryClientProvider>
  );
}

export default App;