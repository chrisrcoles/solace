# **Solution**



## Tasks

1. Fix any glaring bugs and anti patterns.
2. Improve the design UI/UX to make the experience better for prospective patients. We value design heavily at Solace so feel free to flex your skills in this area. The repo is set up with tailwind but feel free to use any styling framework you’d like.
3. Consider both frontend and backend performance improvements. Assume we have a database of hundreds of thousands of advocates we need to search through.

## Frontend Fixes
[X] Missing `key` prop in list rendering 
[X] Direct DOM manipulation in `page.tsx`. 
- Bug: Code uses document.getElementById("search-term").innerHTML = searchTerm; inside the onChange handler.
[X] Table <th> Elements Not Inside <tr>
- Bug: In your table, <th> elements are direct children of <thead>, but they should be inside a <tr>.
[X] No Error Handling for Fetch
Bug: The fetch call in useEffect does not handle errors (e.g., network failure, non-200 responses).
[X] No Loading State
Bug: There is no loading indicator while data is being fetched.
[X] Potential Type Issues
Bug: The code assumes all advocate fields exist and are strings/arrays, but there is no type checking or fallback.
[X] Case-Sensitive Search
Bug: The search is case-sensitive (includes), so searching for "john" won't match "John".
[X] Reset Search Button
Bug: The reset button resets the filtered list but does not clear the input field or the "Searching for" display.
[X] No Unique Key for Table Rows
Bug: Each <tr> in the table should have a unique key prop, ideally something like advocate.id.
10. Break up into different components.
[X] Separate UI logic from data-fetching and state management. 
[] Add types


## Backend Fixes
`src/app/api/advocates/route.ts`
1. No Error Handling
If the database query fails, the API will throw and return a generic 500 error with no useful message.
2. Commented Out Fallback
The fallback to use static advocateData is commented out, which is fine for production, but if the DB is down, there’s no graceful fallback.
`src/app/api/seed/route.ts`
3. No Error Handling
- If the insert fails (e.g., DB down, constraint violation), the API will throw and return a generic 500 error.
4. No Input Validation
- If you ever change this to accept user input, you should validate it before inserting.


## Functionality Fixes
1. Search functionality does not work
2. UI/UX can be improved 

## Extras
1. Docker improvements
2. Pagination
3. Update versioning