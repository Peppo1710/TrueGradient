import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalTokens: 1250, // Starting tokens
  tokensUsed: 0,
  tokensRemaining: 1250,
  costPerMessage: 10, // Tokens cost per message
  costPerResponse: 0.5, // Tokens cost per AI response
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    spendTokens: (state, action) => {
      const { messageCost, responseCost } = action.payload;
      const totalCost = messageCost + responseCost;
      
      state.tokensUsed += totalCost;
      state.tokensRemaining = state.totalTokens - state.tokensUsed;
    },
    addTokens: (state, action) => {
      const tokensToAdd = action.payload;
      state.totalTokens += tokensToAdd;
      state.tokensRemaining += tokensToAdd;
    },
    resetTokens: (state) => {
      state.tokensUsed = 0;
      state.tokensRemaining = state.totalTokens;
    },
    updateTokenCosts: (state, action) => {
      const { messageCost, responseCost } = action.payload;
      state.costPerMessage = messageCost;
      state.costPerResponse = responseCost;
    },
  },
});

export const { spendTokens, addTokens, resetTokens, updateTokenCosts } = tokenSlice.actions;
export default tokenSlice.reducer;
