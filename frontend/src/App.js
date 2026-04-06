// ... existing imports ...
import Practice from './components/Practice';

function App() {
  return (
    <Router>
      <Routes>
        {/* ... existing routes ... */}
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Router>
  );
}