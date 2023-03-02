using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_dotnet_api.Migrations
{
    /// <inheritdoc />
    public partial class updateTodoName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "TodoItems",
                newName: "Description");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "TodoItems",
                newName: "Name");
        }
    }
}
