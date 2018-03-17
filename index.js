import React, { PureComponent } from 'react';
import { View, StyleSheet, ART, Text } from 'react-native';
import PropTypes from 'prop-types';

import barcodes from 'jsbarcode/src/barcodes';

const { Surface, Shape } = ART;

export default class Barcode extends PureComponent {
  static propTypes = {
    /* what the barCode stands for */
    value: PropTypes.string,
    /* Select which barcode type to use */
    format: PropTypes.oneOf(Object.keys(barcodes)),
    /* Overide the text that is diplayed */
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
    /* Handle error for invalid barcode of selected format */
    onError: PropTypes.func
  };

  static defaultProps = {
    value: undefined,
    format: 'CODE128',
    text: undefined,
    width: 2,
    height: 100,
    lineColor: '#000000',
    textColor: '#000000',
    background: '#ffffff',
    onError: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      barCodeWidth: 0
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.update(nextProps);
    }
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const encoder = barcodes[this.props.format];
    const encoded = this.encode(this.props.value, encoder, this.props);

    if (encoded) {
      this.state.bars = this.drawSvgBarCode(encoded, this.props);
      this.state.barCodeWidth = encoded.data.length * this.props.width;
    }
  }

  drawSvgBarCode(encoding, options = {}) {
    const rects = [];
    // binary data of barcode
    const binary = encoding.data;

    let barWidth = 0;
    let x = 0;
    let yFrom = 0;
    // alert(JSON.stringify(options));

    for (let b = 0; b < binary.length; b++) {
      x = b * options.width;
      if (binary[b] === '1') {
        barWidth++;
      } else if (barWidth > 0) {
        rects[rects.length] = this.drawRect(
          x - options.width * barWidth,
          yFrom,
          options.width * barWidth,
          options.height
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
        options.height
      );
    }

    return rects;
  }

  drawRect(x, y, width, height) {
    return `M${x},${y}h${width}v${height}h-${width}z`;
  }

  getTotalWidthOfEncodings(encodings) {
    let totalWidth = 0;
    for (let i = 0; i < encodings.length; i++) {
      totalWidth += encodings[i].width;
    }
    return totalWidth;
  }

  // encode() handles the Encoder call and builds the binary string to be rendered
  encode(text, Encoder, options) {
    // Ensure that text is a string
    text = '' + text;

    var encoder;

    try {
      encoder = new Encoder(text, options);
    } catch (error) {
      // If the encoder could not be instantiated, throw error.
      if (this.props.onError)  {
        this.props.onError(new Error('Invalid barcode format.'));
        return;
      } else {
        throw new Error('Invalid barcode format.');
      }
    }

    // If the input is not valid for the encoder, throw error.
    if (!encoder.valid()) {
      if (this.props.onError) {
        this.props.onError(new Error('Invalid barcode for selected format.'));
        return;
      } else {
        throw new Error('Invalid barcode for selected format.');
      }
    }

    // Make a request for the binary data (and other infromation) that should be rendered
    // encoded stucture is {
    //  text: 'xxxxx',
    //  data: '110100100001....'
    // }
    var encoded = encoder.encode();

    return encoded;
  }

  render() {
    this.update();
    const backgroundStyle = {
      backgroundColor: this.props.background
    };
    return (
      <View style={[styles.svgContainer, backgroundStyle]}>
        <Surface height={this.props.height} width={this.state.barCodeWidth}>
          <Shape d={this.state.bars} fill={this.props.lineColor} />
        </Surface>
        { typeof(this.props.text) != 'undefined' &&
          <Text style={{color: this.props.textColor, width: this.state.barCodeWidth, textAlign: 'center'}} >{this.props.text}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  svgContainer: {
    alignItems: 'center',
    padding: 10
  }
});
