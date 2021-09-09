lint:
	yarn prettier --write .

install:
	yarn install

build: $(arg1)
	cd ./packages/$(path) && yarn rollup -c ../../rollup.config.js

test: $(arg1)
	yarn jest --coverage ./packages/$(path)

clean: $(arg1)
	rm -rf ./packages/$(path)/node_modules
	rm -rf ./packages/$(path)/dist

release:
	yarn conventional-changelog -p angular -i CHANGELOG.md -s

build-all:
	node scripts/walk packages yarn rollup -c ../../rollup.config.js

test-all:
	yarn jest --coverage ./packages

clean-all:
	node scripts/walk packages rm -rf node_modules
	node scripts/walk packages rm -rf dist
	rm -rf node_modules
	rm -rf dist

install-examples:
	node scripts/walk examples yarn install

build-examples:
	node scripts/walk examples yarn build

test-examples:
	yarn jest --coverage ./examples

clean-examples:
	node scripts/walk examples rm -rf node_modules
	node scripts/walk examples rm -rf dist
