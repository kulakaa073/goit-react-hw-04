import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';

import { fetchData, parseImagesData } from './utils';

import { useState } from 'react';

function App() {
  const [imagesCollection, setImagesCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEndOfData, setIsEndOfData] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageId, setModalImageId] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query, isLoadingMore = false) => {
    try {
      //check from where request is coming and reset for new search if needed
      if (!isLoadingMore) {
        setImagesCollection([]);
        setCurrentPage(0);
      }
      setLoading(true);
      setError(false);
      setErrorMessage('');
      const response = await fetchData({
        query,
        page: currentPage + 1,
      });
      console.log(response);
      if (response.data.total === 0) {
        setIsEndOfData(true);
        throw new Error('No images found for the given search query.');
      }
      setImagesCollection(prevCollection => [
        ...prevCollection,
        ...parseImagesData(response.data.results),
      ]);
      // check if the fetched page is the last page
      if (
        response.data.total_pages === 1 ||
        currentPage + 1 >= response.data.total_pages
      ) {
        setIsEndOfData(true);
      }
      //another check just so there's no funky data
      if (response.data.total_pages > 1) {
        setIsEndOfData(false);
        setCurrentPage(prevPage => prevPage + 1); //update page number
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      //check and save the search query for next page button
      if (query !== searchQuery) {
        setSearchQuery(query);
      }
    }
  };

  const handleImageClick = imageId => {
    setModalImageId(imageId); // Set the clicked image data
    setIsImageModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false); // Close the modal
    setModalImageId(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {setImagesCollection.length > 0 && (
        <ImageGallery
          images={imagesCollection}
          onImageClick={handleImageClick}
        />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage errorMessage={errorMessage} />}
      {!isEndOfData && (
        <LoadMoreButton onLoadMore={() => handleSearch(searchQuery, true)} />
      )}
      {isImageModalOpen && (
        <ImageModal
          imageData={imagesCollection.find(image => image.id === modalImageId)}
          isImageModalOpen={isImageModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
