import axios from "axios";

/**
 * Instance of the axios with baseURL.
 */
export default axios.create({
	baseURL: "https://vast-shore-74260.herokuapp.com",
});
