import React from 'react';
import T from 'prop-types';
import { Main } from './styled';
class DropdownList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      page: 1,
    };
  }
  componentDidMount() {
    document.addEventListener('keyup', this.keyDownSelectItem);
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyDownSelectItem);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  keyDownSelectItem = e => {
    e.preventDefault();
    const { listData, onClick } = this.props;
    const { active, page } = this.state;
    let itemTop = 0
    if (e.keyCode === 40) {
      itemTop = document.getElementById(`itemScroll${active}`).offsetTop + 31
      const clientHeight = this.scrollHospitall.clientHeight
      if (parseInt(itemTop) > parseInt(clientHeight)) {
        this.scrollHospitall.scrollTop = itemTop
        this.setState({
          page: page + 1
        })
      }
      this.setState({
        active: active + 1,
      }, () => {
      });
    }
    if (e.keyCode === 38) {
      const nextIndex = active > 0 ? active - 1 : active;
      itemTop = document.getElementById(`itemScroll${active}`).offsetTop - 31
      this.scrollHospitall.scrollTop = itemTop
      this.setState({
        active: nextIndex,
      });
    }
    if (e.keyCode === 13) {
      onClick(listData[active]);
    }
  };
  onScroll = (e) => {
    const { listData, size } = this.props
    const { page } = this.state;
    let element = e.target ? e.target : e;
    if (
      parseInt(element.scrollHeight) - parseInt(element.scrollTop) ===
      parseInt(element.clientHeight)
    ) {
      if (page * size < listData.length) {
        this.setState({ page: page + 1 })
      }
    }
  }
  handleClickOutside = (event) => {
    const { closeDropList } = this.props
    if (this.scrollHospitall && !this.scrollHospitall.contains(event.target)) {
      closeDropList()
    }
  }
  render() {
    const { onClick, listData, size, onFocus } = this.props;
    const { active, page } = this.state;
    return (
      <Main onFocus={onFocus} className="list-hospital popup-list mostly-customized-scrollbar display-lists" onScroll={this.onScroll} ref={ref => (this.scrollHospitall = ref)}>
        {listData.filter((item, index) => index < (page * size)).map((item, index) => {
          return (
            <li
              className={active === index ? 'active-item' : ''}
              id={`itemScroll${index}`}
              key={index}
              onClick={() => onClick(item)}
            >
              {item.displayText}
            </li>
          );
        })}
      </Main>
    );
  }
}

DropdownList.defaultProps = {
  listData: [],
  onClick: () => { },
};

DropdownList.propTypes = {
  listData: T.arrayOf(T.shape({})),
  onClick: T.func,
};

export default DropdownList;
