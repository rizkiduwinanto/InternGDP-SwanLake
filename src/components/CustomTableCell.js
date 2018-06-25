import { TableCell, withStyles } from '@material-ui/core';

export const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

export default CustomTableCell