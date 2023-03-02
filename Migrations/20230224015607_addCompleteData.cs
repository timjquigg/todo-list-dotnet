using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_dotnet_api.Migrations
{
    /// <inheritdoc />
    public partial class addCompleteData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCompleted",
                table: "TodoItems",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCompleted",
                table: "TodoItems");
        }
    }
}
