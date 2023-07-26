# react_flask_demo
This repository holds an example of the integration of ReactJS and Flask in the backend

![HomeImage](https://github.com/BenAichaMed/react_flask_demo/blob/main/frontend/src/assets/HomeImage.png).

# Overview
![Architecture](https://github.com/BenAichaMed/react_flask_demo/blob/main/frontend/src/assets/architecture.drawio.png).


# Getting Started
To get you started you can simply clone the react_flask_demo repository and install the dependencies:

## Pre-requisites
* You need git to clone the react_flask_demo repository.<br/>
* Download and Install git from [http://git-scm.com/.](https://git-scm.com/).<br/>
* You must have node.js and its package manager (npm) installed.<br/>
* Download and Install NodeJs from [http://nodejs.org/.](http://nodejs.org/.).<br/>

## Clone react_flask_demo
Clone the demo using [git](https://git-scm.com/)
```bash
git clone https://github.com/BenAichaMed/react_flask_demo.git
```
## Install Dependencies
We have two kinds of dependencies in this project : Flask and React 

So in the frontend directory we have to run :
```bash
cd frontend
npm install
```
and in the backend directory we have to run : 
```bash
cd backend
pip install -r requirements.txt
```

## Run the Application

To run the frontend server simply run :
```bash
npm run dev
```
To run the backend server run:
```bash
python backend/src/main/app.py
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
    │   │   ├── ChartPage.jsx
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


