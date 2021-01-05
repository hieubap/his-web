import React, { useState } from 'react';
import { Card, Select, Row, Col, Button } from 'antd';
import { Main } from './styled';
import PickColor from '../PickColor';
import { fontSizes, fontFamilies, fontStyles } from './constants';
import * as command from '../utils';

const TextTool = () => {
  const [fontSize, setFontSize] = useState('2');
  const [fontFamily, setFontFamily] = useState('timeNewRomance');
  const [fontStyle, setFontStyle] = useState('regular');
  const [alight, setAlight] = useState('justifyLeft');
  
  const handleChangeFontSize = (value) => {
    setFontSize(value);
    command.setFontSize(value);
  };
  
  const handleChangeAlight = (func) => e => {
    func();
    const value = e.target.value;
    setAlight(value);
  };
  
  const handleChangeFontStyle = (value) => {
    setFontStyle(value);
    switch (value) {
      case 'bold':
        command.bold();
        break;
      case 'italic':
        command.italic();
        break;
      default: break;
    }
  };
  
  const handleChangeColor = (value) => {
    command.foreColor(value);
  };
  
  const handleMark = value => {
    command.mark(value);
  };
  
  return (
    <Main>
      <Card size={'small'} title={'Text'} bordered={false}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Select
              size={'small'}
              value={fontFamily}
              onChange={setFontFamily}
              style={{ width: '100%' }}
              placeholder={'font-family'}
            >
              {Object.keys(fontFamilies).map(key => (
                <Select.Option key={key} value={key}>{fontFamilies[key]}</Select.Option>
              ))}
            </Select>
          </Col>
          
          <Col span={16}>
            <Select
              size={'small'}
              value={fontStyle}
              onChange={handleChangeFontStyle}
              style={{ width: '100%' }}
              placeholder={'font-style'}
            >
              {Object.keys(fontStyles).map(key => (
                <Select.Option key={key} value={key}>{fontStyles[key]}</Select.Option>
              ))}
            </Select>
          </Col>
          
          <Col span={8}>
            <Select
              size={'small'}
              value={fontSize}
              onChange={handleChangeFontSize}
              style={{ width: '100%' }}
              placeholder={'font-size'}
            >
              {Object.keys(fontSizes).map(item => (
                <Select.Option key={item} value={item}>{fontSizes[item]}{' pt'}</Select.Option>
              ))}
            </Select>
          </Col>
          
          <Col span={15}>
            <Button.Group size={'small'}>
              <Button
                type={alight === 'left' ? 'primary' : ''}
                icon={'align-left'}
                onClick={handleChangeAlight(command.justifyLeft)}
                value={'left'}
              />
              <Button
                type={alight === 'center' ? 'primary' : ''}
                icon={'align-center'}
                onClick={handleChangeAlight(command.justifyCenter)}
                value={'center'}
              />
              <Button
                type={alight === 'right' ? 'primary' : ''}
                icon={'align-right'}
                onClick={handleChangeAlight(command.justifyRight)}
                value={'right'}
              />
            </Button.Group>
          </Col>
          
          <Col span={3}>
            <Button icon={'ordered-list'} block size={'small'} />
          </Col>
          <Col span={3}>
            <Button icon={'column-height'} block size={'small'} />
          </Col>
          <Col span={3}>
            <Button icon={'line-height'} block size={'small'} />
          </Col>
  
          <Col span={7}>
            <PickColor icon={'font-colors'} changeColor={handleChangeColor} />
          </Col>
          
          <Col span={7}>
            <PickColor icon={'highlight'} changeColor={handleMark} />
          </Col>
        </Row>
      </Card>
    </Main>
  )
};

export default TextTool;
