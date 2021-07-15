import React, { useEffect, useState, useContext } from "react";
import "./Products.scss";

import { Link } from "react-router-dom";
import { appContext } from "../../context/appContext";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    id: "relevancia",
    numeric: true,
    disablePadding: false,
    label: "Relevancia",
  },
  { id: "precio", numeric: true, disablePadding: false, label: "Precio" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead data-testid='th'>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              data-testid={headCell.label}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function Products(props) {
  const {
    getProducts,
    getManufacturerProducts,
    getSearchProducts,
    setResults,
  } = useContext(appContext);

  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("relevancia");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [spinner, setSpinner] = useState(true);

  const path =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const pathSearch =
    window.location.href.split("/")[window.location.href.split("/").length - 2];

  useEffect(() => {
    const getData = async () => {
      let products;
      if (path === "products") {
        products = await getProducts();
      } else if (pathSearch === "search") {
        products = await getSearchProducts(props.data);
      } else {
        products = await getManufacturerProducts(path);
        setManufacturer(products.data[0].manufacturer);
      }
      setResults(products.data);
      if (products.length !== 0) {
        const data = products.data.map((product) => ({
          id: product.id,
          name:
            (product.manufacturer.manufacturer || product.manufacturer) +
            " " +
            product.product,
          relevancia: product.rating,
          precio: product.price,
        }));
        setRows(data);
        setSpinner(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className='Products'>
      {spinner ? (
        <CircularProgress />
      ) : (
        <>
          <h1>
            {props.title ? props.title : `Cámaras ${manufacturer.manufacturer}`}
          </h1>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <TableContainer>
                <Table aria-labelledby='tableTitle' aria-label='enhanced table'>
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const labelHref = `/product/${row.id}`;

                        return (
                          <TableRow hover tabIndex={-1} key={row.name}>
                            <TableCell>
                              <Link to={labelHref} data-testid='link'>
                                {row.name}
                              </Link>
                            </TableCell>
                            <TableCell className='rating'>
                              <Rating
                                name='read-only'
                                value={row.relevancia}
                                readOnly
                              />
                            </TableCell>
                            <TableCell align='right'>{row.precio} €</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage=''
              />
            </Paper>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
