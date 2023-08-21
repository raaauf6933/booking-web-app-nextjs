import { Button } from 'antd';

const ActionBar = (props) => {
  const { onOk , okButtonType, disabled} = props;

  return (
    <div className="fixed bottom-0 z-10">
      <div className="bg-white shadow-2xl drop-shadow-2xl shadow-black p-4 w-screen max-w-xs md:max-w-7xl">
        <div className="flex justify-between">
          <Button className="bg-white text-black" type="default" disabled={disabled}>
            BACK
          </Button>
          <Button className="bg-info text-white" type="primary" onClick={onOk} htmlType={okButtonType} disabled={disabled}>
            CONFIRMED
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
