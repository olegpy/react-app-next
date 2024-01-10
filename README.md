## SSR List of books

Here I realised a simple demo project for Next.js. 

It is a simple web application that allows you to see list of books from server by SSR and to CRUD for them.

#### Redux
I created a simple store for books in folder store. It is a simple reducer with actions and types.

We have in folder components:
- Book/BookItem - component for item of books
- Book/BookEditForm - component for edit form of book

- global/{Footer, Header, Layout} - components for global layout of app

### Used technologies
```bash
React 18.2.0
Next.js 14.0.4
Redux
TypeScript
Jest
```

#### For run project we can write in terminal:
```bash
npm i && npm run dev
```

#### For run tests we can write in terminal:
```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
