
# react-native-barcode-builder

A component for react native to generate barcode. Inspired by [JsBarcode](https://github.com/lindell/JsBarcode), depend on [react-native-svg](https://github.com/react-native-community/react-native-svg)。

## Getting started

#### Step 1

Install react-native-svg

`npm install react-native-svg --save && react-native link react-native-svg`

#### Step 2
Install react-native-barcode-builder

`npm install react-native-barcode-builder --save`


#### Step 3
Start using the component

```javascript
import Barcode from 'react-native-barcode-builder';

<Barcode value="Hello World" format="CODE128" />
```

Available formats are shown in the following:

```
/* Select which barcode type to use */
format: PropTypes.oneOf([
  'codabar',
  'CODE39',
  'CODE128', 'CODE128A', 'CODE128B', 'CODE128C', // Note: Using 'CODE128' will automatically detect which subtype you need and use it.
  'EAN2', 'EAN5', 'EAN8', 'EAN13',
  'UPC',
  'GenericBarcode',
  'ITF', 'ITF14',
  'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110', // Note: Using 'MSI' will automatically detect which subtype you need and use it.
  'pharmacode'
])
```

![](./images/example.png)

## Properties

<table style="width:80%">
  <tr>
    <th>Property</th>
    <th>Description</th> 
  </tr>
  <tr>
    <td><code>value</code></td>
    <td>What the barcode stands for (required).</td> 
  </tr>
  <tr>
    <td><code>format</code></td>
    <td>Which barcode type to use (default: CODE128).</td> 
  </tr>
  <tr>
    <td><code>text</code></td>
    <td>Override text that is displayed.</td> 
  </tr>
  <tr>
    <td><code>width</code></td>
    <td>Width of a single bar (default: 2)</td> 
  </tr>
  <tr>
    <td><code>height</code></td>
    <td>Height of the barcode (default: 100)</td> 
  </tr>
  <tr>
    <td><code>lineColor</code></td>
    <td>Color of the bars and text (default: #000000)</td> 
  </tr>
  <tr>
    <td><code>background</code></td>
    <td>Background color of the barcode (default: #ffffff)</td> 
  </tr>
  <tr>
    <td><code>onError</code></td>
    <td>Handler for invalid barcode of selected format</td> 
  </tr>
</table>
