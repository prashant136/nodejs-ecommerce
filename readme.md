## 1. -------- Development dependencies ----------

-   typescript: For TypeScript support.

-   ts-node: To execute TypeScript files without pre-compiling.

-   nodemon: For automatic reloading during development.

-   @types/express: TypeScript definitions for Express.

## 2. -------- Setup tsconfig.json ----------

-   npx tsc --init

## 3. -------- In the tsconfig.json, make sure the following settings are enabled or updated ------

{
"compilerOptions": {
"target": "ES6",  
 "module": "commonjs",  
 "outDir": "./dist",  
 "rootDir": "./src",  
 "strict": true,  
 "esModuleInterop": true,  
 "skipLibCheck": true  
 }
}

## 4. --------- create folder structure --------

/node-ts-express-app
│
├── /src
│ └── index.ts
├── tsconfig.json
├── package.json

## 5. ----------- In package.json, add the following to the scripts section -

"scripts": {
"start": "nodemon --exec ts-node ./src/index.ts"
}

## -------------------------------------------------------------------------------

-   npm install prisma @prisma/client
-   npx prisma init
