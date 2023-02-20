import { Grid } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import NoDataView from "./NoDataView";
import Spinner from "../components/Spinner";

const PaginateTable2 = ({
  columns,
  user,
  list,
  setList,
  ExpandedComponent,
  filterFunc,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  tableStyle = false,
  paginateServer = true,
  paginate = true,
  expandVisible,
  setExpandVisible,
  selectableRows,
  onSelectedRowsChange,
  selectableRowDisabled = false,
  onRowClicked,
  conditionalRowStyles,
  noDataComponent,
  persistTableHead = true,
  progressPending = false,
}) => {
  return (
    <Grid sx={{ objectFit: "cover", position: "relative" }}>
      <Spinner loading={progressPending} circleBlue />
      <DataTable
        columns={columns}
        data={list}
        fixedHeader
        noDataComponent={<NoDataView />}
        persistTableHead={persistTableHead}
        expandableRowsComponent={ExpandedComponent}
        expandableRows={ExpandedComponent ? true : false}
        pagination={paginate}
        paginationServer={paginateServer}
        striped
        customStyles={tableStyle}
        highlightOnHover
        selectableRowsHighlight
        pointerOnHover={false}
        paginationTotalRows={totalRows}
        progressPending={progressPending}
        // progressComponent={<LinearIndeterminate />}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        dense={false}
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        conditionalRowStyles={conditionalRowStyles}
        selectableRowDisabled={selectableRowDisabled}
        onRowClicked={(data) => {
          if (onRowClicked) onRowClicked(data);
        }}
      />
    </Grid>
  );
};

export default PaginateTable2;
