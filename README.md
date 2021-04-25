# LibraryManagementSystem
Library management system for devClub recruitment using MERN stack.

Website hosted at - https://library-chaxu.herokuapp.com

Backend hosted at - https://library-backend-chaxu.herokuapp.com

### Running on Local Environment

1. Clone the repository using `git clone`
2. Move inside backend directory using terminal `cd backend`
3. Run `npm install` 
4. Rename the file `keys_sample.js` inside `backend/config` with `keys.js`.
5. Paste the code from given doc inside the `keys.js` file and save it. (Doc - https://docs.google.com/document/d/1LIfrXZWLzMiRUST3vqXc-ilRC2ZkvA222cXfrydDuUU/edit)
6. Run the server using command `nodemon server.js` in the terminal on port 3000. (Ensure you are inside the backend directory).
7. Open a new terminal and move to `library-management` directory inside repo which is our frontend.
8. Run `npm install`.
9. Replace the `baseURl` inside `axios.js` with your server URL. (If hosted on port 300, `http://localhost:3000/`)
10. Save the file and run the application with command `npm start`.
