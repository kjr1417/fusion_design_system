import React from "react";

interface TableProps { variant?: "primary" | "secondary" | "tertiary"; zebra?: boolean; divider?: "primary" | "secondary" | "tertiary" | "none"; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export function Table(props: TableProps): JSX.Element;

interface TableHeadProps { variant?: "primary" | "secondary" | "tertiary"; divider?: "primary" | "secondary" | "tertiary" | "none"; sticky?: boolean; children?: React.ReactNode; }
export function TableHead(props: TableHeadProps): JSX.Element;

interface TableBodyProps { children?: React.ReactNode; }
export function TableBody(props: TableBodyProps): JSX.Element;

interface TableRowProps { children?: React.ReactNode; }
export function TableRow(props: TableRowProps): JSX.Element;

interface TableCellProps { align?: "left" | "right"; header?: boolean; scope?: string; children?: React.ReactNode; }
export function TableCell(props: TableCellProps): JSX.Element;
