
# react-native-barcode

## Getting started

`$ npm install react-native-barcode --save`

### Mostly automatic installation

`$ react-native link react-native-barcode`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-barcode` and add `RNBarcode.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBarcode.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNBarcodePackage;` to the imports at the top of the file
  - Add `new RNBarcodePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-barcode'
  	project(':react-native-barcode').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-barcode/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-barcode')
  	```

## Usage
```javascript
import RNBarcode from 'react-native-barcode';

// TODO: What do with the module?
RNBarcode;
```
