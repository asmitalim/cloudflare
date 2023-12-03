all:
	@make prodbuild
	@make produpload
	echo "Product is ready on cloudflare"


prodbuild:
	npm run build
	@echo "Product is built"

produpload:
	npx wrangler pages deploy --branch main build 
	@echo "Uploading to cloudflare"

