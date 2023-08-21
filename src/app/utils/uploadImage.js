
import cloudinary from 'cloudinary';

export const useUploadHook = () => {
  cloudinary.v2.config({
    cloud_name: 'grand-villa',
    api_key: '673559779621746',
    api_secret: 'Q_3CjRimrVVrjlsPnx_fW1L4TRU',
  });

  const UploadImage = async (img) => {

    console.log(img)
    const images = [img];
    let uploaded_images = [];

    for (let image of images) {
      try {
        let upload_result = await cloudinary.v2.uploader.upload(image.name, {
          public_id: image.name,
          folder: 'ROOM_IMAGES',
        });
        // fs.unlinkSync(image.path);
        uploaded_images.push({ src: upload_result.secure_url });
      } catch (error) {
        return error;
      }
      if (images === uploaded_images.length) {
        return uploaded_images;
      }
    }

    return uploaded_images;
  };

  return { UploadImage };
};

export default useUploadHook;
