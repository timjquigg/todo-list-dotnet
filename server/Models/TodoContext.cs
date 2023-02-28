using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
  public class MyDbContext : IdentityDbContext<User>
  {
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>()
          .ToTable("Users");
    }
    public DbSet<TodoItem> TodoItems { get; set; } = null!;
    public DbSet<User> User { get; set; } = null!;

  }
}