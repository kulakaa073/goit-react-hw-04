import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard imageData={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
