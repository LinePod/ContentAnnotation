# ContentAnnotation

Is used to mark areas of images with labels which can then be hovered over and spoken back to the person.
Useful to make a tactile image easier to understand.

## Usage

- Run ```python2.7 -m SimpleHTTPServer 8000``` in parent directory
- Go to ```http://localhost:8000/annotator.html```
- Paste link to picture in textbox and click the button
- Draw rectangles and label areas on the picture
- Open Console with F12 and copy last string, these are the polygons with labels attached
- Go to ```http://localhost:8000/reader.html```
- Paste the string in the textbox and click enter
- When hovering over the areas previously marked the system will speak out the labels
