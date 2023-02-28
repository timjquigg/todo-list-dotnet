using System.ComponentModel.DataAnnotations;
namespace TodoApi.Models
{

  public class TodoItem
  {
    public long Id { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public bool IsComplete { get; set; }

    public DateTime? DateCompleted { get; set; }

    [Required]
    public User User { get; set; }
  }
}