import Label from "./Label";
import TextField from "./TextField";
import Barcode from "./Barcode";
import Date from "./DatePicker";
import Layout from "./Layout";
import CheckGroups from "./CheckGroups";
import Table from "./Table";
import InputNumber from "./InputNumber";
import CodeInput from "./CodeInput";
import InputGroup from "./InputGroup";
import Image from "./Image";
import ArrayConverter from "./ArrayConverter";
import ElectronicSignature from "./ElectronicSignature";
import BreakLine from "./BreakLine";
import Title from "./Title";
import Input from "./Input";
import NameWrapper from "./FieldsWrapper";

import { FORM_WIDTH } from "components/constanst";

export default {
  label: {
    name: "Label",
    component: Label,
    icon: "font-size",
    defaultProps: {},
  },
  textField: {
    name: "Text field",
    component: TextField,
    icon: "edit",
    defaultProps: {},
  },
  date: {
    name: "Date",
    component: Date,
    icon: "calendar",
    defaultProps: { dateTimeFormat: "D/M/Y" },
  },
  barcode: {
    name: "Barcode",
    component: Barcode,
    icon: "barcode",
    defaultProps: {},
  },
  layout: {
    name: "Layout",
    component: Layout,
    icon: "layout",
    defaultProps: {},
  },
  groupCheck: {
    name: "GroupCheck",
    component: CheckGroups,
    icon: "carry-out",
    defaultProps: { checkList: [], direction: "ltr" },
  },
  table: {
    name: "Table",
    component: Table,
    icon: "table",
    defaultProps: {
      cols: [
        { key: 1, width: FORM_WIDTH * 0.4 },
        { key: 2, width: FORM_WIDTH * 0.1 },
        { key: 3, width: FORM_WIDTH * 0.25 },
        { key: 4, width: FORM_WIDTH * 0.25 },
        // { key: 6, width: FORM_WIDTH*0.1 },
      ],
      rows: [
        { key: 1 },
        { key: 2 },
        { key: 4 },
        { key: 5 },
        { key: 6 },
        { key: 7 },
        { key: 8 },
        { key: 9 },
        // { key: 10 },
        // { key: 11 },
        // { key: 12 },
        // { key: 13 },
        // { key: 14 },
        // { key: 15 },
        // { key: 16 },
        // { key: 17 },
        // { key: 18 },
        // { key: 19 },
        // { key: 20 },
        // { key: 21 },
        // { key: 22 },
        // { key: 23 },
        // { key: 24 },
        // { key: 25 },
        // { key: 26 },
        // { key: 27 },
        // { key: 28 },
        // { key: 29 },
        // { key: 30 },
        // { key: 31 },
        // { key: 32 },
        // { key: 33 },
        // { key: 34 },
        // { key: 35 },
        // { key: 36 },
        // { key: 37 },
      ],
    },
  },
  inputCombo: {
    name: "Code input",
    component: CodeInput,
    icon: "build",
    defaultProps: {
      size: 2,
      disabled: false,
      props: {
        fieldName: "",
      },
    },
  },
  image: {
    name: "Image",
    component: Image,
    icon: "picture",
    defaultProps: { width: 64, height: 64 },
  },
  inputNumber: {
    name: "InputNumber",
    component: InputNumber,
    icon: "edit",
    defaultProps: {},
  },
  inputGroup: {
    name: "Input Group",
    component: InputGroup,
    icon: "edit",
    defaultProps: {},
  },
  input: { name: "Input", component: Input, icon: "edit", defaultProps: {} },
  arrayConverter: {
    name: "Array Converter",
    component: ArrayConverter,
    icon: "edit",
    defaultProps: {},
  },
  title: {
    name: "Title",
    component: Title,
    icon: "edit",
    defaultProps: {},
  },
  nameWrapper: {
    name: "Field wrapper",
    component: NameWrapper,
    icon: "build",
    defaultProps: {},
  },
  electronicSignature: {
    name: "Electronic Signature",
    component: ElectronicSignature,
    icon: "file-done",
    defaultProps: {},
  },
  breakLine: {
    name: "Break Line",
    component: BreakLine,
    icon: "minus",
    defaultProps: {},
  },
};
