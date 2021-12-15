import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SelectStyle } from "./styled";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE_LOAD_MORE, SORT_LOAD_MORE } from "constants/index";

const { Option } = SelectStyle;
let timer = null;

function SelectLoadMore(props) {
  const { name, type, pageSize, sort, onChange, getMoreData, params, ...rest } =
    props;
  const [state, _setState] = useState({
    listData: [],
    listDataSearch: [],
    listDataShowing: [],
    currentPage: 0,
  });

  const setState = (data = {}) => {
    _setState({ ...state, ...data });
  };

  useEffect(async () => {
    let listData = [],
      listDataShowing = [],
      listDataSearch = [];

    listData = await cacheUtils.read("DATA_" + name, "", [], false);
    listDataShowing = listData.slice(0, pageSize);
    getMoreData({ page: state.currentPage, size: 10000, sort, ...params })
      .then((res) => {
        const { data } = res;

        listData = data.map((item) => {
          return {
            id: item.id || item.value,
            name:
              (type === 1 && item.ten) || item.name || (type === 2 && item.ma),
          };
        });
        listDataShowing = listData.slice(0, pageSize);
        cacheUtils.save("DATA_" + name, "", listData, false);
      })
      .catch((err) => {});
    setState({ listData, listDataShowing, listDataSearch: listData });
  }, []);

  const onPopupScroll = (e) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;

    if (
      scrollTop + offsetHeight < scrollHeight ||
      state.listDataShowing.length === state.listData.length
    ) {
      return;
    }

    const listDataShowing = state.listDataSearch.slice(
      0,
      (state.currentPage + 2) * pageSize
    );

    setState({ listDataShowing, currentPage: state.currentPage + 1 });
  };

  const handleSearch = (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let listDataShowing = [];
      let listDataSearch = [];

      if (!value.trim()) {
        listDataShowing = state.listData.slice(0, pageSize);
        listDataSearch = state.listData;
      } else {
        listDataSearch = state.listData.filter((item) => {
          return item.name
            .toLowerCase()
            .createUniqueText()
            .includes(value.toLowerCase().createUniqueText());
        });
        listDataShowing = listDataSearch.slice(0, pageSize);
      }

      setState({
        currentPage: 0,
        listDataSearch,
        listDataShowing,
      });
    }, 300);
  };
  const handleDropdownVisibleChange = (open) => {
    // if (open) return;
    // setCurrentPage(0);
    // setTextSearch("");
  };

  return (
    <SelectStyle
      showSearch={true}
      onSearch={handleSearch}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option &&
        option.children &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onChange={onChange}
      onPopupScroll={onPopupScroll}
      {...rest}
    >
      {props.children}
      {state.listDataShowing.map((item, index) => {
        return (
          <Option key={item.id || index} value={item.id}>
            {item.name}
          </Option>
        );
      })}
    </SelectStyle>
  );
}

SelectLoadMore.propTypes = {
  name: PropTypes.isRequired,
  type: PropTypes.number,
  pageSize: PropTypes.number,
  sort: PropTypes.string,
  getMoreData: PropTypes.func,
  params: PropTypes.object,
};
// type = 1 get ma, type = 2 get name, type = 3 get obj
SelectLoadMore.defaultProps = {
  type: 1,
  pageSize: PAGE_SIZE_LOAD_MORE,
  sort: SORT_LOAD_MORE,
};
export default SelectLoadMore;
