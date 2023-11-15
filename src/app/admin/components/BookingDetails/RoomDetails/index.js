'use client';
import { Card, Table, Button, Modal, Select } from 'antd';
import { RetweetOutlined } from "@ant-design/icons"

const RoomDetails = ({ booking, setOpenModalSelectRoom,openModalSelectRoom, roomOptions, onSaveChangeRoom }) => {
  const rooms = booking?.rooms
    ? booking?.rooms.map((e) => ({
        key: e?.room_id,
        room: e?.roomtype_name,
        roomNum: e?.room_num,
        rate: e?.room_amount,
      }))
    : [];

    const columns = [
      {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
      },
      {
        title: 'Room Number',
        dataIndex: 'roomNum',
        key: 'roomNum',
      },
      {
        title: 'Rate',
        render: (_, record) => (
          <>
            {new Intl.NumberFormat('en-PH', {
              style: 'currency',
              currency: 'PHP',
            }).format(record.rate)}
          </>
        ),
        key: 'rate',
      },
      // {
      //   title: "Action",
      //   render: (_, record)=> {
      //     return <>  <Button type='default' onClick={()=> setOpenModalSelectRoom(true)} tool shape="default" icon={<RetweetOutlined />} />
          
      //     <Modal
      //     open={openModalSelectRoom}
      //     title="Change Room"
      //     onCancel={() => setOpenModalSelectRoom((prevState) => !prevState)}
      //     footer={[
      //       <Button
      //         key="cancel"
      //         loading={false}
      //         //  disabled={updateBookingOpts.loading}
      //         onClick={() => setOpenModalSelectRoom((prevState) => !prevState)}
      //       >
      //         Cancel
      //       </Button>,
      //       // <Button
      //       //   className="bg-info"
      //       //   key="submit"
      //       //   type="primary"
      //       //   loading={false}
      //       //   //  disabled={updateBookingOpts.loading}
      //       //   onClick={()=> onSaveChangeRoom(record, )}
      //       //   // disabled={!amenity?.id}
      //       // >
      //       //   Confirm
      //       // </Button>,
      //     ]}
      //   >
      //     <Select
      //       // value={amenity?.id}
      //       // onChange={(id) =>
      //       //   setAmenity({
      //       //     id: id,
      //       //     rate: amenitiesChoices.find((e) => e.value === id)?.rate,
      //       //     name: amenitiesChoices.find((e) => e.value === id)?.label,
      //       //   })
      //       // }
      //       onChange={(id)=>  onSaveChangeRoom(roomOptions?.find((e)=> e.value === id ), record)}
      //       className="w-full"
      //       size="large"
      //       placeholder="Select Items"
      //       options={roomOptions}
      //     ></Select>
      //   </Modal>
      //     </>
      //   }
      // }
      // {
      //   title: 'Address',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
    ];

    
  return (
    <Card title="Room Details">
      <Table dataSource={rooms} columns={columns} pagination={false} />
    </Card>
  );
};

export default RoomDetails;
