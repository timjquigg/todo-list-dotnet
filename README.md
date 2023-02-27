# To-Do App

A simple full-stack to-do app to practice React & ASP.NET.

## Technologies

- React
- Material UI
- ASP.NET Core
- Entity Framework Core
- PostgreSQL

## Getting Started

1. Clone repository and install node dependencies with `npm install`
2. Add database connection string to `server/appsettings.json`
3. From the `server/` directory run `dotnet ef database update` to configure database
4. Start development server with `npm run dev`

The server is configured to host static files in the `server/wwwroot/` directory. The project is configured to place the React build files in that directory. For deployment:

1. Build the React deployment files with `npm run build`
2. The app can then be launced with `npm run server`.

## App Status

In progess

Still to do:

- Configure Dark mode and have ability to switch between light & dark
- Add user authentication
- Update database schema to have separate lists for each user
