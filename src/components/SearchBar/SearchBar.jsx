import toast, { Toaster } from 'react-hot-toast';
export default function SearchBar({ onSearch }) {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements[0].value.trim();
    if (!query || query === '') {
      toast('Please enter a search term');
      return;
    }
    onSearch(query);
    event.target.reset(); // Clear the input field after submission
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search images and photos" />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
}
