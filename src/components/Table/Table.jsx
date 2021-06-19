import React, { useEffect, useRef, useContext } from "react";
import { useTable, useSortBy } from "react-table";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { DataContext } from "../../context/database/DataContext";
import "./style.css";

const UrlTable = React.memo(({ data }) => {
  const { getId, columnsSet, getData } = useContext(DataContext);
  const columns = React.useMemo(() => columnsSet, []);

  const elementRef = useRef();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable({ columns, data }, useSortBy);
  useEffect(() => {
    console.log("sort");
  }, [sortBy]);
  const sortMobile = () => {
    elementRef.current.click();
  };

  return (
    <TableContainer className='table__container' component={Paper}>
      <Button
        onClick={sortMobile}
        variant='contained'
        color='primary'
        className='mobile__button'
      >
        sort
      </Button>
      <InfiniteScroll
        dataLength={rows.length}
        next={getData}
        hasMore={true}
        loader={<h4>Loading more ...</h4>}
      >
        <Table className='table' aria-label='simple table' {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow
                className={`row${i}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className='cell'
                    ref={elementRef}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span className='arrows'>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  className={`tr-row`}
                  onClick={() => {
                    getId(row.original.id);
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        component='th'
                        scope='row'
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
});
export default UrlTable;
