import React, { memo } from 'react';
import T from 'prop-types';
import render from '../render';

const Cell = ({ col, mode, defaultValues, rowIndex, disabled, onChange }) => {
  const handleChange = (value) => {
    onChange(col.colKey)(value)
  };

  return (
    <td
      key={col.key}
      width={col.width - 4}
    >
      <div className={'td-contain in-side-col'}>
        {render(col.component)({
          mode,
          formChange: { [col.colKey]: handleChange },
          form: defaultValues,
          blockWidth: col.width - 4,
          component: {
            width: col.width - 4,
            props: {
              disabled,
              fieldName: col.colKey,
              line: 1,
            },
          },
        })}
      </div>
    </td>
  );
};

Cell.defaultProps = {
  col: {},
  mode: '',
  formChange: {},
  defaultValues: {},
};

Cell.propTypes = {
  col: T.shape({}),
  mode: T.string,
  formChange: T.shape({}),
  defaultValues: T.shape({}),
  rowIndex: T.number,
};

export default memo(Cell);
