import { Button } from 'antd';

const ActionBar = (props) => {
  const { onOk, onCancel, okButtonType, disabled, okLabel, hideOk } = props;

  return (
    <div className="fixed bottom-0 z-10">
      <div className="bg-white shadow-2xl drop-shadow-2xl shadow-black p-4 w-screen sm:max-w-sm md:sm:max-w-sm lg:max-w-2xl xl:max-w-3xl ">
        <div className="flex justify-between">
          <Button
            className="bg-white text-black"
            type="default"
            disabled={disabled}
            onClick={onCancel}
          >
            BACK
          </Button>
          {hideOk ? null : (
            <Button
              className="bg-info text-white"
              type="primary"
              onClick={onOk}
              htmlType={okButtonType}
              disabled={disabled}
            >
              {okLabel || 'CONFIRMED'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
