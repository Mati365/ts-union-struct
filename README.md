# ts-union-struct

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Small typescript utility class that helps with creating bit fields and C unions

## Installation
```
yarn add ts-union-struct
```

## Usage

```typescript
import UnionStruct, {bits} from 'ts-union-struct';

class Register extends UnionStruct {
  @bits(0) lsb: number;
  @bits(15) msb: number;

  @bits(0, 7) low: number;
  @bits(8, 15) high: number;
}

// later in code..
const reg = new Register(0xFF_EE);

reg.number; // => 0xFF_EE
reg.low = 0x0;
reg.number; // => 0xFF_00

// pack plain object into union
const reg1 = Register.pack(
  {
    low: 0x0,
    high: 0xFF,
  }
);
reg1.number; // => 0xFF_00

// unpack
const reg = new Register(0xFF_EE);
reg.unpack(); // {low: 0xEE, high: 0xFF}
```

## License

The MIT License (MIT)
Copyright (c) 2020 Mateusz Bagiński

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
