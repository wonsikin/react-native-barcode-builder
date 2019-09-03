import React from 'react'

export type Format = 'CODE128' | 'EAN' | 'CODE39' | 'ITF' | 'MSI' | 'Pharmacode' | 'Codabar'

export interface BarcodeProps {
    value: string
    format: Format
    text?: string
    width?: number
    height?: number
    lineColor?: string
    textColor?: string
    background?: string
    onError?: (error: Error) => void
}

declare class Barcode extends React.PureComponent<BarcodeProps, any> {}

export default Barcode
