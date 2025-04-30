export default function ImageCard({ imageData, onImageClick }) {
  const handleClick = () => {
    onImageClick(imageData);
  };

  return (
    <div onClick={handleClick}>
      <img src={imageData.webformatURL} alt={imageData.altText} />
    </div>
  );
}
