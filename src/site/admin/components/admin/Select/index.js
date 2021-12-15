import React from 'react';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
import './style.scss';

class SelectBox extends React.Component {
    constructor(props) {
        super(props);
    }
    handelOnChange(elements) {
        if (!this.props.isMulti) {
            this.props.onChangeSelect(elements, this.props.getIdObject(elements));
        } else {
            if (elements.length) {
                var lists = elements;
                var ids = [];
                elements.forEach(element => {
                    ids.push(this.props.getIdObject(element));
                });
                this.props.onChangeSelect(lists, ids);
            }
            else {
                this.props.onChangeSelect([], []);
            }
        }
    }
    customFilter(option, searchText) {
        if ((option.label || "").toLowerCase().unsignText().includes(searchText.toLowerCase().unsignText())) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { label, listOption, isMulti, selected, placeholder, required, validates, isDisabled } = this.props;
        var list = [];
        if (!isMulti) {
            if (selected) {
                for (var i = 0; i < (listOption && listOption.length); i++) {
                    if (selected == this.props.getIdObject(listOption[i]))
                        list.push(listOption[i]);
                }
            }
        } else {
            if (selected) {
                for (var i = 0; i < (listOption && listOption.length); i++) {
                    if (selected.indexOf(this.props.getIdObject(listOption[i])) != -1)
                        list.push(listOption[i]);
                }
            }
        }
        return (
            <FormGroup className="select-group" >
                <Select
                    id={this.props.id}
                    isDisabled={isDisabled ? true : false}
                    className={(!isMulti ? "isofh-ui-select basic-single " : "basic-single ") + (validates ? " border-color-error" : "")}
                    classNamePrefix="select"
                    isSearchable={true}
                    isMulti={isMulti ? true : false}
                    name="color"
                    value={list}
                    options={listOption}
                    getOptionValue={this.props.getIdObject}
                    getOptionLabel={this.props.getLabelObject}
                    onChange={this.handelOnChange.bind(this)}
                    isClearable={false}
                    placeholder={placeholder}
                    filterOption={this.customFilter.bind(this)}
                    theme={theme => ({
                        ...theme,
                        borderRadius: '0.25rem',
                        colors: {
                            ...theme.colors,
                            primary: "#63c2de"
                        }
                    })}
                />
                <div className="error">
                    {validates ? validates : null}
                </div>
            </FormGroup>
        )
    }
}

export { SelectBox }
