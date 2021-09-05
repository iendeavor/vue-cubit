lint:
	yarn prettier --write .

test:
	yarn jest --coverage ./packages

install-all:
	yarn install
	node scripts/walk-examples yarn install

test-all:
	yarn jest --coverage

clean-all:
	node scripts/walk-examples rm -rf node_modules
	rm -rf node_modules
