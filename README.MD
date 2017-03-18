# ArcSwell

Lightweight image gallery library.

## Usage

ArcSwell hits an API and expects a JSON file containing image information in the form:

```
  {
	"count": 3,
	"images": [
		{
			"src": image_url,
			"text": "Caption info"
		},
		{
			"src": image_url,
			"text": "Caption info"
		},
		{
			"src": image_url,
			"text": "Caption info"
		},
		...
	]
}
```