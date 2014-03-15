# Fireball

Help determine accessibility issues with images by using the Tesseract OCR
engine to read text in images and compare it to the `alt` attribute found in
inline image elements.

## Usage

### Command-line Interface

```shell
$ altar --html http://www.mysite.com/
BAD: http://www.mysite.com/image-without-alt.png
GOOD: http://www.mysite.com/image-with-alt.png
```

```shell
$ altar --help

Usage: altar [options] <url>

Options:

  -H, --html <file> Generate an HTML report
  -j, --json <file> Generate a JSON report
  -n, --no-color Disables color in reporting output
  -h, --help Display this help
```

### Programmatic API

#### Callback

```javascript
require("altar")
  .createReport("http://www.mysite.com/")
  .run(function (images) {
    console.log("All done!");
  });
```

#### Events

```javascript
var altar = require("altar");
var report = altar.createReport("http://www.mysite.com/");

report.on("image", function (image) {
  console.log("Found an image:", image.url, image.altText, image.readText);
});

report.on("progress", function (currentIndex, total) {
  console.log("Processed %s of %s images", currentIndex, total);
});

report.on("end", function (images) {
  console.log("All done!", images);
});

report.run();
```

## License

Copyright (c) 2014 Ben Truyman

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
