# react_flask_demo
This is an interview demo
# Getting Started
To get you started you can simply clone the react_flask_demo repository and install the dependencies:

## Prerequisites
You need git to clone the angular-seed repository. You can get git from [http://git-scm.com/.](https://git-scm.com/)
You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/.](http://nodejs.org/.)

## Clone react_flask_demo
Clone the demo using [git](https://git-scm.com/)
```bash
git clone https://github.com/BenAichaMed/react_flask_demo.git
```
## Install Dependencies
We have two kinds of dependencies in this project : flask and react 

So in the frontend directory we have to run :
```bash
npm install
```
and in the backend directory we have to run : 
```bash
pip install
```

## Run the Application

To run the frontend server simply type :
```bash
npm run dev
```
To run the backend server we need to go backend/src/main and run:
```bash
python app.py
```
Now browse to the app at `http://localhost:5173/`

```bash
├──backend
    ├── src
    ├── main
    │   ├── app.py
    │   ├── requirements.txt

├──frontend
    ├── public
    ├── src
    │   ├── assets
    │   ├── components
    │   │   ├── DataTable.jsx
    │   │   ├── Filter.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── SideBar.jsx
    │   ├── pages
    │   │   ├── HomePage.jsx
    │   │   ├── GridPage.jsx
    │   │   ├── ChartPage;jsx
    │   ├── styles
    │   │   ├── Navbar.css
    │   │   ├── SideBar.css
    │   │   ├── button.scss
    │   ├── App.jsx
    │   ├── main.jsx
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── vite.config.js
├── README.md
```


