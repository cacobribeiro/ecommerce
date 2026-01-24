import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

const PricingTable = ({ title, subtitle, columns, rows }) => (
  <Box sx={{ borderRadius: 4, border: "1px solid rgba(202, 163, 84, 0.25)", p: 3 }}>
    <Typography variant="h5" sx={{ mb: 1 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>
    )}
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label || row.period}>
            {row.cells.map((cell, index) => (
              <TableCell key={`${row.label || row.period}-${index}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default PricingTable;
