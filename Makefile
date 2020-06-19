install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .
	
test:
	npm run test

publish:
	npm publish --dry-run

.PHONY: test log