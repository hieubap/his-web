import React, { useState, useRef } from 'react';
import { Input, Icon, Switch } from 'antd';

const CardTitle = ({ handleSearch, searchValue, setSearchValue, handleChangeView }) => {
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const inputRef = useRef(null);

  const handleChangeViewAll = (checked) => {
    setViewOnly(checked);
    handleChangeView(checked);
  };

  const handleClickIcon = () => {
    setOnFocusSearch(true);
    inputRef.current.focus();
  };

  const handleClickOutSide = () => {
    if (!searchValue) {
      setOnFocusSearch(false);
    }
  };

  const forceCloseSearch = () => {
    setOnFocusSearch(false);
    setSearchValue('')
  };

  return (
    <div className={'files-list-title'}>
      <div className={'files-list-title-text'}>
        <span className={'title-value'}>
          {!viewOnly ? "Hồ sơ bệnh án" : "Hồ sơ điều dưỡng"}
        </span>

        <span>
          <Switch
            checked={viewOnly}
            checkedChildren={'HSBA'}
            unCheckedChildren={'HSĐD'}
            className={'files-title-switch'}
            onChange={handleChangeViewAll}
          />
        </span>
      </div>

      <Input
        ref={inputRef}
        className={`files-list-title-input ${onFocusSearch ? 'files-list-title-input-focus' : ''}`}
        size={'small'}
        onChange={handleSearch}
        onBlur={handleClickOutSide}
        placeholder={'Tìm kiếm biểu mẫu'}
      />

      {onFocusSearch ? (
        <Icon
          onClick={forceCloseSearch}
          className={'files-list-search-icon'}
          type={'close'}
        />
      ) : (
        <Icon
          onClick={handleClickIcon}
          className={'files-list-search-icon'}
          type={'search'}
        />
      )}
    </div>
  )
};

export default CardTitle;
