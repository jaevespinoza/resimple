import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setInformation, setLoading } from "../../actions/AppReducer";
import { fetchData } from "../../actions/AppApi";
import Spinner from "./Spinner";

/**
 * The application's body. It's in charge of showing the spinner when it's loading,
 * and also to show the information of the users after the excel has been downloaded.
 * @returns
 */
const ApplicationBody = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppState) => state.loading);

  useEffect(() => {
    // We create an async function that will wait for our fetched data
    // function to finish to manipulate it and save it in the state.
    const getInfo = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchData();
        console.log(data);
        dispatch(setInformation(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getInfo();
  }, []);

  return isLoading ? <Spinner /> : <div className="container"></div>;
};

export default ApplicationBody;
