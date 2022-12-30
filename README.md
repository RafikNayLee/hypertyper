# CAPSTONE - CS50W's Final Project

### App Name :

Hyper Typer

### Functionality :

A touch typing assistant.

### Distinctiveness and Complexity

The app is clearly distinct from the projects done throughout the CS50W course and its complexity can be emphasized by the folliwing points:

1. The backend API coded in the django framework leveraged the "djangorestframework" library, this required going through the documentation to effectively implement it
2. The Django framework allowed me to build a full stack app using three 4 apps in the project: a landing page (landingpage), the backend (typer and stats) and a frontend react app (frontend)
3. The frontend was fairly complex as I had to learn to interact with svg elements and build visuals with the "d3" library"

### Code Organisation

The app is structure in three parts

1. Landing Page
2. React App
3. Django Rest API

## Landing Page

The landing page is **responsive** and served by the django framework as the first thing the user sees.

## React APP

The React APP is situated in the /frontend folder and is just another django app inside the project.

It can be accessed via the "/app" relative url

The principal react libraries used in this project are: react-bootstrap for its ui components, axios to make api calls, react-i18next for internationalization (english and french) and d3 to build some visualisations.

The React app is responsible for showing the user a login and sign up page, a main page showing available touch typing courses and an interactive exercice page showing an SVG keyboard that updates while the user starts typing along with hints on what fingers are to be used to type each character.

Once the exercice is completed the user can save their progress and the react app will make the proper api call and updates the page.

The Courses Page also displays graphs that help the user track their progress

### React App file structure

#### assets >

this folder contains the different svg files this project is using (Hand and Keyboard)

#### components >

this folder contains the different React components coded for this app.

- charts: Bar Charts and Line Charts
- common: Avatar and AvatarCard to be used in the login page, a button with a tooltip, an Error Alert, a Badge displaying the course level (beginner, intermediate and expert), a loading component ...
- course: the courses page is composed of the components of this folder. A CourseCard, A Menu of Available Lessons in one course (CourseDisplay) and a Title for the course.
- form: Special text field component to be used for the typing exercice
- keyboard: the different keyboard React components to be placed in the exercice page (Keyboard, Keys, Hands, HintKey)
- layout: layout components used in this project are a navbar (Header) and BreadCrumbs for easy navigation. Also a Button with the sole purpose of changing the locale (english and french)
- lesson: the different lessons pages are componsed using the different components in this folder
- section: a section is way to group different lessons, this folder has only one component which is a menu of a group of lessons belonging to one session

#### Context

this project uses react context to track the authenticated user

#### hooks

this project also uses only functional components (no react class components) and uses hooks for the many functionalities the app requires

- d3
- api calls
- a global style theme
- ...

#### localization

This app uses i18n to be displayed in two languages: french and english

#### pages

This folder inhabits the many pages the app displays

- a Login Page
- a Sign Up Page
- a Home Page diplaying the different courses
- a Course Page displaying the different lessons of the chosen course
- a Section Page displaying the different lessons of the chosen section
- a Lesson Page: this is where most of the logic resides, this page is composed of a text field and an SVG visual (A Keyboard and Two Hands) that is color coded to be animated whenever the user types a letter. There are hints under the keyboard too that tells the user which finger is to be used. The user can start a lesson, reset it, navigate to the next lesson and display the score history for this lesson

## Django Rest API

The rest api is in the "typer" folder and uses the django rest framework to serve the api.

### Models

The models used in this project are:

1. Level: used to store the lesson level (Beginner, Intermediate or Expert)
2. Course: a course can contain many sections and many lessons
3. Section: a section is part of a course and can contain many lessons
4. Lesson: a lesson can have a text and the min accuracy and words per minutes (wpm) required to pass it.
5. Exercice: this model is used to record the user's performance on any lesson. It will store the user, seconds, text typed. It also has calculated fields to keep track of the exercice state (completed or not), mistakes, accuracy, number of words ...

### Serializers

The serializers to be used by the Rest api framework for each one of the models stated above.

### api

We import the viewset module from the Django restframework to define the api will serve each data type (Course, Lesson, Exercice ... ) and how it is to be accessed by specifying user permissions for each one and how it will access the data and return it.

### tests

Only integration tests were written for this project by hitting the many api points and testing the returned results and eventual errors

### Stats

Another api called "stats" is also coded for this project.
It is made of two views that return the user progress (exercices completed / available lessons) and the highscore.

### Executing the app locally

The app can be served locally by moving into the "hypertyper" folder and running the "python manage.py runserver" command
