# react-native-barcode-builder

React Native component to generate barcodes. Uses [JsBarcode](https://github.com/lindell/JsBarcode) for encoding of data.

## Getting started

### Step 1

This library uses [@react-native-community/art](https://github.com/react-native-community/art) to draw vector graphics.

### Step 2

Install `react-native-barcode-builder`:

```shell
    npm install react-native-barcode-builder --save
```

### Step 3

Start using the component

```javascript
import Barcode from "react-native-barcode-builder";

<Barcode value="Hello World" format="CODE128" />;
```

You can find more info about the supported barcodes in the [JsBarcode README](https://github.com/lindell/JsBarcode#supported-barcodes).

![demo](./images/example.png)

## Properties

| Property   | Description                                        |
| ---------- | -------------------------------------------------- |
| value      | What the barcode stands for (required).            |
| format     | Which barcode type to use (default: CODE128).      |
| width      | Width of a single bar (default: 2)                 |
| height     | Height of the barcode (default: 100)               |
| text       | Override text that is displayed.                   |
| lineColor  | Color of the bars and text (default: #000000)      |
| background | Background color of the barcode (default: #ffffff) |
| onError    | Handler for invalid barcode of selected format     |
