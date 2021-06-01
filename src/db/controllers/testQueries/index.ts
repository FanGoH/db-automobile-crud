import { makeQuery } from "../../Helpers/query";
import { queries } from "./queries";

export const makeTestQueryNo = async (queryNo: number) => {
	return (await makeQuery(queries[queryNo - 1].query))[0];
};
