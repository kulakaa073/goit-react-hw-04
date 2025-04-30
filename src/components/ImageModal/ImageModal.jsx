export default function ImageModal({ imageData, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={imageData.largeImageURL} alt={imageData.altText} />
        <div className="image-info">
          <h2>Author: {imageData.author}</h2>
          <p>{imageData.description}</p>
        </div>
        <button type="button" onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}
