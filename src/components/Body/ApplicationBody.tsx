import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanies,
  setInformation,
  setLoading,
} from "../../actions/AppReducer";
import { fetchData } from "../../actions/AppApi";
import Spinner from "./Spinner";
import "./styles.scss";
import CompanyAccordion from "../Company/CompanyAccordion";
import processDataJson from "../../../utils/processDataJson";
import { RootState } from "../../../store/store";

/**
 * The application's body. It's in charge of showing the spinner when it's loading,
 * and also to show the information of the users after the excel has been downloaded.
 * @returns
 */
const ApplicationBody = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.loading);

  useEffect(() => {
    // We create an async function that will wait for our fetched data
    // function to finish to manipulate it and save it in the state.
    const getInfo = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchData();
        dispatch(setInformation(data));
        dispatch(setCompanies(processDataJson()));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getInfo();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="application-body container">
      <CompanyAccordion />
    </div>
  );
};

export default ApplicationBody;
