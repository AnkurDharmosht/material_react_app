import { Grid } from "@mui/material";
import React from "react";
import ApiPaginate from "./ApiPaginate";
import SearchBarComp from "./SearchBarComp";

const ApiPaginateSearch = ({
  apiEnd,
  columns,
  apiData,
  tableStyle,
  setApiData,
  queryParam,
  returnRefetch,
  setQuery,
  searchOptions = [],
  actionButtons,
  responses,
  conditionalRowStyles,
  selectableRows = false,
  onSelectedRowsChange,
  filterData = false,
  DBvalue,
  choseVal,
  filterFunc,
  search,
  selectableRowDisabled,
  prefilledQuery = false,
}) => {
  return (
    <Grid container>
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItem: "center",
          mb: { xs: 2, md: 2 },
        }}
      >
        {/* this is a grid */}
        <SearchBarComp
          prefilledQuery={prefilledQuery}
          setQuery={setQuery}
          queryParam={queryParam}
          searchOptions={searchOptions}
          ifFilterData={filterData}
          sendBkDBVal={(dbVal) => {
            if (DBvalue) DBvalue(dbVal);
          }}
          sendBkChoosenVal={(choosenVal) => {
            if (choseVal) choseVal(choosenVal);
          }}
        />
        {/* this is a grid too */}
        {actionButtons ? actionButtons : <span></span>}
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <ApiPaginate
          apiEnd={apiEnd}
          columns={columns}
          apiData={apiData}
          tableStyle={tableStyle}
          setApiData={setApiData}
          queryParam={queryParam ? queryParam : ""}
          returnRefetch={returnRefetch}
          ExpandedComponent={null}
          conditionalRowStyles={conditionalRowStyles}
          selectableRows={selectableRows}
          onSelectedRowsChange={onSelectedRowsChange}
          responses={responses}
          filterFunc={filterFunc}
          search={search && search}
          paginateServer={false}
          paginate={true}
          selectableRowDisabled={selectableRowDisabled}
        />
      </Grid>
    </Grid>
  );
};

export default ApiPaginateSearch;
