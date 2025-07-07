# **Solution**

- See [frontend bugs/fixes](https://github.com/chrisrcoles/solace/blob/main/docs/DISCUSSION.md#frontend-fixes) that were implemented.
- See [backend bugs/fixes](https://github.com/chrisrcoles/solace/blob/main/docs/DISCUSSION.md#backend-fixes) that were implemented.
- See [TODO extras](https://github.com/chrisrcoles/solace/blob/main/docs/DISCUSSION.md#extras) that are improvements that can be implemented in the future.

## Tasks

1. Fix any glaring bugs and anti patterns.
2. Improve the design UI/UX to make the experience better for prospective patients. We value design heavily at Solace so feel free to flex your skills in this area. The repo is set up with tailwind but feel free to use any styling framework you’d like.
3. Consider both frontend and backend performance improvements. Assume we have a database of hundreds of thousands of advocates we need to search through.

## Frontend Fixes
[X] Missing `key` prop in list rendering 

[X] Direct DOM manipulation in `page.tsx`. 
- Bug: Code uses document.getElementById("search-term").innerHTML = searchTerm; inside the onChange handler.

[X] Table <th> Elements Not Inside <tr>
- Bug: In the table, <th> elements are direct children of <thead>, but they should be inside a <tr>.

[X] No Error Handling for Fetch
- Bug: The fetch call in useEffect does not handle errors (e.g., network failure, non-200 responses).

[X] No Loading State
- Bug: There is no loading indicator while data is being fetched.

[X] Potential Type Issues
- Bug: The code assumes all advocate fields exist and are strings/arrays, but there is no type checking or fallback.

[X] Case-Sensitive Search
- Bug: The search is case-sensitive (includes), so searching for "john" won't match "John".

[X] Reset Search Button
- Bug: The reset button resets the filtered list but does not clear the input field or the "Searching for" display.

[X] No Unique Key for Table Rows
- Bug: Each <tr> in the table should have a unique key prop, ideally something like advocate.id.

[X] Break up into different components.

[X] Separate UI logic from data-fetching and 
state management. 

[X] Add types

[X] Search functionality does not work

[X] UI/UX can be improved 

## Backend Fixes

[X] No Error Handling for `src/app/api/advocates/route.ts`
- If the database query fails, the API will throw and return a generic 500 error with no useful message.

[X] Commented Out Fallback
- The fallback to use static advocateData is commented out, which is fine for production, but if the DB is down, there’s no graceful fallback.

[X] No Error Handling for `src/app/api/seed/route.ts`
- If the insert fails (e.g., DB down, constraint violation), the API will throw and return a generic 500 error.

## Extras
1. Docker improvements
2. Pagination
3. Update versioning
4. Database indexing
5. Caching
6. Infinite Scroll
7. Frontend/Backedn Tests - Unit, Integration, E2E
8. Lazy Loading
9. Authentication and Authorization
10. CI/CD pipeline + deployed app
11. Unit, integration and end to end test
12. Improve API documentation
13. Add more features to advocates list view
14. Improve docker-compose.yml file