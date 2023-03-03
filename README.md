# To-Do App

A simple full-stack to-do app to practice React & ASP.NET.

## Technologies

- React
- Material UI
- ASP.NET Core
- Entity Framework Core
- PostgreSQL

## Getting Started

1. Clone repository and install dependencies with `dotnet restore`
2. Add database connection string to `server/appsettings.json`
3. Run `dotnet ef database update` to configure database
4. Start API server with `dotnet run`
5. Start React server with `npm start`

For deployment:

1. Build the React deployment files with `dotnet publish --no-restore -c Release -o [desired output directory]`
2. The app can then be launced with `dotnet todo-dotnet-api.dll` from the output directory entered in the previous step.

The server is configured to serve static files from the `wwwroot` directory wihtin the publish folder. The publish script will publish the React files to that directory.
