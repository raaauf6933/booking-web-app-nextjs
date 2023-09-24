'use client';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import { Button, Input, InputNumber, Modal, Select, Switch, Table } from 'antd';
import useFetch from '../../../../hooks/useFetch';
import usePost from '../../../../hooks/usePost';
import StatusTag from '../../../components/StatusTag';

const Discounts = () => {
  const { response, refetch } = useFetch({
    method: 'GET',
    url: '/discount',
  });

  const discounts = response?.data;
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    id: null,
  });

  const [form, setForm] = useState({
    name: '',
    type: null,
    discount_rate: 1,
    status: 'ACT',
  });

  const { response: discount, loading: loadingFetchAmenity } = useFetch(
    {
      method: 'POST',
      url: '/discount',
      data: {
        id: openModal.id,
      },
    },
    {
      skip: !openModal?.id,
      onComplete: (e) => {
        setForm({
          name: e?.data?.name,
          type: e?.data?.type,
          discount_rate: e?.data?.discount_rate?.toString(),
          status: e?.data?.status,
        });
      },
    },
  );

  const [createDiscount, createDiscountOpts] = usePost({
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

  const [editDiscount, editDiscountOpts] = usePost({
    onComplete: () => {
      setOpenModal((prevState) => ({
        ...prevState,
        isOpen: false,
      }));
      setForm({
        name: '',
        type: null,
        discount_rate: 1,
        status: 'ACT',
      });
      refetch();
    },
  });

  const handleSubmit = () => {
    createDiscount({
      method: 'POST',
      url: 'discount/create_discount',
      data: form,
    });
  };

  const handleSubmitEdit = () => {
    editDiscount({
      method: 'POST',
      url: 'discount/edit_discount',
      data: {
        id: openModal?.id,
        ...form,
      },
    });
  };

  return (
    <div>
      <Header
        title="Discounts"
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
              <span className="text-white">Create Discount</span>
            </Button>
          </>
        }
      />
      <Table
        dataSource={discounts}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
          },
          {
            title: 'Discount Rate',
            key: 'discount_rate',
            dataIndex: 'discount_rate',
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
        title={discount?.data?.name || 'Create Discount'}
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
            disabled={createDiscountOpts.loading}
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
            disabled={createDiscountOpts.loading}
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
                value={form.name}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
              <Select
                options={[
                  { value: 'FIXED', label: 'FIXED' },
                  { value: 'PERCENTAGE', label: 'PERCENTAGE' },
                ]}
                value={form.type}
                onSelect={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    type: e,
                  }))
                }
                size="large"
                className="w-full mb-4"
                placeholder="Type"
              />
              <InputNumber
                size="large"
                value={form.discount_rate}
                className="mb-4 w-full"
                placeholder="Rate"
                min={1}
                onChangeCapture={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    discount_rate:
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

export default Discounts;
