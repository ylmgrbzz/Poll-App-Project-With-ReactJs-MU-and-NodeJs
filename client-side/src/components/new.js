import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import axios from 'axios';
import { useEffect, useState } from 'react';
const New = ({ location }) => {
  const [pollId, setPollID] = useState('');
  const [key, setKey] = useState('');
  useEffect(() => {
    //const x = queryString.parse(location.search);
    var x = queryString.parse(location.search);
    const id = x.id;
    //console.log(id);
    const data = { id: id };
    axios
      .post('http://localhost:5000/links', data)
      .then(function (response) {
        //console.log(response.data);
        setPollID(response.data.pollid);
        setKey(response.data._id);
        //history.push(`/new/?id=${questions.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <div className="ui-container py-5 ">
      <div className="bg-white w-75 d-flex flex-column border border-gray mx-auto  rounded-lg shadow-lg">
        <div className="px-5 pt-5 pb-4 ">
          <div className="d-flex flex-column">
            <h5 className="text-primary-dark">The link to your poll is</h5>
            <div className="d-flex w-100">
              <input
                type="text"
                name="lin"
                id="pollURL"
                className="w-100 cursor-pointer outline-none py-2 my-3 border px-4 bg-gray-200 text-secondary rounded"
                readOnly=""
                value={'https://localhost:3000/poll/?id=' + pollId}
              />
            </div>
          </div>
          <div className="d-flex flex-column mt-5 py-4 border-top border-gray">
            <h5 className="text-primary-dark ">
              The <span className="font-weight-bold">admin</span> link to manage
              your poll is
            </h5>
            <p className="text-sm mt-2 d-flex align-items-center text-warning py-1 font-weight-bold">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              &nbsp;Don't share this link with your participants
            </p>
            <div className="d-flex w-100">
              <div className="w-100 position-relative py-2 px-4 my-3 border rounded cursor-pointer">
                <input
                  type="text"
                  name="lin"
                  id="link"
                  className="w-100 bg-transparent border-0 outline-none"
                  readOnly=""
                  value={
                    'https://localhost:3000/poll-admin/id=?' +
                    pollId +
                    '&key=' +
                    key
                  }
                />
                <div
                  className="position-absolute inset-0 text-dark text-center d-flex align-items-center justify-content-center bg-gray-200 hover-bg-gray font-weight-bold w-100 "
                  style={{ opacity: '0.9' }}
                >
                  Click to copy
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 d-flex px-5 py-4 w-100">
          <div className="ml-auto d-flex align-items-center">
            <a
              className="w-100 font-weight-bold   border-right border-gray pr-4"
              target="_blank"
              rel="noopener noreferrer"
              href={'/poll/?id=' + pollId}
            >
              Visit your poll
            </a>
            <a
              className="w-100 pl-4 d-flex align-items-center font-weight-bold text-nowrap"
              target="_blank"
              rel="noopener noreferrer"
              href={'/poll-admin/?id=' + pollId + '&key=' + key}
            >
              Visit admin page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
