all:
	@make prodbuild
	@make produpload
	echo "Product is ready on cloudflare"
	@make resetdb

install:
	npm install 
	echo "Product dependecies installed"

prodbuild:
	npm run build
	@echo "Product is built"

produpload:
	npx wrangler pages deploy --branch main build 
	@echo "Uploading to cloudflare"


resetdb:
	cd kvspace ; ./uploademployee
	@echo "database in cloudflare is initialized"

