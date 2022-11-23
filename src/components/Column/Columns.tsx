import React from 'react';

export default function Columns({ columns }: { columns: IColumn[] }) {
  return columns.map(({ _id, title }) => <span key={_id}>{title}</span>);
}
