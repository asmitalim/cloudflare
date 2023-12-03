all:
	echo "Product is built"


prodbuild:
	echo "Product is built"
	npm run build

produpload:
	echo "Uploading to cloudflare"
	npx wrangler pages deploy --branch main build 

