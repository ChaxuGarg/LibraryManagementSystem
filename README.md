# LibraryManagementSystem
Library management system for devClub recruitment using MERN stack.

Website hosted at - https://library-chaxu.herokuapp.com

Backend hosted at - https://library-backend-chaxu.herokuapp.com

### Running on Local Environment

1. Clone the repository using `git clone`
2. Move inside backend directory using terminal `cd backend`
3. Run `npm install` 
4. Rename the file `keys_sample.js` inside `backend/config` with `keys.js`.
5. Paste the code from given doc inside the `keys.js` file and save it. (Doc - https://docs.google.com/document/d/1LIfrXZWLzMiRUST3vqXc-ilRC2ZkvA222cXfrydDuUU/edit?usp=sharing)
6. Run the server using command `nodemon server.js` in the terminal on port 3000. (Ensure you are inside the backend directory).
7. Open a new terminal and move to `library-management` directory inside repo which is our frontend.
8. Run `npm install`.
9. Replace the `baseURl` inside `axios.js` with your server URL. (If hosted on port 300, `http://localhost:3000/`)
10. Save the file and run the application with command `npm start`.

### Design Document
 * Passwords are hashed using `bcryptjs` and communicated through `jwt tokens` between frontend and backend.
 * Login system requires a name, email (unique), username (unique) and a password, and stored in User collection of database. Register page displays appropriate errors.
 * Default accessLevel is set as **user** when a user registers. Librarian access can be provided and revoked by admins through users list.
 * Any user can view book list from dashboard and search books. There's a separate page for each book for more details.
 * Librarians and admins can edit book details from book page.
 * A book with 0 available copies cannot be requested to borrow. Available copies decreases by 1 when a librarian accepts a new request for a book.
 * Users can request to borrow a book from book page with only return date. If the request is accepted, he/she can also renew it from the same page.
 * Books, users and requests data are stored in separate database collections. Schemas of these collections have been defined in the backend.
 * When a librarian rejects a new request, it is deleted altogether.
 * A user can see list of his accepted and pending requests with due dates.
 * Librarians can accept/reject requests in the view requests page.
 * Appropriate errors are shown on every form.
 * A user remains logged on for a given time period until logged out.
 * Users are redirected to login page if not authenticated.
 * Users are redirected to dashboard if accessing page they don't have access to.
