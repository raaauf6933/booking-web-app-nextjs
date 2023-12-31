'use client';
import {
  useState,
  useEffect,
  // useContext
} from 'react';
import axios from 'axios';
// import AppStateContext from "context/appState/context";
// import { AppStateActionType } from "types";
// import { getTokens } from "context/auth/handlers";
// import { useAuth } from "context/auth/context";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const useFetch = (axiosParams, options, token) => {
  // const user = useAuth();
  // const { dispatch } = useContext(AppStateContext);
  // const { tokenRefresh } = useContext(AuthContext);
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setloading] = useState(false);

  const params = {
    ...axiosParams,
    Accept: 'application/json',
    'x-auth-token': token,
  };

  const fetchData = async (refetchParams) => {
    setResponse(undefined);
    // dispatch({ type: AppStateActionType.START_LOADING });
    setloading(true);
    try {
      // await tokenRefresh();

      const result = await axios.request({
        ...(refetchParams
          ? { ...refetchParams, headers: { 'x-auth-token': token } }
          : params),
        url: params.url,
      });

      if (options?.onComplete) {
        options?.onComplete(result);
      }
      setResponse(result);
      return result;
    } catch (err) {
      const typedError = err;
      setError(typedError);

      // if (typedError.response?.data?.code === "TOKEN_EXPIRED") {
      //   user.logout();
      // } else if (typedError.response?.data?.code === "INVALID_TOKEN") {
      //   user.logout();
      // }
    } finally {
      // dispatch({ type: AppStateActionType.FINISH_LOADING });
      setloading(false);
    }
  };

  useEffect(() => {
    if (!options?.skip) {
      fetchData();
    }
  }, [options?.skip]); // execute once only

  return { error, loading, refetch: fetchData, response };
};

export default useFetch;
