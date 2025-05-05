import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ imageData, isImageModalOpen, onClose }) {
  /*  function idkTiredCheckLaterSomethingAboutScalingImageToProperSize(event) {
    let windowWidth = window.innerWidth * this.options.widthRatio;
    let windowHeight = window.innerHeight * this.options.heightRatio;
    let imageWidth = event.target.width,
      imageHeight = event.target.height;

    if (
      this.options.scaleImageToRatio ||
      imageWidth > windowWidth ||
      imageHeight > windowHeight
    ) {
      let ratio =
        imageWidth / imageHeight > windowWidth / windowHeight
          ? imageWidth / windowWidth
          : imageHeight / windowHeight;
      imageWidth /= ratio;
      imageHeight /= ratio;
    }

    this.domNodes.image.style.top =
      (window.innerHeight - imageHeight) / 2 + 'px';
    this.domNodes.image.style.left =
      (window.innerWidth - imageWidth - this.globalScrollbarWidth) / 2 + 'px';
    this.domNodes.image.style.width = imageWidth + 'px';
    this.domNodes.image.style.height = imageHeight + 'px';
  } */

  return (
    <Modal
      isOpen={isImageModalOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={css.content}
    >
      <div className={css.container}>
        <img src={imageData.largeImageURL} alt={imageData.altText} />
        <div className={css.imageInfo}>
          <h2>Author: {imageData.author}</h2>
          <h3>{imageData.description}</h3>
        </div>
        <button type="button" onClick={onClose} className={css.closeButton}>
          X
        </button>
      </div>
    </Modal>

    // Reference modal component
    /*     <div className="overlay" onClick={onClose}>
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
    </div> */
  );
}
