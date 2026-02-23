**Resume behavior**: The `/api/resume-pdf` endpoint will redirect to the uploaded PDF file for the first document in the `resume` collection. The document name is ignored (case-insensitive). If no file exists the route returns 404 and UI links are hidden.

TODO:

- fix project image tags
- fix tags
- add demo and github links in project card remove more info button and link form the project card so that when user clicks on button it will open in neww tab

- resume download now works via a redirecting API route; name is case-insensitive

- check responsive design
- remove extra space between name and i'm
- remove extra space between experience description and company name
- add email provider to send email
- (optional) add github ci/cd pipeline to deploy it to vercel use .tech domain
- dockerize the app
- add analytics to the app
- (optional) add blog page
