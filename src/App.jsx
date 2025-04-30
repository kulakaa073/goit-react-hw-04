import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';

import { fetchData } from './utils';

import { useState, useEffect } from 'react';
function App() {
  const [imagesCollection, setImagesCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [isEndOfData, setIsEndOfData] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); //wrap app in context provider?
  const [modalImageData, setModalImageData] = useState({});

  const handleSearch = async searchQuery => {
    try {
      setImagesCollection([]);
      setLoading(true);
      setError(false);
      setErrorMessage('');
      setIsEndOfData(false);
      const data = await fetchData({ searchQuery });
      setImagesCollection(data);
      console.log(data);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {setImagesCollection.length > 0 && (
        <ImageGallery images={imagesCollection} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage ErrorMessage={ErrorMessage} />}

      {isEndOfData && (
        <LoadMoreButton onClick={() => console.log('Load more images')} />
      )}
      {isImageModalOpen && (
        <ImageModal
          imageUrl="https://example.com/image.jpg"
          altText="Example Image"
        />
      )}
    </>
  );
}

export default App;
