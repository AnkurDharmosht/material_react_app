import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAx } from "../networks/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import PaginateTable from "./PaginateTable";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ApiPaginate = ({
  user,
  columns = [],
  apiEnd,
  filterFunc,
  ExpandedComponent = [],
  paginateServer = true,
  returnRefetch,
  expandVisible,
  setExpandVisible,
  search,
  queryParam,
  tableStyle,
  apiData,
  setApiData,
  selectableRows,
  onSelectedRowsChange,
  clearSelection,
  selectableRowDisabled = false,
  onRowClicked,
  conditionalRowStyles,
  persistTableHead = true,
  subHeader,
  paginate = true,
  responses,
}) => {
  const [list, setList] = useState(apiData ? apiData : []);
  const [filteresList, setFilteredList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const getUrl = (page, paginate) => {
    return `${apiEnd}?page=${page}&paginate=${paginate}${
      queryParam ? "&" + queryParam : ""
    }`;
  };
  const [{ data, loading, error }, refetch] = useAx(getUrl(lastPage, perPage));
  if (returnRefetch) {
    returnRefetch(refetch);
  }
  useEffect(() => {
    if (data) {
      if (data.results) {
        setUiData(data.results, data.count);
        if (setApiData) setApiData(data.results);

        if (responses) responses(data.count);
      } else {
        const myData = data && data.data;
        if (myData && myData.data) {
          setUiData(myData.data, myData.total);
          if (responses) responses(myData.total);
          if (setApiData) setApiData(myData.data);
        } else if (data) {
          if (data.data) setUiData(data.data, data.total);
          // if (responses) responses(data.total);
          else setUiData(data);
          if (setApiData) setApiData(myData);
          if (responses) responses(myData.total);
        }
      }
    } else if (data) {
      if (!data.data) console.log("no data");
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire("Unathorized, you need to Relogin.");

        navigate("/login");
        authCtx.logout();
      }
      if (error.message && error.message === "Network Error") {
        Swal.fire("Check your Network Connection!!!");
      } else {
        apiErrorToast(error, "logged Out! Please login again");
      }
    }
    return () => {};
  }, [error]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [queryParam]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (search) {
          const ls = list.filter((item) => {
            return filterFunc && filterFunc(item, search);
          });
          resolve(ls);
        } else {
          resolve(list);
        }
      }, 100);
    })
      .then((ls) => {
        setFilteredList(ls);
      })
      .catch((err) => {
        console.log("error in promise " + err);
      });
    return () => {};
  }, [search, list]);

  const setUiData = (myData, total) => {
    setTotalRows(total);
    setList(myData);
  };
  const handlePageChange = (page) => {
    setLastPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setLastPage(page);
    setPerPage(newPerPage);
  };

  return (
    <div
      style={{
        overflow: "auto",
        borderRadius: "0px",
        width: "100%",
        objectFit: "fill",
        border: "none",
      }}
    >
      <PaginateTable
        columns={columns}
        list={filteresList}
        persistTableHead={persistTableHead}
        setList={setFilteredList}
        tableStyle={tableStyle}
        ExpandedComponent={ExpandedComponent}
        filterFunc={filterFunc}
        progressPending={loading}
        totalRows={totalRows}
        handlePerRowsChange={handlePerRowsChange}
        handlePageChange={handlePageChange}
        paginateServer={paginateServer}
        expandVisible={expandVisible}
        setExpandVisible={setExpandVisible}
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        clearSelection={clearSelection}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={onRowClicked}
        subHeader={subHeader}
        paginate={paginate}
        selectableRowDisabled={selectableRowDisabled}
      />
    </div>
  );
};

export default ApiPaginate;
