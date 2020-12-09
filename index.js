import { PureComponent } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import barcodes from 'jsbarcode/src/barcodes';
import JsBarcode from 'jsbarcode';
import { Surface, Shape } from '@react-native-community/art';

const styles = StyleSheet.create({
  svgContainer: {
    alignItems: 'center',
    padding: 10,
    width: Dimensions.get('screen').width - 20,
  },
});

class BarcodeComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      barCodeWidth: 0,
    };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.update(this.props);
    }
  }

  update() {
    const data = {};
    JsBarcode(data, this.props.value, { format: this.props.format });
    let encodedData = '';
    data.encodings.map((row) => {
      encodedData += row.data;
      return true;
    });
    this.state.bars = this.drawSvgBarCode(encodedData, this.props);
    this.state.barCodeWidth = encodedData.length * this.props.width;
  }

  drawSvgBarCode(binary, options = {}) {
    const rects = [];
    let barWidth = 0;
    let x = 0;
    const yFrom = 0;
    for (let b = 0; b < binary.length; b += 1) {
      x = b * options.width;
      if (binary[b] === '1') {
        barWidth += 1;
      } else if (barWidth > 0) {
        rects[rects.length] = this.drawRect(
          x - options.width * barWidth,
          yFrom,
          options.width * barWidth,
          options.height,
        );
        barWidth = 0;
      }
    }
    // Last draw is needed since the barcode ends with 1
    if (barWidth > 0) {
      rects[rects.length] = this.drawRect(
        x - options.width * (barWidth - 1),
        yFrom,
        options.width * barWidth,
        options.height,
      );
    }

    return rects;
  }

  drawRect(x, y, width, height) {
    return `M${x},${y}h${width}v${height}h-${width}z`;
  }

  render() {
    this.update();
    const backgroundStyle = {
      backgroundColor: this.props.background,
    };
    return (
      <View style={[styles.svgContainer, backgroundStyle]}>
        <Surface height={this.props.height} width={this.state.barCodeWidth}>
          <Shape d={this.state.bars} fill={this.props.lineColor} />
        </Surface>
        {typeof this.props.text !== 'undefined' && (
          <Text
            style={{
              color: this.props.textColor,
              width: this.state.barCodeWidth,
              textAlign: 'center',
            }}
          >
            {this.props.text}
          </Text>
        )}
      </View>
    );
  }
}

BarcodeComponent.propTypes = {
  /* what the barCode stands for */
  value: PropTypes.string,
  /* Select which barcode type to use */
  format: PropTypes.oneOf(Object.keys(barcodes)),
  /* Override the text that is displayed */
  text: PropTypes.string,
  /* The width option is the width of a single bar. */
  width: PropTypes.number,
  /* The height of the barcode. */
  height: PropTypes.number,
  /* Set the color of the bars */
  lineColor: PropTypes.string,
  /* Set the color of the text. */
  textColor: PropTypes.string,
  /* Set the background of the barcode. */
  background: PropTypes.string,
};

BarcodeComponent.defaultProps = {
  value: undefined,
  format: 'CODE128',
  text: undefined,
  width: 3,
  height: Dimensions.get('screen').height / 3,
  lineColor: '#000000',
  textColor: '#000000',
  background: '#ffffff',
};

export default BarcodeComponent;
