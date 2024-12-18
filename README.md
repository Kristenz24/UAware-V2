# UAware: Manage Missing Items

***UAware*** is a web application designed to help users track and recover lost items. It simplifies the process of managing and locating missing belongings in a seamless, user-friendly way.

## Note: Downloading as a ZIP
- Downloading this project as a ZIP file may occasionally trigger a ``"Virus Detected"`` warning in some web browsers. This is because the project may mimic behaviors that are mistakenly flagged as malware.

- To verify if yourself, you can upload the ZIP file to ``VirusTotal``, which provides a comprehensive analysis of the file, this would verify that this project is just a ``false positive``

## Prerequisites
Make sure you have the following installed:
- Node JS
- MySQL
- Git

## Obtaining a Copy
- Fork the repository and clone it to your local machine

## Installing the Dependencies
Follow these steps to get the project up and running locally:

- Navigate to the backend directory
```bash
cd backend
```

- Install the dependencies
```bash
npm install
```

## Setting up Environmental Variables
- Create a new file named `.env` and paste these:
```bash
MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PASSWORD='<YOUR_MySQL_PASSWORD>' 
MYSQL_DATABASE='uaware'
PORT=8080
```
> NOTE : You must use your own MySQL password for it to work

## Running The Project
- Navigate on to the backend
```bash
cd backend
```
Lastly, type `npm run dev` or `npm start`

