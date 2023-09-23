'use client';
import { Button, Input, InputNumber, Modal, Switch, Table } from 'antd';
import Header from '../../../components/Header';
import { useState } from 'react';
import usePost from '../../../../hooks/usePost';
import useFetch from '../../../../hooks/useFetch';
import StatusTag from '../../../components/StatusTag';

const Amenities = () => {
  const { response, refetch } = useFetch({
    method: 'GET',
    url: '/amenity',
  });

  const amenities = response?.data;
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    id: null,
  });

  const { response: amenity, loading: loadingFetchAmenity } = useFetch(
    {
      method: 'POST',
      url: '/amenity',
      data: {
        id: openModal.id,
      },
    },
    {
      skip: !openModal?.id,
      onComplete: (e) => {
        setForm({
          name: e?.data?.name,
          rate: e?.data?.rate?.toString(),
          status: e?.data?.status,
        });
      },
    },
  );

  const [form, setForm] = useState({
    name: '',
    rate: 1,
    status: 'ACT',
  });

  const [createAmenity, createAmenityOpts] = usePost({
    onComplete: () => {
      setOpenModal((prevState) => ({
        ...prevState,
        isOpen: false,
      }));
      setForm({
        name: '',
        rate: 1,
        status: 'ACT',
      });
      refetch();
    },
  });

  const [editAmenity, editAmenityOpts] = usePost({
    onComplete: () => {
      setOpenModal((prevState) => ({
        ...prevState,
        isOpen: false,
      }));
      setForm({
        name: '',
        rate: 1,
        status: 'ACT',
      });
      refetch();
    },
  });

  const handleSubmit = () => {
    createAmenity({
      method: 'POST',
      url: 'amenity/create_amenity',
      data: form,
    });
  };

  const handleSubmitEdit = () => {
    editAmenity({
      method: 'POST',
      url: 'amenity/edit_amenity',
      data: {
        id: openModal?.id,
        ...form,
      },
    });
  };

  return (
    <div>
      <Header
        title="Amenities"
        actions={
          <>
            <Button
              className="bg-info"
              onClick={() =>
                setOpenModal((prevState) => ({
                  ...prevState,
                  isOpen: true,
                }))
              }
            >
              <span className="text-white">Create Amenity</span>
            </Button>
          </>
        }
      />
      <Table
        dataSource={amenities}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: 'Rate',
            key: 'rate',
            dataIndex: 'rate',
          },
          {
            title: 'Status',
            render: (_, record) => (
              <>
                {' '}
                <StatusTag status={record.status} />
              </>
            ),
            key: 'status',
          },
        ]}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setOpenModal((prevState) => ({
                ...prevState,
                isOpen: true,
                id: record._id,
              }));
            }, // click row
          };
        }}
      />
      <Modal
        open={openModal.isOpen}
        title={amenity?.data?.name || 'Create Amenity'}
        onCancel={() => {
          setOpenModal((prevState) => ({
            ...prevState,
            isOpen: false,
            id: null,
          }));

          setForm({
            name: '',
            rate: 1,
            status: 'ACT',
          });
        }}
        footer={[
          <Button
            key="cancel"
            loading={false}
            disabled={createAmenityOpts.loading}
            onClick={() => {
              setOpenModal((prevState) => ({
                ...prevState,
                isOpen: false,
                id: null,
              }));
              setForm({
                name: '',
                rate: 1,
                status: 'ACT',
              });
            }}
          >
            Cancel
          </Button>,
          <Button
            className="bg-info"
            key="submit"
            type="primary"
            loading={false}
            disabled={createAmenityOpts.loading}
            onClick={openModal?.id ? handleSubmitEdit : handleSubmit}
          >
            Submit
          </Button>,
        ]}
        onOk={openModal?.id ? handleSubmitEdit : handleSubmit}
      >
        <div>
          {!loadingFetchAmenity ? (
            <>
              {' '}
              <Input
                placeholder="Name"
                size="large"
                className="my-4"
                value={amenity?.data?.name || form.name}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
              <InputNumber
                addonBefore="PHP"
                size="large"
                value={form.rate}
                className="mb-4"
                placeholder="Rate"
                min={1}
                onChangeCapture={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    rate:
                      isNaN(parseInt(e?.currentTarget?.value)) ||
                      parseInt(e.currentTarget.value) < 1
                        ? prevState.rate
                        : parseInt(e.currentTarget.value),
                  }))
                }
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    e.target.blur();
                  }
                }}
              />
              <Switch
                checkedChildren="Active"
                unCheckedChildren="In-Active"
                defaultChecked
                checked={form.status === 'ACT' ? true : false}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    status: e ? 'ACT' : 'INACTIVE',
                  }))
                }
              />
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default Amenities;
