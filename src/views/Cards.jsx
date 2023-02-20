import React from "react";
import { IconButton } from "@mui/material";
import ApiPaginateSearch from "../components/ApiPaginateSearch";
import ApiEndpoints from "../networks/ApiEndpoints";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { customStyles } from "../theme/TableStyles";

let refresh;
const dummyData = [
  {
    s_no: "1",
    published_on: "2 oct 2022",
    author_name: "Anjali",
    main_heading: "Principles of Material Design You Should Know",
    category: "Digital Marketing",
  },
  {
    s_no: "2",
    published_on: "3 oct 2022",
    author_name: "Anjali",
    main_heading: "Principles of Material Design You Should Know",
    category: "Front End Development",
  },
];
const columns = [
  {
    name: "S no.",
    selector: (row) => row.s_no,
    width: "150px",
    sortable: true,
  },
  {
    name: "Published on",
    selector: (row) => row.published_on,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category,
    wrap: true,
    sortable: true,
  },
  {
    name: "Main Heading",
    width: "500px",
    selector: (row) => row.main_heading,
    wrap: true,
    sortable: true,
  },
  {
    name: "Author Name",
    selector: (row) => row.author_name,
    wrap: true,
    sortable: true,
  },

  {
    name: "Edit",
    selector: (row) => (
      <IconButton>
        <EditOutlinedIcon row={row} position="0" sx={{ color: "#E5247A" }} />
      </IconButton>
    ),

    wrap: true,
    sortable: true,
  },
];
const Cards = () => {
  const [apiData, setApiData] = React.useState([]);
  const [query, setQuery] = React.useState();

  return (
    <ApiPaginateSearch
      apiEnd={ApiEndpoints.GET_USERS}
      setQuery={setQuery}
      columns={columns}
      apiData={dummyData}
      tableStyle={customStyles}
      setApiData={setApiData}
      queryParam={query ? query : ""}
      returnRefetch={(ref) => {
        refresh = ref;
      }}
      responses={(val) => {}}
    />
  );
};

export default Cards;
