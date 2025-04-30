import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images }) {
  return (
    <ul>
      {images.map((image, index) => (
        <li key={index}>
          <ImageCard />
        </li>
      ))}
    </ul>
  );
}
