'use client';
import { useState, useContext } from 'react';
// import AppStateContext from '../context/AppState/context';
// import { AppStateActionType } from '../context/AppState/actions';
// import { useAuth } from '../context/Auth/context';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const usePost = (props) => {
  const onComplete = props && props.onComplete ? props.onComplete : null;
  const onError = props && props.onError ? props.onError : null;
  //   const { sessionGuard } = useAuth();
  //   const { dispatch } = useContext(AppStateContext);
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);

  const callFn = async (params, token) => {
    // dispatch({ type: AppStateActionType.START_LOADING });
    setloading(true);

    // params
    const Params = {
      ...params,
    };

    try {
      //   await sessionGuard();
      const result = await axios.request({
        ...params,
        params:{
            test:"test"
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          "x-auth-token": token
        },
      });
      setResponse(result);

      if (onComplete && result) {
        onComplete(result);
      }
      return result;
    } catch (err) {
      const typedError = err;
      setError(typedError);
      //   dispatch({ type: AppStateActionType.SET_ERROR, payload: typedError });

      if (onError && err) {
        onError(typedError);
      }
      return err;
    } finally {
      setloading(false);
      //   dispatch({ type: AppStateActionType.FINISH_LOADING });
    }
  };
  const Opts = {
    error,
    loading,
    response,
  };

  return [callFn, Opts];
};

export default usePost;
