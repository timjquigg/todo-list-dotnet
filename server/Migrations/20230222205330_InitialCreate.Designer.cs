﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TodoApi.Models;

#nullable disable

namespace todo_dotnet_api.Migrations
{
  [DbContext(typeof(MyDbContext))]
  [Migration("20230222205330_InitialCreate")]
  partial class InitialCreate
  {
    /// <inheritdoc />
    protected override void BuildTargetModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
      modelBuilder
          .HasAnnotation("ProductVersion", "7.0.3")
          .HasAnnotation("Relational:MaxIdentifierLength", 63);

      NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

      modelBuilder.Entity("TodoApi.Models.TodoItem", b =>
          {
            b.Property<long>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("bigint");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

            b.Property<bool>("IsComplete")
                      .HasColumnType("boolean");

            b.Property<string>("Name")
                      .HasColumnType("text");

            b.HasKey("Id");

            b.ToTable("TodoItems");
          });
#pragma warning restore 612, 618
    }
  }
}
