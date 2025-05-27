# Text2Path

Text2Path is based on the Potrace algorithm and enables text-to-SVG path conversion in the browser.

## Installation

```bash
npm install @kcaitech/text2path

```

## Usage

```javascript
import { text2path } from '@kcaitech/text2path';

// Get SVG path data for character 'A'
const path = text2path('Arial', 32, false, 400, 'A'.charCodeAt(0));

```

## API Documentation

### text2path(font, fontSize, italic, weight, charCode)

Converts a single character to SVG path data.

#### Parameters

- `font` (string): Font name
- `fontSize` (number): Font size
- `italic` (boolean): Whether to use italic style
- `weight` (number): Font weight (e.g., 400 for normal, 700 for bold)
- `charCode` (number): Unicode code point of the character

#### Return Value

Returns a standard SVG path data string.

## How It Works

1. Render text on Canvas
2. Get pixel data of the text
3. Extract contours using Potrace algorithm
4. Generate SVG path data
5. Cache results for better performance

## License

GPL-2.0, inherited from potrace-ts