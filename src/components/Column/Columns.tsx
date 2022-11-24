import React from 'react';

export default function Columns({ columns }: { columns: IColumn[] }) {
  return columns.map(({ id, title }) => <span key={id}>{title}</span>);
}
