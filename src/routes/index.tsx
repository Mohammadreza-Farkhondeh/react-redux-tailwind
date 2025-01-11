import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
