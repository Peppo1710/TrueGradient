import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Chatbot from './pages/Chatbot';


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
