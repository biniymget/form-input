// src/components/FormulaInput/FormulaInput.js
import React, { useState } from 'react';
import useFormulaStore from '../../store/store';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import './FormulaInput.css';

const FormulaInput = () => {
  const { formula, addToken, removeToken, updateToken } = useFormulaStore();
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const { data: suggestions } = useAutocomplete(inputValue);

  const handleAddToken = (value) => {
    if (value.trim()) {
      addToken({ type: 'tag', value });
      setInputValue('');
    }
  };

  const handleAddOperand = (operand) => {
    addToken({ type: 'operand', value: operand });
  };

  const handleEditToken = (index, newValue) => {
    updateToken(index, newValue);
    setEditingIndex(null);
  };

  return (
    <div className="formula-input-container">
      <div className="formula-tokens">
        {formula.map((token, index) => (
          <div key={index} className="token">
            {token.type === 'tag' ? (
              editingIndex === index ? (
                <input
                  type="text"
                  value={token.value}
                  onChange={(e) => updateToken(index, e.target.value)}
                  onBlur={() => setEditingIndex(null)}
                  autoFocus
                  className="edit-input"
                />
              ) : (
                <div className="tag">
                  <span>[{token.value}]</span>
                  <button onClick={() => setEditingIndex(index)} className="edit-btn">✎</button>
                  <button onClick={() => removeToken(index)} className="delete-btn">x</button>
                </div>
              )
            ) : (
              <span>{token.value}</span>
            )}
          </div>
        ))}
      </div>
      <div className="input-controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddToken(inputValue)}
          placeholder="Add tag"
          className="tag-input"
        />
        <button onClick={() => handleAddToken(inputValue)} className="add-btn">Add Tag</button>
        {['+', '-', '*', '/', 'SUM'].map((operand) => (
          <button key={operand} onClick={() => handleAddOperand(operand)} className="operand-btn">
            {operand}
          </button>
        ))}
      </div>
      {suggestions && (
        <div className="suggestions">
          <h4>Suggestions</h4>
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleAddToken(suggestion.name)}
                className="suggestion-item"
              >
                {suggestion.name} ({suggestion.category})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormulaInput;