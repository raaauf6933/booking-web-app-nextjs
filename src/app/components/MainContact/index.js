import { Card } from 'antd';
import {
  FaPhoneAlt,
  FaLocationArrow,
  FaClock,
  FaEnvelope,
} from 'react-icons/fa';
function MainContact(params) {
  return (
    <>
      <Card>
        <div>
          <div className="flex flex-wrap flex-row w-full justify-center lg:justify-between  md:justify-between ">
            <div className="flex flex-col items-center">
              <FaPhoneAlt className="text-2xl mb-2 text-warning" />
              <span className="text-xl font-semibold opacity-70 mb-2">
                Phone
              </span>
              <span className="text-xl">+63 906 6008 011</span>
            </div>
            <div className="flex flex-col items-center">
              <FaLocationArrow className="text-2xl mb-2 text-warning" />
              <span className="text-xl font-semibold opacity-70 mb-2">
                Address
              </span>
              <span className="text-xl">
                P. Herrera St 866, Pateros, Philippines
              </span>
            </div>
            <div className="flex flex-col items-center">
              <FaClock className="text-2xl mb-2 text-warning" />
              <span className="text-xl font-semibold opacity-70 mb-2">
                Open Time
              </span>
              <span className="text-xl">24/7</span>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-2xl mb-2 text-warning" />
              <span className="text-xl font-semibold opacity-70 mb-2">
                Email
              </span>
              <span className="text-xl">grand.villa.resort@gmail.com</span>
            </div>
          </div>
          <div className="mt-10">
            <div className='overflow-hidden'>

           
            <iframe
              width={1200}
              height={450}
              frameborder="0"
              src="https://www.google.com/maps/embed/v1/place?q=grand+villa+resort+pateros&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            ></iframe>
             </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default MainContact;
