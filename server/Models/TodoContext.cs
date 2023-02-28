using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;

public class TodoContext : IdentityUserContext<IdentityUser>
{
  public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
  public DbSet<TodoItem> TodoItems { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
  }
}