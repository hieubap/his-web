import React, { memo } from 'react';
import moment from 'moment';
import { checkFormat, objectConverter, dateDefault } from './utils';
import { Main } from './styled';
import { Input } from 'antd';

const DOBInput = (props) => {
	const { value, disabled, placeholder, className, allowClear, onBlur, onChange } = props;

	const keyUpBirthday = (e) => {
		if ((e.key && e.key === 'Tab') || (e.key && e.key === 'Enter')) {
			parseDate();
		}
	};
	const parseDate = () => {
		/* 
		By default, two digit years above 68 are assumed to be in the 1900's and years 68 or below are assumed to be in the 2000's. 
		This can be changed by replacing the moment.parseTwoDigitYear method. 
		The only argument of this method is a string containing the two years input by the user, and should return the year as an integer.

		moment.parseTwoDigitYear = function(yearString) {
			return parseInt(yearString) + 2000;
		}
		*/
		moment.parseTwoDigitYear = function(yearString) {
			return parseInt(yearString) + 1900;
		}
		if (!value.strData) {
			let momentDate;
			let validate;
			const text = value ? value.str : '';
			if (Number(text?.replaceAll("/", "")).toString() != "NaN") {
				const formatStr = checkFormat(text) || '';
				if (formatStr.length > 3) {
					if (formatStr.length === 5 || formatStr.length === 7 || formatStr.length >= 9 || !moment(text, formatStr).isValid()) {
						validate = 1000
					} else {
						if (formatStr.length !== 4) {							
							const momentTime = moment(text, formatStr);
							momentDate = momentTime.isValid() ?
								objectConverter(momentTime, 'DD/MM/YYYY') : dateDefault;
						} else {
							momentDate = moment(text, formatStr).isValid() ?
								objectConverter(moment(text, formatStr), 'YYYY') : dateDefault;
						}
					}
				} else {
					if (text.length === 3 && Number(text) >= 201) {
						validate = 1001
					} else if (text.length >= 9) {
						validate = 1000
					} else {
						const year = parseFloat(moment().format('YYYY')) - parseFloat(text);
						momentDate = moment(year, 'YYYY').isValid() ? objectConverter(moment(year, 'YYYY'), 'YYYY') : dateDefault;
					}
				}
				if (momentDate) {
					onBlur(momentDate, momentDate?.validate, momentDate?.ageStr, momentDate?.formatStr === "YYYY" ? true : false);
				} else if (validate) {
					onBlur(value, validate);
				}
			} else {
				onBlur(value, 1000);
			}

		}
	};
	const handleChangeBirthDay = e => {
		const value = e.target.value;
		onChange({ str: value });
	};
	return (
		<Main className="input-content">
			<div className={'input-date-c'}>
				<Input
					type="text"
					onChange={handleChangeBirthDay}
					onBlur={parseDate}
					onKeyUp={keyUpBirthday}
					value={value ? value.str : ''}
					placeholder={placeholder}
					className={className}
					disabled={disabled}
					allowClear={allowClear}
				/>
			</div>
		</Main>
	);
}
export default memo(DOBInput);
