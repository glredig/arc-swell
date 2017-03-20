# ArcSwell

Lightweight image gallery library.

## Usage

ArcSwell hits an API and expects a JSON file containing image information in the form:

```
  {
	"count": 3,
	"images": [
		{
			"src": {
			  "thumb": image_thumb_url,
			  "full": image_url
			},
			"text": "Caption info"
		},
		{
			"src": {
			  "thumb": image_thumb_url,
			  "full": image_url
			},
			"text": "Caption info"
		},
		{
			"src": {
			  "thumb": image_thumb_url,
			  "full": image_url
			},
			"text": "Caption info"
		},
		...
	]
}
```

To initialize the gallery, create an element with attribute `data-arc-swell` on it which points to the API endpoint:

```
<div data-arc-swell='path/to/images.json'></div>
```

The gallery will populate the thumbnails from the json.