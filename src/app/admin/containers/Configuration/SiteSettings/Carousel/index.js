'use client';
import { Button, Card, Divider, Spin, message } from 'antd';
import React, { useState } from 'react';
import Header from '../../../../components/Header';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import MultipleUpload from '../../../../components/MultipleUpload';
import useFetch from '../../../../../hooks/useFetch';
import usePost from '../../../../../hooks/usePost';


const Carousel = () => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [images,setImages] = useState([])

  const {response: carousels, loading } = useFetch({
    method:"GET",
    url: "/site_settings/carousels",

  },{
    onComplete:(e)=> {
      setImages(e.data)
    }
  })

  console.log(carousels)

  const [saveCarousel,saveCarouselOpts] = usePost({
    onComplete:()=> {
      message.success("Saved changes!")
    }
  })

  const onSaveCarousel = () => {
    saveCarousel({
      method: "POST",
      url: "/site_settings/carousel",
      data:images
    })
  }

  
  return (
    <div>
      <Header title="Carousel" />
      <Card>
        {loading?  <Spin tip="Loading..." size='large' className='m-10'><div className="content" /></Spin> :    <MultipleUpload
                  // {...register('images')}
                  name="images"
                  value={images}
                  defaultValues={images}
                  onChange={(images) => setImages(images)}
                  getLoadingStatus={(isLoading) => {
                    setUploadLoading(isLoading);
                  }}
                />}
   
        <Divider />
        <Button loading={uploadLoading || loading} onClick={onSaveCarousel}>Save</Button>
      </Card>
    </div>
  );
};

export default Carousel;
