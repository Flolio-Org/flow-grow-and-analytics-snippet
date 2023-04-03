## how to create build for each creator platform 
  - collection-website specific code is written in `{collectionSlug}Utils` file, this way logic that differs from common functionality is seprated.

  steps to build 
  1. check main.js for utils import if its not matching your desired collection file,find and replace it with "{collectionSlug}Utils" in entire project 
  2. update "snippetId" in config file with collection slug
  3. run "npm run build" at root directory 
  4. check "dist/assets/js" folder for final file 

## how to add more collection sites 
1. update "snippetId" in config file with collection slug
2. create a file with collection slug name ex: `{collectionSlug}Utils.js` 
3. copy any other already build utils file and update on function execution content, Please note DO NOT change function name or arguments.