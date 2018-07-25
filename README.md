# AMS
Athlete Management System

# Pre-requisite
````
* PHP 7.2.2 [ GET: http://php.net/releases/7_2_2.php ]
* composer 1.6.3 [ GET: https://getcomposer.org/download/ ]
* npm 6.2.0 [ GET: https://nodejs.org/en/ ]
````

# Setup environment context

* Clone GIT repo:
    ````
    $ git clone https://github.com/nilesh369/ams2.git 
    ````
* Goto `ams2` folder: 
    ````
    $ cd ams2
    ````
* Copy `.env.example` - setup file as `.env` file
    ````
    $ cp .env.example .env
    ````
* Setup database parameters in .env: 
    ````
    DB_CONNECTION=mysql
    DB_HOST=< SET DBSERVER >
    DB_PORT=3306
    DB_DATABASE=< SET DB >
    DB_USERNAME=< SET DBUSER >
    DB_PASSWORD=< SET DBPWD >
    ````

# Installation & Execution script
    $ chmod +x setup.sh
    $ ./setup.sh 

# Server should start as `http://localhost:8000`

# Navigate through: `http://localhost:8000`
* Login as:
    ````
    Username: admin@ams.com
    Password: 123456
    ````

# API Endpoints for Authentication and Registration
````
JSON data format for the athlete:
{
    'name': String, // Full Name
    'email': String, // Unique Email
    'password': String, // Password (Min: 6 characters)
    'password_confirmation': String, // Confirm Password
}

Return Token:
{
    'api_token': String, // Unique token for data accesses
}
````
* POST: `/api/register`: Register a new user
* POST: `/api/login`: Log In and access a new token
* POST: `/api/logout`: Log out and invalidate a token

# API Endpoints for Athlete
````
JSON data format for the athlete:
{
    'api_token': String, // Specify obtained token
    'name': String, // Full Name
    'dob': Date, // Date of birth
    'age': Integer, // Age
    'height': Float, // Height     
    'weight': Float, // Weight
}
````
* GET: `/api/athletes`: Obtain a list of all the athletes
* GET: `/api/athletes/{id}`: Obtain a detail for a given athlete
* POST: `/api/athletes`: Create a new athlete
* PUT: `/api/athletes/{id}`: Update a given athlete
* DELETE: `/api/athletes/{id}`: Delete a given athlete

# API Endpoints for Team
````
JSON data format for the Team:
{
    'api_token': String, // Specify obtained token
    'name': String, // Title
    'logo': String, // URL of a logo image
}
````
* GET: `/teams`: Obtain a list of all the teams
* GET: `/teams/{id}`: Obtain a detail for a given team
* POST: `/teams`: Create a new team
* PUT: `/teams/{id}`: Update a given team
* DELETE: `/teams/{id}`: Delete a given team

# API Endpoints for Sport
````
JSON data format for the Sport:
{
    'api_token': String, // Specify obtained token
    'name': String, // Title
}
````
* GET: `/sports`: Obtain a list of all the sports
* GET: `/sports/{id}`: Obtain a detail for a given sport
* POST: `/sports`: Create a new sport
* PUT: `/sports/{id}`: Update a given sport
* DELETE: `/sports/{id}`: Delete a given sport

# API Endpoints for Athlete-Team-Sport (ats) relationship
````
JSON data format for the Sport:
{
    'api_token': String, // Specify obtained token
    'dop': Date, // Date of play
    'aid': Integer, // Athlete ID
    'tid': Integer, // Team ID
    'sid': Integer, // Sport ID
}
````
* GET: `/ats`: Obtain a list of all the ats
* GET: `/ats/{id}`: Obtain a detail for a given ats
* POST: `/ats`: Create a new ats
* PUT: `/ats/{id}`: Update a given ats
* DELETE: `/ats/{id}`: Delete a given ats

# API Endpoints for Other data
````
JSON data format for the Sport:
{
    'api_token': String, // Specify obtained token
}
````
* GET: `/ats/ta/{id}`: Obtain a list of teams for a given athlete `id`
* GET: `/ats/ts/{id}`: Obtain a list of teams for a given sport `id`
* GET: `/ats/at/{id}`: Obtain a list of athletes for a given team `id`
* GET: `/ats/as/{id}`: Obtain a list of athletes for a given sport `id`
* GET: `/ats/sa/{id}`: Obtain a list of sports for a given athlete `id`
* GET: `/ats/st/{id}`: Obtain a list of sports for a given team `id`


