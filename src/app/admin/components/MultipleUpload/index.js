import { useEffect, useState } from 'react';
import { Modal, Upload, message } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MultipleUpload = (props) => {
  const { onChange, defaultValues, getLoadingStatus } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(defaultValues ? defaultValues : []);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };
  const handleChange = ({ fileList: newFileList, ...rest }) => {
    if (newFileList.some((e) => e.status === 'uploading')) {
      getLoadingStatus(true);
    } else {
      getLoadingStatus(false);
    }

    //  newFileList.forEach((e)=> console.log({...e.response?.find(()=> true)}))
    onChange(
      newFileList.map((e) => (e.url ? e : { ...e.response?.find(() => true) })),
    );
    setFileList(newFileList);
  };

  return (
    <>
      <Upload
        {...props}
        listType="picture-card"
        fileList={fileList}
        name={props.name}
        onPreview={handlePreview}
        action={`${process.env.NEXT_PUBLIC_API_URL}/room_types/upload_single_image`}
        beforeUpload={(file) => {
          const isImage =
            file.type === 'image/png' ||
            file.type === 'image/jpg' ||
            file.type === 'image/jpeg';
          if (!isImage) {
            message.error(
              `${file.name} is not an image file, must be in png, jpg, jpeg only`,
            );
          }
          return isImage || Upload.LIST_IGNORE;
        }}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : (
          <>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </>
        )}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MultipleUpload;
